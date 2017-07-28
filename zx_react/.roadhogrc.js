const path = require('path');

export default {
  entry: 'src/index.js',
  disableCSSModules: false,
  publicPath: '/',
  outputPath: './dist',
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime'
      ]
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime'
      ],
      // "define": {
      //   "__CDN__": "//at.alicdn.com/t/font_m908szzn4ody4x6r.js"
      // }
    }
  },

}
