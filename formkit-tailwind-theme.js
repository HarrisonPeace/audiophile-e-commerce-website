/*
 * These styles have been altered from the styles provided on the formkit website: https://formkit.com/getting-started/installation
 * Only the inputs needed have been styled
 */

export default {
  global: {
    inner:
      "formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed font-bold formkit-disabled:pointer-events-none",
    input: "appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none",
    label: "block mb-1 font-bold text-sm",
    legend: "font-bold text-sm",
    loaderIcon: "inline-flex items-center w-4 text-gray-600 animate-spin",
    message: "text-red-500 mb-1 text-xs",
    messages: "list-none p-0 mt-1 mb-0",
    outer: "mb-6 formkit-disabled:opacity-50",
  },

  "family:text": {
    inner:
      "flex items-center ring-1 ring-gray-300 focus-within:ring-primary [&>label:first-child]:focus-within:text-primary rounded-lg mb-1 ",
    input: "w-full px-6 py-4 border-none text-base text-gray-700 placeholder-gray-400",
    label: "text-gray-700 text-xs focus-within:text-primary ",
  },

  radio: {
    decorator:
      "!rounded-full block relative h-5 w-5 mr-2 rounded-lg bg-white ring-1 ring-gray-300 peer-checked:ring-primary  text-transparent peer-checked:text-primary",
    decoratorIcon:
      "w-5 h-5 p-[5px] !rounded-full bg-white flex p-[3px] w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
    wrapper:
      "flex items-center mb-1 p-4 border border-solid border-gray-300 focus:border-primary transition-all hover:border-primary cursor-pointer checked:border-primary rounded-lg font-bold",
    options: "flex flex-col gap-4",
    input: "absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none peer",
    inner: "$remove:formkit-disabled:bg-gray-200",
    label: "$reset text-sm text-gray-700 mt-1 select-none",
  },
};
