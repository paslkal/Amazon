// const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    amazon: ['./src-react/react/amazon/Amazon.tsx'],
    checkout: ['./src-react/react/checkout/Checkout.tsx'],
    orders: ['./src-react/react/orders/Orders.tsx'],
    tracking: ['./src-react/react/tracking/Tracking.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, 
      {
        test: /\.css$/,
        use: ["style-loader","css-loader",]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"
        ]
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 5500
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.ts', '.js'],
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "vm": require.resolve("vm-browserify"),
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/scripts'),
  },
};