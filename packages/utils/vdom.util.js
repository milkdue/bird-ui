import { isObject } from "./type.util";

export function isVNode(node) {
    return (
        node !== null &&
        isObject(node) &&
        node.hasOwnProperty("componentOptions")
    );
}
