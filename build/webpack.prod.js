/*
 * @Author: 可以清心
 * @Description: webpack docs 配置文件
 * @Date: 2024-01-15 13:47:27
 * @LastEditTime: 2024-01-17 18:51:14
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "../packages/index.js"),
    output: {
        path: path.resolve(process.cwd(), "./lib"),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "[id].js",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".vue", ".js", ".json", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "../packages")
        }
    },
    externals: {
        vue: "Vue"
    },
    performance: {
        hints: false
    },
    stats: "none",
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    {
                        // 抽离公共样式变量给全局使用
                        // https://www.jianshu.com/p/13d9f18faafe
                        loader: "style-resources-loader",
                        options: {
                            patterns: [
                                // path.resolve(
                                //     __dirname,
                                //     "../src/style/less/theme-variable.less"
                                // )
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.(ttf|woff2?|otf)$/,
                type: "asset/resource"
            },
            {
                test: /\.(jsx|js)$/,
                include: [path.resolve(__dirname, "../packages")],
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: []
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    cacheDirectory: path.resolve(
                        __dirname,
                        "node_modules/.cache/vue-loader"
                    )
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "true"
        })
    ]
};
