const path = require('path');
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    "style-resources-loader": {
        preProcessor: "less",
        patterns: [
           // 引入公共文件
            path.resolve(__dirname, "./src/assets/less/common.less")
        ]
    }
},
css: {
    loaderOptions: {
          <%- cssOption.loaderOptions %>
    },
}
