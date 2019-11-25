<!--
 * Careted:  Riant [rianthar@qq.com] AT 2019-05-13 13:39:50
 * Version:  1.0
 * Modified:
 * Description: [list.vue] 规则列表
 -->
<template lang="pug">
.rule-list
  template(v-if='list.length')
    .tags
      a(href='#' @click.prevent='filterListByTag("")' :class='{active: activeTag === ""}') {{$t('All')}}({{list.length}})
      a(v-for='count, tag in tags' href='#' @click.prevent='filterListByTag(tag)' :class='{active: activeTag === tag}') {{tag}}({{count}})
    table
      thead: tr
        th(style='width: 30px;') {{$t('Enable')}}
        th {{$t('Domain/URL')}}
        th Target
        th {{$t('Tags')}}
        th.align-r(v-if='action') {{$t('Order')}}
        th {{$t('Note')}}
        th.align-r(v-if='action')
      tbody
        tr(v-for='it in showList')
          td: el-checkbox(v-model='it.enable' @change='statusChanged(it)')
          td.title: a(href='#' @click.prevent='statusChanged(it, true)') {{it.domain}}
          td {{it.target}}
          td {{it.tags.join(', ')}}
          td.align-r(v-if='action') {{it.order}}
          td {{it.note}}
          td(v-if='action')
            .actions.align-r
              a(href='#' @click.prevent='deleteItem(it.id)') {{$t('Delete')}}
              a(href='#' @click.prevent='editItem(it.id)') {{$t('Edit')}}
    .list-actions(v-if='action')
      el-button(size='mini' @click='exportList') {{$t('Export')}}
      .export-text(v-if='exporting')
        p {{$t('Copy and save the rules below, then you can import by the Bulk-Add next time')}}
        textarea(rows='5' readonly @focus='selectExportText') {{exportText}}
  el-alert(v-else :closable='false')
    slot(name='empty-note')
      p {{$t('Rules not found')}}
</template>

<script>
import { Storage } from '../utils'

