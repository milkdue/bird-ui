export default {
    name: "exposure",
    inserted(el, binding) {
        const modifiers = binding.modifiers;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeof binding.value === "function") {
                        binding.value(entry.target);
                    }
                    if (modifiers.once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        });
        observer.observe(el);
        el._observer = observer;
    },
    unbind(el) {
        if (el._observer) {
            el._observer.disconnect();
            delete el._observer;
        }
    }
};
