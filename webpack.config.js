const path = require('path');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    libraryTarget: 'commonjs2',
    library: 'index',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
