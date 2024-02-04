/*
 * @Author: 可以清心
 * @Description: tag
 * @Date: 2024-02-04 15:10:00
 * @LastEditTime: 2024-02-04 15:16:06
 */
export function getParentByTag(vm, tag) {
    while (vm !== vm.$root) {
        if (vm.$options._componentTag === tag) {
            return vm;
        }

        vm = vm.$parent;
    }
}
