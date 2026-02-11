import { createPopper } from '@popperjs/core';

export default {
    mounted(el, binding) {
        let targetId, placement, offset;

        if (typeof binding.value === 'string') {
            targetId = binding.value;
            placement = binding.arg || 'bottom';
            offset = [0, 8];
        } else if (typeof binding.value === 'object' && binding.value !== null) {
            targetId = binding.value.targetId;
            placement = binding.value.placement || binding.arg || 'bottom';
            offset = binding.value.offset || [0, 8];
        }

        if (!targetId) return;

        const startPopper = (target) => {
            try {
                const popperInstance = createPopper(target, el, {
                    placement: placement,
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: offset,
                            },
                        },
                        {
                            name: 'preventOverflow',
                            options: {
                                padding: 16,
                            },
                        },
                    ],
                });

                const mutationObserver = new MutationObserver(() => {
                    popperInstance.update();
                });

                mutationObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                });

                const resizeObserver = new ResizeObserver(() => {
                    popperInstance.update();
                });

                resizeObserver.observe(target);
                resizeObserver.observe(el);

                el._popperInstance = popperInstance;
                el._mutationObserver = mutationObserver;
                el._resizeObserver = resizeObserver;
            } catch (err) {
                // Silently fail or log in dev
            }
        };

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            startPopper(targetElement);
        } else {
            const targetObserver = new MutationObserver(() => {
                const target = document.getElementById(targetId);
                if (target) {
                    startPopper(target);
                    targetObserver.disconnect();
                }
            });

            targetObserver.observe(document.body, {
                childList: true,
                subtree: true,
            });

            el._targetObserver = targetObserver;
        }
    },

    updated(el) {
        if (el._popperInstance) {
            el._popperInstance.update();
        }
    },

    beforeUnmount(el) {
        if (el._popperInstance) {
            el._popperInstance.destroy();
            el._popperInstance = null;
        }
        if (el._mutationObserver) {
            el._mutationObserver.disconnect();
            el._mutationObserver = null;
        }
        if (el._resizeObserver) {
            el._resizeObserver.disconnect();
            el._resizeObserver = null;
        }
        if (el._targetObserver) {
            el._targetObserver.disconnect();
            el._targetObserver = null;
        }
    },
};
