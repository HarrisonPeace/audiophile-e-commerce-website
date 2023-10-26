import { defineFormKitConfig } from "@formkit/vue";

import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import tailwindTheme from "./formkit-tailwind-theme.js"; // change to your theme's path

import QntInput from "./formkit/QntInput.vue";

function scrollToErrors(node: any) {
  if (node.props.type === "form") {
    function scroll(node: any) {
      const el = document.getElementById(node.props.id);
      const formkitOuter = el?.closest?.(".formkit-outer");
      const scrollToElement: any = formkitOuter || el;
      if (scrollToElement) {
        const generalStore = useGeneralStore();
        const x = scrollToElement.scrollLeft;
        const y = scrollToElement.offsetTop - generalStore.headerHeight - 24;
        scrollTo(x, y);
      }
    }

    function scrollToErrors() {
      node.walk((child: any) => {
        if (child.ledger.value("blocking") || child.ledger.value("errors")) {
          scroll(child);
          return false;
        }
      }, true);
    }

    const onSubmitInvalid = node?.props?.onSubmitInvalid;
    node.props.onSubmitInvalid = () => {
      onSubmitInvalid && onSubmitInvalid(node);
      scrollToErrors();
    };
    node.on("unsettled:errors", scrollToErrors);
  }
  return false;
}

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
  plugins: [scrollToErrors],
});
