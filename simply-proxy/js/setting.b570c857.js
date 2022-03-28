(function(t){function e(e){for(var a,r,o=e[0],l=e[1],u=e[2],d=0,f=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&f.push(n[r][0]),n[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);c&&c(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],a=!0,o=1;o<s.length;o++){var l=s[o];0!==n[l]&&(a=!1)}a&&(i.splice(e--,1),t=r(r.s=s[0]))}return t}var a={},n={setting:0},i=[];function r(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=a,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(s,a,function(e){return t[e]}.bind(null,a));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var c=l;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("cd5d")},"025e":function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));s("20d6");var a={get:function(t){var e=localStorage.getItem(t);return e?JSON.parse(e):""},set:function(t,e){localStorage.setItem(t,JSON.stringify(e))},addItem:function(t,e){var s=this.get(t)||[];return s.unshift(e),this.set(t,s),s},deleteItemBy:function(t,e,s){var a=this.get(t);if(a&&a.length){var n=a.findIndex((function(t){return t[e]===s}));n>-1&&a.splice(n,1),this.set(t,a)}return a}}},"0471":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"rule-list"},[t.list.length?[s("div",{staticClass:"tags"},[s("a",{class:{active:""===t.activeTag},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.filterListByTag("")}}},[t._v(t._s(t.$t("All"))+"("+t._s(t.list.length)+")")]),t._l(t.tags,(function(e,a){return s("a",{class:{active:t.activeTag===a},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.filterListByTag(a)}}},[t._v(t._s(a)+"("+t._s(e)+")")])}))],2),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{width:"30px"}},[t._v(t._s(t.$t("Enable")))]),s("th",[t._v(t._s(t.$t("Domain/URL")))]),s("th",[t._v("Target")]),s("th",[t._v(t._s(t.$t("Tags")))]),t.action?s("th",{staticClass:"align-r"},[t._v(t._s(t.$t("Order")))]):t._e(),s("th",[t._v(t._s(t.$t("Note")))]),t.action?s("th",{staticClass:"align-r"}):t._e()])]),s("tbody",t._l(t.showList,(function(e){return s("tr",[s("td",[s("el-checkbox",{on:{change:function(s){return t.statusChanged(e)}},model:{value:e.enable,callback:function(s){t.$set(e,"enable",s)},expression:"it.enable"}})],1),s("td",{staticClass:"title"},[s("a",{attrs:{href:"http://"+e.domain,target:"_blank"}},[t._v(t._s(e.domain))])]),s("td",[t._v(t._s(e.target))]),s("td",[t._v(t._s(e.tags.join(", ")))]),t.action?s("td",{staticClass:"align-r"},[t._v(t._s(e.order))]):t._e(),s("td",[t._v(t._s(e.note))]),t.action?s("td",[s("div",{staticClass:"actions align-r"},[s("a",{attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.deleteItem(e.id)}}},[t._v(t._s(t.$t("Delete")))]),s("a",{attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.editItem(e.id)}}},[t._v(t._s(t.$t("Edit")))])])]):t._e()])})),0)]),t.action?s("div",{staticClass:"list-actions"},[s("el-button",{attrs:{size:"mini"},on:{click:t.exportList}},[t._v(t._s(t.$t("Export")))]),t.exporting?s("div",{staticClass:"export-text"},[s("p",[t._v(t._s(t.$t("Copy and save the rules below, then you can import by the Bulk-Add next time")))]),s("textarea",{attrs:{rows:"5",readonly:""},on:{focus:t.selectExportText}},[t._v(t._s(t.exportText))])]):t._e()],1):t._e()]:s("el-alert",{attrs:{closable:!1}},[t._t("empty-note",(function(){return[s("p",[t._v(t._s(t.$t("Rules not found")))])]}))],2)],2)},n=[],i=(s("55dd"),s("456d"),s("20d6"),s("7514"),s("ac6a"),s("025e")),r={props:{action:{type:Boolean,default:!0}},data:function(){return{activeTag:"",list:i["a"].get("rules")||[],exporting:!1}},computed:{showList:function(){var t=this;return this.activeTag?this.list.filter((function(e){return e.tags.indexOf(t.activeTag)>-1})):this.list},tags:function(){var t={};return this.list.forEach((function(e){e.tags.forEach((function(e){t[e]?t[e]+=1:t[e]=1}))})),t},exportText:function(){var t=[];return this.list.forEach((function(e){t.push("".concat(e.domain," ").concat(e.target," ").concat(e.tags.join(",")," ").concat(e.order," ").concat(e.note))})),t.join("\n")}},watch:{list:function(){this.syncList()}},methods:{exportList:function(){this.exporting=!this.exporting},selectExportText:function(t){t.target.select()},syncList:function(){i["a"].set("rules",this.list),this.setProxy()},statusChanged:function(t,e){if(e&&(t.enable=!t.enable),t.enable){var s=this.list.find((function(e){return e.id!==t.id&&e.enable&&e.domain===t.domain}));s&&(s.enable=!1)}this.syncList()},filterListByTag:function(t){if(this.activeTag===t){var e={},s=this.showList.findIndex((function(t){return!t.enable}));this.showList.forEach((function(t){t.enable=s>-1,s>-1&&(e[t.domain]=t.id)})),Object.keys(e).length&&this.list.forEach((function(t){e[t.domain]!==t.id&&(t.enable=!1)})),this.syncList()}else this.activeTag=t},sortList:function(){this.list=this.list.sort((function(t,e){return e.order-t.order}))},deleteItem:function(t){var e=this;this.$confirm(this.$t("Are you sure you want to delete this rule?"),this.$t("Confirm")).then((function(){var s=e.list.findIndex((function(e){return t===e.id}));s>-1&&e.list.splice(s,1)}))},editItem:function(t){var e=this.list.findIndex((function(e){return t===e.id}));e>-1&&this.$emit("edit",this.list[e])},addItem:function(t){this.list.unshift(Object.assign(t,{id:(new Date).getTime()+"-0",enable:!1})),this.sortList()},addItems:function(t){this.list=this.list.concat(t),this.sortList()},setItem:function(t){var e=this.list.findIndex((function(e){return t.id===e.id}));e>-1?(this.$set(this.list,e,t),this.sortList()):this.addItem(t)},getEnabledHosts:function(){return this.list.filter((function(t){return t.enable}))},setProxy:function(t){if(void 0===t){if(t=i["a"].get("enable"),""===t)t=!0;else if(!1===t)return}else i["a"].set("enable",t);var e=t?{mode:"pac_script",pacScript:{data:this.getPacScript()}}:{mode:"system"};window.chrome.proxy.settings.set({scope:"regular",value:e})},getPacScript:function(){for(var t="",e=this.list.filter((function(t){return t.enable})),s=0;s<e.length;s++){var a=e[s];t+=0===s?"if":"else if",a.domain.indexOf("/")>0?t+='(shExpMatch(url, "http://'+a.domain+'") || shExpMatch(url, "https://'+a.domain+'"))':a.domain.indexOf("*")>-1?t+='(shExpMatch(host, "'+a.domain+'"))':t+='(host == "'+a.domain+'")',t+='{return "PROXY '+a.target+'; DIRECT";}\n'}t&&(t+='else { return "DIRECT"; }');var n='\nfunction FindProxyForURL(url,host){\n  if(shExpMatch(url, "http:*") || shExpMatch(url, "https:*")){\n    '.concat(t,'\n  } else {\n    return "DIRECT";\n  }\n}\n      ');return n}}},o=r,l=(s("cd96"),s("2877")),u=Object(l["a"])(o,a,n,!1,null,null,null);e["a"]=u.exports},"2ab5":function(t,e,s){"use strict";e["a"]={"zh-CN":{Setting:"设置",Enable:"启用","Rules not found, ":"没有找到任何代理规则，","Rules not found":"还没有添加任何代理规则","Click to Add":"点击添加","Domain/URL":"域名/URL",Tags:"标签",Order:"排序",Note:"备注",All:"全部",Delete:"删除",Edit:"编辑",Confirm:"提示","Are you sure you want to delete this rule?":"确定要删除该配置项吗？","Add Rules":"添加规则",Add:"添加","Bulk Add":"批量添加","Tags For All Rules":"统一设置标签",Preview:"预览","Can not get any rules, please check your input rules format":"没有解析到任何代理规则，请注意检查格式","Sure to Add":"确定添加","Sure to Save":"确定保存",Cancel:"取消",Export:"导出","All Rules":"所有规则","Copy and save the rules below, then you can import by the Bulk-Add next time":"将下面内容复制保存起来，下次可通过左侧的批量添加导入。"}}},cd5d:function(t,e,s){"use strict";s.r(e);s("cadf"),s("551c"),s("f751"),s("097d");var a=s("2b0e"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app app-setting",attrs:{id:"app"}},[s("h1",[t._v("Simple Proxy"),s("small",[s("el-switch",{attrs:{"active-text":t.$t("Enable")},model:{value:t.enable,callback:function(e){t.enable=e},expression:"enable"}})],1)]),s("div",{staticClass:"cols"},[s("div",{staticClass:"col add-rules"},[s("h2",[t._v(t._s(t.$t("Add Rules")))]),s("el-tabs",{model:{value:t.settingType,callback:function(e){t.settingType=e},expression:"settingType"}},[s("el-tab-pane",{attrs:{label:t.$t("Add"),name:"add"}},[s("el-form",{ref:"form",attrs:{model:t.addForm,rules:t.verifyRules,"label-width":"6em"},nativeOn:{submit:function(e){return e.preventDefault(),t.submitSingle.apply(null,arguments)}}},[s("el-form-item",{attrs:{label:t.$t("Domain/URL"),prop:"domain"}},[s("el-input",{attrs:{placeholder:"支持泛域名匹配模式，注意不包含 http://"},model:{value:t.addForm.domain,callback:function(e){t.$set(t.addForm,"domain",e)},expression:"addForm.domain"}}),s("div",{staticClass:"field-note"},[t._v("如 "),s("code",[t._v("*.google.*")]),t._v("， "),s("code",[t._v("10.10.10.190:8080/abc/*")]),t._v("， "),s("code",[t._v("www.abc.com")]),t._v("；"),s("br"),t._v("可能不支持 "),s("code",[t._v("localhost")]),t._v(", "),s("code",[t._v("127.0.0.1")]),t._v(" 相关域，请尝试是用本地局域网 IPv4 地址替代")])],1),s("el-form-item",{attrs:{label:"Target",prop:"target"}},[s("el-input",{attrs:{placeholder:"如 127.0.0.1:1080"},model:{value:t.addForm.target,callback:function(e){t.$set(t.addForm,"target",e)},expression:"addForm.target"}})],1),s("el-form-item",{staticClass:"short",attrs:{label:t.$t("Tags")}},[s("el-input",{attrs:{placeholder:"多个标签用逗号 , 或空格隔开"},model:{value:t.addForm.tags,callback:function(e){t.$set(t.addForm,"tags",e)},expression:"addForm.tags"}}),s("span",{staticClass:"field-note"},[t._v("可用于筛选、批量启用/禁用相关规则")])],1),s("el-form-item",{staticClass:"shorter",attrs:{label:t.$t("Order")}},[s("el-input",{attrs:{type:"text"},model:{value:t.addForm.order,callback:function(e){t.$set(t.addForm,"order",e)},expression:"addForm.order"}}),s("span",{staticClass:"field-note"},[t._v("值越大排序越靠前")])],1),s("el-form-item",{attrs:{label:t.$t("Note")}},[s("el-input",{model:{value:t.addForm.note,callback:function(e){t.$set(t.addForm,"note",e)},expression:"addForm.note"}})],1),s("el-form-item",[s("el-button",{on:{click:t.resetForm}},[t._v(t._s(t.$t("Cancel")))]),s("el-button",{attrs:{type:"primary","native-type":"submit"}},[t._v(t._s(t.$t(t.addForm.id?"Sure to Save":"Sure to Add")))])],1)],1)],1),s("el-tab-pane",{attrs:{label:t.$t("Bulk Add"),name:"bulkAdd"}},[s("el-form",{ref:"bulkForm",attrs:{"label-position":"top"},nativeOn:{submit:function(e){return e.preventDefault(),t.submitBulk.apply(null,arguments)}}},[s("el-form-item",[s("el-input",{staticClass:"bulkRules",attrs:{type:"textarea",autosize:{minRows:5},placeholder:""},model:{value:t.bulkRules,callback:function(e){t.bulkRules=e},expression:"bulkRules"}}),s("div",{staticClass:"field-note"},[s("p",[t._v("每行一条记录； 每条分别为 Domain/URL, Target, Tags, Order, Note，使用空格隔开；多个标签使用英文逗号,隔开")]),s("p",[t._v("#支持泛域名匹配模式")]),s("pre",[t._v("*.google.com 127.0.0.1:1080  dev  0  标签、排序、备注都可以省略\nxyz.com      192.168.1.1     test")])])],1),s("el-form-item",{attrs:{label:t.$t("Tags For All Rules")}},[s("el-input",{attrs:{placeholder:"多个标签用逗号 , 或空格隔开"},model:{value:t.bulkTags,callback:function(e){t.bulkTags=e},expression:"bulkTags"}})],1),s("div",{staticClass:"preview-list"},[s("h2",[t._v(t._s(t.$t("Preview")))]),t.previewList.length?s("table",[s("thead",[s("tr",[s("th",[t._v(t._s(t.$t("Domain/URL")))]),s("th",[t._v("Target")]),s("th",[t._v(t._s(t.$t("Tags")))]),s("th",{staticClass:"align-r"},[t._v(t._s(t.$t("Order")))]),s("th",[t._v(t._s(t.$t("Note")))])])]),s("tbody",t._l(t.previewList,(function(e){return s("tr",[s("td",[t._v(t._s(e.domain))]),s("td",[t._v(t._s(e.target))]),s("td",[t._v(t._s(e.tags.join(", ")))]),s("td",{staticClass:"align-r"},[t._v(t._s(e.order))]),s("td",[t._v(t._s(e.note))])])})),0)]):s("el-alert",{attrs:{closable:!1,description:t.$t("Can not get any rules, please check your input rules format")}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary","native-type":"submit"}},[t._v(t._s(t.$t("Sure to Add")))])],1)],1)],1)],1)],1),s("div",{staticClass:"col list"},[s("h2",[t._v(t._s(t.$t("All Rules")))]),s("rule-list",{ref:"list",on:{edit:t.editItem}})],1)])])},i=[],r=(s("c5f6"),s("ac6a"),s("a481"),s("28a5"),s("025e")),o=s("0471"),l={name:"app",components:{RuleList:o["a"]},data:function(){var t=r["a"].get("enable");return{enable:""===t||t,settingType:"add",bulkRules:"",bulkTags:"",verifyRules:{domain:[{required:!0,message:"域名/URL 必须填写"}],target:[{required:!0,message:"Target 必须填写"}]},addForm:this.getDefaultFormData()}},computed:{previewList:function(){return this.decodeRules()}},watch:{enable:function(){this.$refs.list.setProxy(this.enable)}},methods:{getDefaultFormData:function(){return{domain:"",target:"",tags:"",note:"",order:0}},editItem:function(t){this.addForm=Object.assign({},t,{tags:t.tags.join(",")})},resetForm:function(){this.$refs.form.resetFields(),this.addForm=this.getDefaultFormData()},submitSingle:function(){var t=this;this.$refs.form.validate((function(e){if(e){var s=t.addForm.tags?t.addForm.tags.replace(/,\s/g,",").replace(/\s+/g,",").split(","):[],a=Object.assign({create_ad:(new Date).getTime()},t.addForm,{tags:s});t.addForm.id?t.$refs.list.setItem(a):t.$refs.list.addItem(a),t.$message({type:"success",message:"保存成功"}),t.resetForm()}}))},decodeRules:function(){var t=this,e=this.bulkRules.split("\n"),s=/^\s*([^\s]+)\s*([^\s]+)?\s*([^\s]+)?\s*([^\s]+)?\s*([^\s]+)?\s*$/,a=[];return e.length&&e.forEach((function(e,n){if(e=e.trim(),e&&0!==e.indexOf("#")){var i=s.exec(e);if(i&&i[1]&&i[2]){var r=i[3],o=i[4],l=i[5];r&&!l&&(isNaN(Number(r))?isNaN(Number(o))&&(o=0,l=i[4]):(r="",o=i[3],l=i[4]));var u={id:(new Date).getTime()+"-"+n,domain:i[1],target:i[2],tags:r,order:Number(o)||0,note:l||"",create_at:(new Date).getTime()};u.tags=u.tags?u.tags.replace(/,\s/g,",").replace(/\s+/g,",").split(","):[],t.bulkTags.trim()&&(u.tags=u.tags.concat(t.bulkTags.trim().replace(/,\s/g,",").replace(/\s+/g,",").split(","))),a.push(u)}}})),a},submitBulk:function(){var t=this.decodeRules();t.length&&(this.isPreview&&(this.isPreview=!1),this.$refs.list.addItems(t),this.bulkRules="",this.$message({type:"success",message:"保存成功"}))}}},u=l,c=(s("e429"),s("2877")),d=Object(c["a"])(u,n,i,!1,null,null,null),f=d.exports,p=s("a925"),h=s("2ab5"),m=s("5c96"),v=s.n(m);s("0fae"),s("e008");a["default"].config.productionTip=!1,a["default"].use(p["a"]),a["default"].use(v.a,{size:"small",zIndex:3e3});var g=navigator.language,b=new p["a"]({locale:g,messages:h["a"]});new a["default"]({i18n:b,render:function(t){return t(f)}}).$mount("#app")},cd96:function(t,e,s){"use strict";s("e1ad")},e008:function(t,e,s){},e1ad:function(t,e,s){},e429:function(t,e,s){"use strict";s("fd4f")},fd4f:function(t,e,s){}});