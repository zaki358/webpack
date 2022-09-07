//outputのパスを相対パスで指定するためにpathライブラリを読み込む
const path = require('path');

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
                  loader: 'style-loader',
               },
               {
                  loader: 'css-loader',
               },
            ],
         },
      ],
   },
}