import { setupDefaults } from '@/libs/v-calendar/src/utils/defaults';
import { setupScreens } from '@/libs/v-calendar/src/utils/screens';

export default opts => {
  // Register plugin defaults
  const defaults = setupDefaults(opts);
  // Install support for responsive screens
  setupScreens(defaults.screens, true);
  return defaults;
};
