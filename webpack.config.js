const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// css加载插件
const miniCssExtractPlugin=require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 静态页面模版
const hwp = [
  new HtmlWebpackPlugin({
    filename: "slider-animate.html",
    template: path.join(__dirname, "..", "", "./components/slider/slider-animate/slider-animate.html"),
    title: "首页",
    chunks: ["slider-animate"], // 使用哪些打包的js文件
    minify: {
      removeComments: false,
      collapseWhitespace: false,
      removeAttributeQuotes: false,
      //压缩html中的js
      minifyJS: false,
      //压缩html中的css
      minifyCSS: false,
    },
  }),
];

module.exports = {
  mode: 'development',
  entry: {
    slider_animate: path.join(__dirname, "./components/slider/slider-animate/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: path.posix.join("", "js/[name]_[hash:7].js"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
              presets:[
                `@babel/preset-env`  //es6转es5
              ]
            }
        }
    },
    {
        test: /\.css$/,
        use: [
          {
            loader:miniCssExtractPlugin.loader  //抽离成一个css文件
          },
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
    },]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 9000,
    inline: true, //实时刷新
    quiet: true, // 禁止掉devServer的console.log信息
  },
  plugins: [
    // 静态页面模版
    ...hwp,
    // 将css进行输出
    new miniCssExtractPlugin({
      filename:'css/[name].css'   //输出的css文件名，放置在dist目录下
    }),
    // 自定义webpack的消息提示
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            messages: [`Your application is running here: http://localhost:9000/pages`],
        },
    }),
  ]
};