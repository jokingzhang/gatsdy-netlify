var webpack = require('webpack');

exports.modifyWebpackConfig = (webpackConfig, env) => {
  if (!webpackConfig.plugins) webpackConfig.plugins = [];
  if (env === 'build-html') {
    webpackConfig.loader('null', {
      test: /bad-module/,
      loader: 'null-loader'
    })
  }

  webpackConfig.plugins.push(
      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery',
  }));

  webpackConfig.plugins.push(
    new webpack.IgnorePlugin(/jsdom$/)
  )

  webpackConfig.loader('md', (cfg) => {
    const config = cfg;
    return config;
  });
  return webpackConfig;
};
