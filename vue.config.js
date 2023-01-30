const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production'
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost', // 配置访问的服务器地址
        // target: 'https://xzdbs.sdfdsffsad.repl.co/',
        pathRewrite: { '^/api': '' }, // 用于将请求中的 /api 字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:5000/api/request_url，这样的请求就会出现 404 操作
        ws: true, // 是否支持 webstocket, 默认是 true
        changeOrigin: true // 用于控制请求头中的 host 值, 默认是 ture
      }
    }
  }
})
