// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ]
// })


const fs = require('fs')

// 프로세스 다운 방지
process.on('uncaughtException', function (err) {
  console.log(err.stack);
  console.log('Caught exception: ' + err);
});


module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    port: process.env.VUE_APP_PORT || 8370,
    https: true,
    https: {
      key: fs.readFileSync('./src/cert/private.key'),
      cert: fs.readFileSync('./src/cert/certificate.crt'),
      ca: fs.readFileSync('./src/cert/ca_bundle.crt'),
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
}
