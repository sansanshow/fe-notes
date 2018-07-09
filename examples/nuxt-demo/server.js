const Nuxt = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000
console.log(Nuxt)

// 传入配置初始化Nuxt.js 实例
let config = require('./nuxt.config.js')
const nuxt = new Nuxt.Nuxt(config)
app.use(nuxt.render)

// 在开发模式下进行编译
if (config.dev) {
    nuxt.build().catch((error) => {
        console.error(error)
        process.exit(1)
    })
}

// 监听制定端口
app.listen(port)
console.log('服务器运行在 http://localhost:' +port)