export default {
  props: {
    action: {type: Boolean, default: true},
  },
  data() {
    return {
      activeTag: '',
      list: Storage.get('rules') || [],
      exporting: false,
    }
  },
  computed: {
    showList() {
      if (this.activeTag) {
        return this.list.filter(it => it.tags.indexOf(this.activeTag) > -1)
      } else {
        return this.list
      }
    },
    tags() {
      let tags = {}
      this.list.forEach(item => {
        item.tags.forEach(tag => {
          if (tags[tag]) tags[tag] += 1
          else tags[tag] = 1
        })
      })
      return tags
    },
    exportText() {
      let text = []
      this.list.forEach(it => {
        text.push(`${it.domain} ${it.target} ${it.tags.join(',')} ${it.order} ${it.note}`)
      })
      return text.join('\n')
    },
  },
  watch: {
    list() {
      this.syncList()
    },
  },
  methods: {
    exportList() {
      this.exporting = !this.exporting
    },
    selectExportText(event) {
      event.target.select()
    },
    syncList() {
      Storage.set('rules', this.list)
      this.setProxy()
    },
    statusChanged(item, isClick) {
      if (isClick) item.enable = !item.enable
      if (item.enable) { // 关闭 domain 一致的其他启用项目
        let enabledItem = this.list.find(it => it.id !== item.id && it.enable && it.domain === item.domain)
        if (enabledItem) enabledItem.enable = false
      }
      this.syncList()
    },
    filterListByTag(tag) {
      if (this.activeTag === tag) {
        let enableDomains = {}
        let disabledIndex = this.showList.findIndex(it => !it.enable)
        this.showList.forEach(it => {
          it.enable = disabledIndex > -1
          if (disabledIndex > -1) enableDomains[it.domain] = it.id
        })
        if (Object.keys(enableDomains).length) {
          this.list.forEach(it => {
            if (enableDomains[it.domain] !== it.id) it.enable = false
          })
        }
        this.syncList()
      } else {
        this.activeTag = tag
      }
    },
    sortList() {
      this.list = this.list.sort((x, y) => y.order - x.order)
    },
    deleteItem(id) {
      this.$confirm(this.$t('Are you sure you want to delete this rule?'), this.$t('Confirm')).then(() => {
        let index = this.list.findIndex(it => id === it.id)
        if (index > -1) this.list.splice(index, 1)
      })
    },
    editItem(id) {
      let index = this.list.findIndex(it => id === it.id)
      if (index > -1) this.$emit('edit', this.list[index])
    },
    addItem(item) {
      this.list.unshift(Object.assign(item, {id: new Date().getTime() + '-' + 0, enable: false}))
      this.sortList()
    },
    addItems(items) {
      this.list = this.list.concat(items)
      this.sortList()
    },
    setItem(item) {
      let index = this.list.findIndex(it => item.id === it.id)
      if (index > -1) {
        this.$set(this.list, index, item)
        this.sortList()
      } else this.addItem(item)
    },
    getEnabledHosts() {
      return this.list.filter(it => it.enable)
    },
    // refreshDataForBk(rules) {
    //   chrome.extension.sendRequest(rules || this.list.filter(it => it.enable))
    // },
    setProxy(enable) {
      if (enable === undefined) {
        enable = Storage.get('enable')
        if (enable === '') enable = true
        else if (enable === false) return
      } else {
        Storage.set('enable', enable)
      }
      // let defaultMode = Storage.get('defaultMode') || 'DIRECT'
      let config = enable ? {mode: 'pac_script', pacScript: {data: this.getPacScript()}} : {mode: 'system'}
      window.chrome.proxy.settings.set({scope: 'regular', value: config})
      // this.refreshDataForBk()
    },
    getPacScript() {
      var script = ''
      let results = this.list.filter(it => it.enable)
      for (var i = 0; i < results.length; i++) {
        let info = results[i]
        script += (i === 0 ? 'if' : 'else if')
        if (info.domain.indexOf('/') > 0) {
          script += '(shExpMatch(url, "http://' + info.domain + '") || shExpMatch(url, "https://' + info.domain + '"))'
        } else if (info.domain.indexOf('*') > -1) {
          script += '(shExpMatch(host, "' + info.domain + '"))'
        } else {
          script += '(host == "' + info.domain + '")'
        }
        script += '{return "PROXY ' + info.target + '; DIRECT";}\n'
      }
      if (script) script += 'else { return "DIRECT"; }'

      let data = `
function FindProxyForURL(url,host){
  if(shExpMatch(url, "http:*") || shExpMatch(url, "https:*")){
    ${script}
  } else {
    return "DIRECT";
  }
}
      `
      return data
    },
  },
}
</script>

<style lang="scss">
.rule-list {
  a { text-decoration: none; }
  .tags { margin-bottom: 15px; font-size: 13px;
    a { display: inline-block; margin-right: 10px;
      text-decoration: none; color: #666;
      &.active { color: #409EFF; }
    }
  }

  .list-actions { margin-top: 15px; }
  .export-text { margin-top: 10px; font-size: 12px; background: #409EFF; color: #FFF;
    padding: 15px; border-radius: 3px;
    p { margin-bottom: .8em; }
    textarea { width: 100%; border: 1px solid #83C1FF; border-radius: 3px;
      box-sizing: border-box; padding: 5px;
      font-size: 12px; background: #83C1FF; line-height: 1.8;
      font-family: "Source Code Pro","DejaVu Sans Mono","Ubuntu Mono",Consolas,Courier,"PingFang SC","Microsoft YaHei";
    }
  }

  table {
    .actions { font-size: 12px;
      a { display: inline-block; margin-left: 10px;
        &:hover { text-decoration: underline; }
      }
    }
    tr {
      .actions { opacity: 0; }
      &:hover {
        .actions { opacity: 1; }
      }
    }
    td.title { padding: 0;
      a { display: block; padding: 10px; color: #333;
        &:hover { color: #409EFF; }
      }
    }
  }

  .el-alert .el-alert__description { margin: 1em 0; }
}

.align-l { text-align: left; }
.align-c { text-align: center; }
.align-r { text-align: right; }
</style>
