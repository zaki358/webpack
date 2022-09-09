//outputのパスを相対パスで指定するためにpathライブラリを読み込む
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/js/main.js',
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: './js/main.js'
  },

   //下から上に適用されるため書き方に注意
  module: {
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { 'targets': '> 30%, not dead'}],
                ],
              },
            },
          ],
        },
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
         {
            test: /\.(png|jpg)/,
            //test:  /\.png|\.jpg/でも可
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     esModule: false,
                     name: 'images/[name].[ext]',
                  },
               },
            ],
         },
         {
            test: /\.pug/,
            use: [
               {
                  loader: 'html-loader',
               },
               {
                  loader: 'pug-html-loader',
                  options: {
                    pretty: true,
                  },
               },
            ],
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({
        //ビルドされたほうの名前
         filename: './css/main.css',
      }),
      //このhtmlファイルが親みたいなもので上記のビルドされた内容（プラグインやライブラリ）が読み込まれる
      new HtmlWebpackPlugin({
         template: './src/templates/index.pug',
         filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/templates/access.pug',
        filename: 'access.html',
     }),
     new HtmlWebpackPlugin({
      template: './src/templates/members/taro.pug',
      filename: 'members/taro.html',
   }),
      new CleanWebpackPlugin(),
   ],
}