import { Product } from "@interfaces";

const xx99MarkOne: Product = {
  name: "XX99 Mark I",
  description:
    "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
  price: 1750,
  createdAt: new Date("10/16/2022"),
  features: [
    "As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.",
    "From the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is included with a balanced gold connector.",
  ],
  inTheBox: [
    { qnt: 1, item: "Headphone Unit" },
    { qnt: 2, item: "Replacement Earcups" },
    { qnt: 1, item: "User Manual" },
    { qnt: 1, item: "3.5mm 5m Audio Cable" },
  ],
  category: "headphones",
  key: "xx99MarkOne",
  isHero: true,
};

export default xx99MarkOne;
