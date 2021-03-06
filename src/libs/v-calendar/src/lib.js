import setupCalendar from './utils/setup';
import Calendar from '@/components/Calendar';
import DatePicker from '@/components/DatePicker';
import Locale from '@/libs/v-calendar/src/utils/locale';
import DateInfo from '@/libs/v-calendar/src/utils/dateInfo';
import Attribute from '@/libs/v-calendar/src/utils/attribute';
import AttributeStore from '@/libs/v-calendar/src/utils/attributeStore';
import * as helpers from '@/libs/v-calendar/src/utils/helpers';
import * as touch from '@/libs/v-calendar/src/utils/touch';

// Export components individually
export {
  setupCalendar,
  Calendar,
  DatePicker,
  Locale,
  DateInfo,
  Attribute,
  AttributeStore,
  helpers,
  touch,
};

// Installs the library as a plugin
const components = {
  Calendar,
  DatePicker,
};

// Declare install function executed by Vue.use()
export default function install(Vue, opts) {
  // Don't install more than once
  if (install.installed) return;
  install.installed = true;
  // Manually setup calendar with options
  const defaults = setupCalendar(opts);
  // Register components
  Object.keys(components).forEach(k =>
    Vue.component(`${defaults.componentPrefix}${k}`, components[k]),
  );
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Use automatically when global Vue instance detected
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
