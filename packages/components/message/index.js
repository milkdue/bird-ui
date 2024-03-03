/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-02-18 10:46:19
 * @LastEditTime: 2024-02-28 23:01:01
 */
import Message from "./src/index.vue";
import { PopupManager } from "../../utils/popup-manager";
import { isFunction } from "../../utils/type.util";
import { isVNode } from "../../utils/vdom.util";
import "../../styles/message/index.less";

const instances = [];
let seed = 1;

export default {
    install(Vue) {
        const MessageConstructor = Vue.extend(Message);

        const $message = function(options) {
            let instance = new MessageConstructor({
                data: options
            });
            let userOnClose = options.onClose;
            let id = `message__${seed++}`;
            let verticalOffset = options.offset || 18;

            options.onClose = function() {
                $message.close(id, userOnClose);
            };
            instance.id = id;

            if (isVNode(options.message)) {
                instance.$slots.default = [options.message];
                instance.message = null;
            }
            instance.$mount();
            instance.$el.style.zIndex = PopupManager.nextZIndex();
            instances.forEach(item => {
                verticalOffset += item.$el.offsetHeight + 16;
            });
            instance.verticalOffset = verticalOffset;
            document.body.appendChild(instance.$el);
            instances.push(instance);
            instance.visible = true;

            return instance;
        };

        $message.close = function(id, userOnClose) {
            let length = instances.length;
            let index = -1;
            let removedHeight = 0;

            for (let i = 0; i < length; i++) {
                if (id === instances[i].id) {
                    removedHeight = instances[i].$el.offsetHeight;
                    index = i;
                    if (isFunction(userOnClose)) {
                        userOnClose(instances[i]);
                    }
                    instances.splice(i, 1);
                    break;
                }
            }

            if (length <= 1 || index === -1 || index > instances.length - 1) {return;}

            for (let i = index; i < length - 1; i++) {
                let dom = instances[i].$el;
                dom.style.top =
                    parseInt(dom.style.top, 10) - removedHeight - 16 + "px";
            }
        };

        Vue.prototype.$message = $message;
    }
};
