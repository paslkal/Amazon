const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    amazon: ['./src/scripts/amazon.ts'],
    checkout: ['./src/scripts/checkout.ts'],
    orders: ['./src/scripts/orders.ts'],
    tracking: ['./src/scripts/tracking.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 5500
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/scripts'),
  },
};