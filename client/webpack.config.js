const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Contact Cards'
      }),
      new WebpackPwaManifest({
        name: 'My App',
        short_name: 'App',
        description: 'My Progressive Web App',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // Adjust sizes as needed
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src/js/sw.js',
        exclude: [/\.map$/, /_redirects/] // Adjust exclusions as needed
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
