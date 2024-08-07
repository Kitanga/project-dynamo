/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");

const fs = require("fs");
const path = require("path");

const merge = require("webpack-merge").merge;
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
    const config = {
        entry: "./src/index.ts",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },

        module: {
            rules: [{
                test: /\.css$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                ],
            }, ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),
            new CopyPlugin({
                patterns: [{
                    from: "assets/**",

                    // if there are nested subdirectories , keep the hierarchy
                    transformPath(targetPath, absolutePath) {
                        const assetsPath = path.resolve(__dirname, "assets");
                        const endpPath = absolutePath.slice(assetsPath.length);

                        return Promise.resolve(`assets/${endpPath}`);
                    },
                }, ],
            }),


            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pkg.version),
            }),
        ],
    };
    const envConfig = require(path.resolve(__dirname, `./webpack.${env.mode}.js`))(env);

    const mergedConfig = merge(config, envConfig);

    return mergedConfig;
};