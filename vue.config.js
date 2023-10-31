module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  chainWebpack: config => {
    // config.plugin('preload').tap(options => {
    //   options[0].as = (entry) => {
    //     if (/\.css$/.test(entry)) return 'style'
    //     if (/\.woff$/.test(entry)) return 'font'
    //     if (/\.png$/.test(entry)) return 'image'
    //     if (/\.mp4$/.test(entry)) return 'video'
    //     return 'script'
    //   }
    //   options[0].include = 'allAssets'
    //   // options[0].fileWhitelist: [/\.files/, /\.to/, /\.include/]
    //   // options[0].fileBlacklist: [/\.files/, /\.to/, /\.exclude/]
    //   return options
    // })
  },
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   }
  // }

  pluginOptions: {
    s3Deploy: {
      awsProfile: 'jyhan-release-else-s3-deployer',
      region: 'ap-northeast-2',
      bucket: 'release.else.red',
      uploadConcurrency: 3,
      registry: undefined,
      overrideEndpoint: false,
      createBucket: true,
      staticHosting: true,
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'bucket-owner-full-control',
      pwa: false,
      enableCloudfront: true,
      cloudfrontId: 'E3MH181BDBBFZF',
      pluginVersion: '4.0.0-rc3',
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html'
    }
  }
}

