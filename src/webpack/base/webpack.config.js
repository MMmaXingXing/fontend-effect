const { reslove } = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'build.js',
        // __dirname nodejs变量 代表当前文件目录绝对路径
        path: reslove(__dirname, 'dist')
    },
    module: {
        rules: [
            // loader 配置
            {
                test: /\.css$/,
                use: [
                    // style标签 将js样式插入head中
                    'style-loader',
                    // 将css文件变成commonjs模块插入js
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // 插件配置
    ],
    mode: 'development'
}