<template lang='pug'>
  #app.app.app-setting
    h1 Simple Proxy
      small
        el-switch(v-model='enable' :active-text='$t("Enable")')
    .cols
      .col.add-rules
        h2 {{$t('Add Rules')}}
        el-tabs(v-model='settingType')
          el-tab-pane(:label='$t("Add")' name='add')
            el-form(:model='addForm' :rules='verifyRules' label-width='6em' ref='form' @submit.native.prevent='submitSingle')
              el-form-item(:label='$t("Domain/URL")' prop='domain')
                el-input(v-model='addForm.domain' placeholder='支持泛域名匹配模式，注意不包含 http://')
                .field-note 如 <code>*.google.*</code>， <code>10.10.10.190:8080/abc/*</code>， <code>www.abc.com</code>；<br>可能不支持 <code>localhost</code>, <code>127.0.0.1</code> 相关域，请尝试是用本地局域网 IPv4 地址替代
              el-form-item(label='Target' prop='target')
                el-input(v-model='addForm.target' placeholder='如 127.0.0.1:1080')
              el-form-item(:label='$t("Tags")').short
                el-input(v-model='addForm.tags' placeholder='多个标签用逗号 , 或空格隔开')
                span.field-note 可用于筛选、批量启用/禁用相关规则
              el-form-item(:label='$t("Order")').shorter
                el-input(v-model='addForm.order' type='text')
                span.field-note 值越大排序越靠前
              el-form-item(:label='$t("Note")')
                el-input(v-model='addForm.note')
              el-form-item
                el-button(@click='resetForm') {{$t('Cancel')}}
                el-button(type='primary' native-type='submit') {{$t(addForm.id ? 'Sure to Save' : 'Sure to Add')}}
          el-tab-pane(:label='$t("Bulk Add")' name='bulkAdd')
            el-form(ref='bulkForm' label-position='top' @submit.native.prevent='submitBulk')
              el-form-item
                el-input(type='textarea' v-model='bulkRules' :autosize='{minRows: 5}' placeholder='').bulkRules
                .field-note
                  p 每行一条记录； 每条分别为 Domain/URL, Target, Tags, Order, Note，使用空格隔开；多个标签使用英文逗号,隔开
                  p #支持泛域名匹配模式
                  pre
                    | *.google.com 127.0.0.1:1080  dev  0  标签、排序、备注都可以省略
                    | xyz.com      192.168.1.1     test
              el-form-item(:label='$t("Tags For All Rules")')
                el-input(v-model='bulkTags' placeholder='多个标签用逗号 , 或空格隔开')
              .preview-list
                h2 {{$t('Preview')}}
                table(v-if='previewList.length')
                  thead: tr
                    th {{$t('Domain/URL')}}
                    th Target
                    th {{$t('Tags')}}
                    th.align-r {{$t('Order')}}
                    th {{$t('Note')}}
                  tbody
                    tr(v-for='it in previewList')
                      td {{it.domain}}
                      td {{it.target}}
                      td {{it.tags.join(', ')}}
                      td.align-r {{it.order}}
                      td {{it.note}}
                el-alert(v-else :closable='false' :description='$t("Can not get any rules, please check your input rules format")')
              el-form-item
                el-button(type='primary' native-type='submit') {{$t('Sure to Add')}}
      .col.list
        h2 {{$t('All Rules')}}
        rule-list(ref='list' @edit='editItem')
</template>

<script>
import { Storage } from '../utils'
import RuleList from '../components/list'

export default {
  name: 'app',
  components: {
    RuleList,
  },
  data() {
    let isEnable = Storage.get('enable')
    return {
      enable: isEnable === '' ? true : isEnable,
      settingType: 'add',
      bulkRules: '',
      bulkTags: '',
      verifyRules: {
        domain: [{required: true, message: '域名/URL 必须填写'}],
        target: [{required: true, message: 'Target 必须填写'}],
      },
      addForm: this.getDefaultFormData(),
    }
  },
  computed: {
    previewList() {
      return this.decodeRules()
    },
  },
  watch: {
    enable() {
      this.$refs.list.setProxy(this.enable)
    },
  },
  methods: {
    getDefaultFormData() {
      return {domain: '', target: '', tags: '', note: '', order: 0}
    },
    editItem(item) {
      this.addForm = Object.assign({}, item, {tags: item.tags.join(',')})
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.addForm = this.getDefaultFormData()
    },
    submitSingle() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let tags = this.addForm.tags ? this.addForm.tags.replace(/,\s/g, ',').replace(/\s+/g, ',').split(',') : []
          let item = Object.assign({create_ad: new Date().getTime()}, this.addForm, {tags})
          if (this.addForm.id) this.$refs.list.setItem(item)
          else this.$refs.list.addItem(item)
          this.$message({type: 'success', message: '保存成功'})
          this.resetForm()
        }
      })
    },
    decodeRules() {
      let items = this.bulkRules.split('\n')
      let reg = /^\s*([^\s]+)\s*([^\s]+)?\s*([^\s]+)?\s*([^\s]+)?\s*([^\s]+)?\s*$/
      let _items = []
      if (items.length) {
        items.forEach((it, i) => {
          it = it.trim()
          if (it && it.indexOf('#') !== 0) {
            let attrs = reg.exec(it)
            if (attrs && attrs[1] && attrs[2]) {
              let tags = attrs[3]
              let order = attrs[4]
              let note = attrs[5]
              if (tags && !note) { // 根据规则：order 必须为数值，处理缺省设置
                if (!isNaN(Number(tags))) {
                  tags = ''
                  order = attrs[3]
                  note = attrs[4]
                } else if (isNaN(Number(order))) {
                  order = 0
                  note = attrs[4]
                }
              }
              let item = {
                id: new Date().getTime() + '-' + i,
                domain: attrs[1],
                target: attrs[2],
                tags,
                order: Number(order) || 0,
                note: note || '',
                create_at: new Date().getTime(),
              }
              item.tags = item.tags ? item.tags.replace(/,\s/g, ',').replace(/\s+/g, ',').split(',') : []
              if (this.bulkTags.trim()) item.tags = item.tags.concat(this.bulkTags.trim().replace(/,\s/g, ',').replace(/\s+/g, ',').split(','))
              _items.push(item)
            }
          }
        })
      }
      return _items
    },
    submitBulk() {
      let items = this.decodeRules()
      if (items.length) {
        if (this.isPreview) this.isPreview = false
        this.$refs.list.addItems(items)
        this.bulkRules = ''
        this.$message({type: 'success', message: '保存成功'})
      }
    },
  },
}
</script>

<style lang='scss'>
.app-setting { padding: 30px; border-radius: 5px; background: $white;
  max-width: 1400px; margin: 0 auto;
  h1 { margin-bottom: 20px; font-size: 34px; font-weight: normal; }
  h2 { margin-bottom: 15px; }
  .add-rules { width: 40%; }
  .list { flex: 1; margin-left: 30px; }
  .field-note { font-size: 12px; color: #888; line-height: 1.8; }
  div.field-note { margin-top: 5px; }

  .preview-list { margin-bottom: 20px;
    h2 { font-size: 14px; font-weight: bold; }
    th, td { border: 1px solid #DDD; font-size: 12px; }
  }
  .shorter {
    .el-input { width: 100px; margin-right: 10px; }
  }
  .short {
    .el-input { width: 200px; margin-right: 10px; }
  }
  .el-form--label-top .el-form-item__label { padding-bottom: 0 }
  .cols { display: flex; }
}
</style>
