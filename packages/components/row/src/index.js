/*
 * @Author: 可以清心
 * @Description: bird-row 组件
 * @Date: 2024-01-17 17:34:00
 * @LastEditTime: 2024-01-31 18:14:30
 */
export default {
    name: "BirdRow",
    // 配置标识，可通过 $options.componentName 找到对应组件
    componentName: "BirdRow",
    props: {
        tag: {
            type: String,
            default: "div"
        },
        gutter: Number,
        flex: {
            type: Boolean,
            default: false
        },
        justify: {
            type: String,
            default: "start",
            validator(value) {
                return [
                    "start",
                    "end",
                    "center",
                    "space-around",
                    "space-between",
                    "space-evenly"
                ].includes(value);
            }
        },
        align: {
            type: String,
            default: "top",
            validator(value) {
                return ["top", "middle", "bottom"].includes(value);
            }
        }
    },
    computed: {
        style() {
            const { gutter } = this;
            const style = {};

            // 向两边拉伸 抵消 col 的 padding
            if (gutter) {
                style.marginLeft = `-${gutter / 2}px`;
                style.marginRight = style.marginLeft;
            }

            return style;
        }
    },
    render(h) {
        const { tag, flex, justify, align, style } = this;
        return h(
            tag,
            {
                class: [
                    "bird-row",
                    {
                        "bird-row--flex": flex
                    },
                    justify !== "start" && flex ? `is-justify-${justify}` : "",
                    align !== "top" && flex ? `is-align-${align}` : ""
                ],
                style
            },
            this.$slots.default
        );
    }
};
