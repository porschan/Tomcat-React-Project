const {
  override,
  disableEsLint,
  addWebpackAlias,
  fixBabelImports
} = require('customize-cra');
const path = require('path');

module.exports = override(
  disableEsLint(),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    assets: path.resolve(__dirname, 'src/assets'),
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
);
