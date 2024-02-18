/*
 * @Author: 可以清心
 * @Description: BirdDivider
 * @Date: 2024-02-18 10:46:47
 * @LastEditTime: 2024-02-18 23:21:06
 */
export default {
    name: "BirdDivider",
    props: {
        type: {
            type: String,
            default: "primary",
            validator(value) {
                return ["primary", "link", "success", "warn", "error"].includes(
                    value
                );
            }
        },
        lineType: {
            type: String,
            default: "solid",
            validator(value) {
                return ["solid", "dotted", "dashed", "double"].includes(value);
            }
        },
        width: Number,
        // 实线
        fillWidth: Number,
        // 虚线
        dashWidth: Number,
        color: String,
        angle: Number,
        fade: Boolean,
        content: String
    },
    computed: {
        hrStyle() {
            let style = {};
            const {
                width,
                lineType,
                fillWidth,
                dashWidth,
                color,
                type,
                angle,
                fade,
                content
            } = this;

            if (width) {
                style.borderTopWidth = width + "px";
            }

            if (color) {
                style.borderTopColor = color;
            }

            if (lineType === "dashed" && fillWidth && dashWidth) {
                let fill = color || `var(--${type}-color-light)`;

                style.borderTop = "none";
                style.paddingTop = width ? width + "px" : "1px";

                if (angle) {
                    style.background = `repeating-linear-gradient(${angle}deg, ${fill} 0, ${fill} ${fillWidth + "px"}, transparent ${fillWidth + "px"}, transparent ${fillWidth + dashWidth + "px"})`;
                } else {
                    style.background = `repeating-linear-gradient(to right, ${fill} 0 ${fillWidth + "px"}, transparent 0 ${fillWidth + dashWidth + "px"})`;
                }
            }

            if (fade) {
                // mask-image 遮照的非透明部分和元素重叠的部分才进行显示
                style.maskImage = "linear-gradient(to right, transparent, black, transparent)";
            }

            if (lineType === "solid" && content) {
                style["--divider-content-width"] = width ? width + "px" : "1px";
                style["--divider-content-color"] =
                    color || `var(--${type}-color-light)`;
            }

            return style;
        }
    },
    render(h) {
        const { type, lineType, hrStyle, content } = this;
        return h("hr", {
            class: {
                "bird-divider": true,
                [type]: true,
                [`hr-${lineType}`]: true,
                "hr-solid-content": lineType === "solid" && content
            },
            style: hrStyle,
            attrs: {
                "data-content": content
            }
        });
    }
};
