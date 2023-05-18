const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
  productionSourceMap: false,  
  outputDir: '../dist',
  assetsDir: 'static',
  indexPath: 'templates/index.html'
})
