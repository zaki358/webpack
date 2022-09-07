//outputのパスを相対パスで指定するためにpathライブラリを読み込む
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js'
   },

   //下から上に適用されるため書き方に注意
   module: {
      rules: [
         {
            test: /\.css/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
               },
               {
                  loader: 'css-loader',
               },
            ],
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
         //このhtmlファイルが親みたいなもので上記のビルドされた内容（プラグインやライブラリ）が読み込まれる
         template: './src/index.html',
      }),
   ],
}