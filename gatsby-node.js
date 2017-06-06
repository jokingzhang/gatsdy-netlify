exports.modifyWebpackConfig = (webpackConfig, env) => {
  webpackConfig.loader('md', (cfg) => {
    const config = cfg;
    return config;
  });
  return webpackConfig;
};
