// common规范
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// css加载插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 静态页面模版
const hwp = [
  new HtmlWebpackPlugin({
    filename: "slider-animate.html",
    template: path.join(__dirname, "./src/components/slider/slider-animate/slider-animate.html"),
    title: "首页",
    // chunks: ["slider-animate"], // 使用哪些打包的js文件
    inject : 'body',
    inlineSource : '.(js|css)$', //全部内嵌
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
    slider_animate: path.join(__dirname, "./src/components/slider/slider-animate/index.ts"),
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
          // 将css抽分为单独文件
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: path.join(__dirname, "public"),
            },
            // options: {
            //   publicPath: "../../",
            //   // publicPath: (resourcePath, context) => {
            //   //   // publicPath 是资源相对于上下文的相对路径
            //   //   // 例如：对于 ./css/admin/main.css publicPath 将会是 ../../
            //   //   // 而对于 ./css/main.css publicPath 将会是 ../
            //   //   console.log(resourcePath);
            //   //   return path.relative(path.dirname(resourcePath), context) + '/';
            //   // },
            // },
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
    // dist 目录清理
    // new CleanWebpackPlugin(),
    // 静态页面模版
    ...hwp,
    // 将css进行输出
    new MiniCssExtractPlugin({
      filename:'css/[name].[chunkhash].css',   //输出的css文件名，放置在dist目录下
    }),
    // 自定义webpack的消息提示
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            messages: [`Your application is running here: http://localhost:9000/pages`],
        },
    }),
  ]
};