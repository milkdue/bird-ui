/*
 * @Author: 可以清心
 * @Description: webpack解析.md文件的插件
 * @Date: 2024-01-16 11:49:11
 * @LastEditTime: 2024-01-16 13:52:55
 */
const MarkdownIt = require("markdown-it");

class MarkdownWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        // 需要处理.md格式的文件
        const extensions = ["md"];

        compiler.hooks.emit.tapAsync(
            "MarkdownWebpackPlugin",
            (compilation, callback) => {
                const assetPaths = Object.keys(compilation.assets).filter(
                    path => {
                        const splitted = path.split(".");
                        return extensions.includes(
                            splitted[splitted.length - 1]
                        );
                    }
                );

                const markdownIt = MarkdownIt({
                    html: true,
                    xhtmlOut: false
                });

                assetPaths.forEach(assetPath => {
                    const asset = compilation.assets[assetPath];
                    const source = `
                    <template>
                        ${markdownIt.render(asset.source().toString())}
                    </template>
                `;
                    console.log(source);

                    compilation.assets[assetPath] = {
                        // 资源内容
                        source() {
                            return source;
                        },
                        // 资源大小
                        size() {
                            return source.length;
                        }
                    };
                });

                callback();
            }
        );
    }
}

module.exports = MarkdownWebpackPlugin;
