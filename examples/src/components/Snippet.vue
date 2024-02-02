<template>
    <div class="snippet-wrapper">
        <h3 :id="normalizeTitle" class="snippet-title">{{ title }}</h3>
        <slot name="desc"></slot>
        <div class="demo-block">
            <slot name="demo"></slot>
        </div>

        <div class="snippet-space align-start flex-end" style="gap: 8px">
            <div class="icon" @click="onCopy">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    class="svg-icon icon-copy-outline"
                    stroke-width="0"
                    stroke-linecap="butt"
                    stroke-linejoin="arcs"
                    style="fill: currentcolor; font-size: inherit"
                >
                    <path
                        d="M896 51.2a25.6 25.6 0 0 1 25.6 25.6V768a25.6 25.6 0 0 1-25.6 25.6H742.4v153.6a25.6 25.6 0 0 1-25.6 25.6H128a25.6 25.6 0 0 1-25.6-25.6V256a25.6 25.6 0 0 1 25.6-25.6h153.6V76.8a25.6 25.6 0 0 1 25.6-25.6H896zm-230.4 256H179.2V896h486.4V307.2zM563.2 665.6v76.8H281.6v-76.8h281.6zM844.8 128H358.4v102.4h358.4a25.6 25.6 0 0 1 25.6 25.6v460.8h102.4V128zM563.2 460.8v76.8H281.6v-76.8h281.6z"
                    ></path>
                </svg>
            </div>
            <div
                class="icon"
                :class="{ active: showCode }"
                @click="showCode = !showCode"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    class="svg-icon icon-code-outline"
                    stroke-width="0"
                    stroke-linecap="butt"
                    stroke-linejoin="arcs"
                    style="fill: currentcolor; font-size: inherit"
                >
                    <path
                        d="M320 315.597 120.909 514.714 320 713.856l-54.298 54.298-253.44-253.44 253.44-253.415L320 315.597zm384 0 199.091 199.117L704 713.856l54.298 54.298 253.44-253.44-253.44-253.415L704 315.597zm-98.56-203.392 72.627 25.011-266.726 774.58-72.602-25.012z"
                    ></path>
                </svg>
            </div>
        </div>

        <div v-show="showCode" v-html="html"></div>
    </div>
</template>

<script>
import { getHighlighter } from "shikiji";

export default {
    name: "Snippet",
    props: {
        code: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        }
    },
    computed: {
        normalizeTitle() {
            // 空格替换为 - 不用replaceAll的原因是兼容性不好
            return this.title.replace(/\s+/g, "-");
        }
    },
    data() {
        return {
            showCode: false,
            html: ""
        };
    },
    created() {
        const shiki = getHighlighter({
            themes: ["vitesse-light", "vitesse-dark"],
            langs: ["vue"]
        });
        const originCode = decodeURIComponent(this.code);
        shiki.then(highlighter => {
            this.html = highlighter.codeToHtml(originCode, {
                lang: "vue",
                themes: {
                    dark: "vitesse-dark",
                    light: "vitesse-light"
                }
            });
        });
    },
    methods: {
        onCopy() {}
    }
};
</script>

<style lang="less">
    .snippet-wrapper {
        .demo-block {
            margin: 12px 0 8px;
            padding: 20px;
            border: 1px solid rgb(30 32 37 / 8%);
            border-radius: 8px;
            transition: all 0.3s;
        }
        .snippet-space {
            transition: all 0.2s ease-in-out;
            &.align-start {
                align-items: flex-start;
            }
            &.flex-end {
                display: flex;
                justify-content: flex-end;
                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    color: rgb(30 32 37 / 72%);
                    background-color: color-mix(in srgb, #fff, #1e2025 3.6%);
                    transition: all 0.3s;
                    cursor: pointer;
                    .svg-icon {
                        display: inline-block;
                        width: 1em;
                        height: 1em;
                        color: rgb(30 32 37 / 72%);
                        outline: none;
                        transition: all 0.3s;
                        font-style: normal;
                        vertical-align: -2px;
                        stroke: currentcolor;
                    }
                    &:hover {
                        background-color: color-mix(in srgb, #fff, @gray 6.8%);
                    }
                }
                .active {
                    background-color: rgb(30 32 37);
                    &:hover {
                        background-color: rgb(30 32 37);
                    }
                    .svg-icon {
                        color: #fff;
                    }
                }
            }
        }
        pre {
            overflow-x: auto;
            margin: 16px 0;
            padding: 12px;
            border-radius: 8px;
        }
        .shiki {
            background-color: color-mix(in srgb, #fff, #1e2025 3.6%) !important;
        }
    }
</style>
