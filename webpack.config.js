// const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require('path');

module.exports = {
  mode: 'development',
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
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     filename: "index.html",
  //     template: path.resolve(__dirname, "amazon2.html")
  //   })
  // ],
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