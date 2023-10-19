import { defineFormKitConfig } from "@formkit/vue";

import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import tailwindTheme from "./formkit-tailwind-theme.js"; // change to your theme's path

import QntInput from "./formkit/QntInput.vue";

export default defineFormKitConfig({
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(tailwindTheme),
  },
  inputs: {
    qntinput: {
      type: "input",
      component: QntInput,
    },
  },
});
