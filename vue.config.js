module.exports = {
  publicPath: '/',
  outputDir: 'simply-proxy',
  lintOnSave: true,
  pages: {
    // 当使用只有入口的字符串格式时，模板会被推导为 `public/forms.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `forms.html`。
    // forms: 'src/form/main.js',
    setting: {
      entry: 'src/setting/main.js', // page 的入口
      template: 'public/index.html', // 模板来源
      filename: 'setting.html', // 在 dist/index.html 的输出
      title: '选项 < Host Proxy' // template 引用 <title><%= htmlWebpackPlugin.options.title %></title>
    },
    popup: {entry: 'src/popup/main.js', template: 'public/index.html', filename: 'popup.html', title: 'Host Proxy'},
  },
  productionSourceMap: false,
  css: {
    modules: false,
    loaderOptions: {
      sass: {
        data: `@import "@/assets/_setting.scss";`
      }
    }
  }
}
