/*
 * @Author: 可以清心
 * @Description: Col 组件
 * @Date: 2024-01-22 16:24:03
 * @LastEditTime: 2024-01-31 18:14:25
 */
export default {
    name: "BirdCol",
    props: {
        tag: {
            type: String,
            default: "div"
        },
        span: {
            type: Number,
            default: 24
        },
        offset: Number,
        xs: [Number, Object],
        sm: [Number, Object],
        md: [Number, Object],
        lg: [Number, Object],
        xl: [Number, Object]
    },
    computed: {
        style() {
            let parent = this.$parent;

            while (parent.$options.componentName !== "BirdRow") {
                parent = parent.$parent;
            }

            const style = {};

            if (parent.gutter) {
                let padding = parent.gutter ? parent.gutter / 2 : 0;

                style.paddingLeft = `${padding}px`;
                style.paddingRight = `${padding}px`;
            }

            return style;
        }
    },
    render(h) {
        const { tag, span, style } = this;
        const classList = [];

        if (this.offset) {
            classList.push(`bird-col-offset-${this.offset}`);
        }

        ["xs", "sm", "md", "lg", "xl"].forEach(size => {
            if (typeof this[size] === "number") {
                classList.push(`bird-col-${size}-${this[size]}`);
            } else if (typeof this[size] === "object") {
                const props = this[size];
                Object.keys(props).forEach(prop => {
                    classList.push(
                        prop !== "span"
                            ? `bird-col-${size}-${prop}-${props[prop]}`
                            : `bird-col-${size}-${props[prop]}`
                    );
                });
            }
        });

        return h(
            tag,
            {
                class: ["bird-col", `bird-col-${span}`, ...classList],
                style
            },
            this.$slots.default
        );
    }
};
