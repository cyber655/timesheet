import { isFunction } from '@/libs/v-calendar/src/utils/_';

export const safeScopedSlotMixin = {
  methods: {
    safeScopedSlot(name, args, def = null) {
      return isFunction(this.$scopedSlots[name])
        ? this.$scopedSlots[name](args)
        : def;
    },
  },
};
