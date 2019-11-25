<template lang='pug'>
  #app.popup-page
    h1 Simple Proxy
      span
        el-button(size='mini' @click='gotoSettingPage') {{$t('Setting')}}
      small
        //- label 默认连接
        //- el-select(v-model='defaultMode' size='mini')
          el-option(label='使用系统配置' value='SYSTEM')
          el-option(label='直接连接' value='DIRECT')
        el-switch(v-model='enable' :active-text='$t("Enable")')
    rule-list(ref='list' :action='false')
      p(slot='empty-note') {{$t('Rules not found, ')}}<a href='/setting.html' target='_blank'>{{$t('Click to Add')}}</a>
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
      // defaultMode: Storage.get('defaultMode') || 'DIRECT',
    }
  },
  watch: {
    enable() {
      this.$refs.list.setProxy(this.enable)
    },
    // defaultMode() {
    //   Storage.set('defaultMode', this.defaultMode)
    //   this.$refs.list.setProxy()
    // },
  },
  methods: {
    gotoSettingPage() {
      window.open('/setting.html')
    },
  },
}
</script>

<style lang='scss'>
.popup-page { padding: 20px; min-width: 600px; background: $white;
  .el-button--mini { padding: 5px 10px; }
}
</style>
