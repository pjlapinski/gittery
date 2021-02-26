const path = require('path');

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@components': path.join(__dirname, 'src/components/'),
      '@': path.join(__dirname, 'src/'),
    },
  },
  module: {
    rules: require('./webpack.rules'),
  },
};
