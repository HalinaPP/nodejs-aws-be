const serverlessWebpack = require('serverless-webpack');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry: serverlessWebpack.lib.entries,
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  externals: [webpackNodeExternals()] 
};
