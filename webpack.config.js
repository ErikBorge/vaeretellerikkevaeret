const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // BABEL
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },

      // SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          // // Creates `style` nodes from JS strings
          'style-loader',
          // // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // Pictures
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.mp3$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new HTMLWebPackPlugin({
      template:"./src/index.html",
      filename:"./index.html"
     })
  ],
  devServer: {
    host: '0.0.0.0',//your ip address
    port: 8080,
    disableHostCheck: true,
  }
};

// {
//   template:"./src/index.html",
//   filename:"./index.html"
//  }
