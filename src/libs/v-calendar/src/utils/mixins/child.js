import { defaultsMixin } from '@/libs/v-calendar/src/utils/defaults';
import { popoversMixin } from '@/libs/v-calendar/src/utils/popovers';

export const childMixin = {
  inject: ['sharedState'],
  mixins: [defaultsMixin, popoversMixin],
  computed: {
    masks() {
      return this.sharedState.masks;
    },
    theme() {
      return this.sharedState.theme;
    },
    locale() {
      return this.sharedState.locale;
    },
    dayPopoverId() {
      return this.sharedState.dayPopoverId;
    },
  },
  methods: {
    format(date, mask) {
      return this.locale.format(date, mask);
    },
  },
};
