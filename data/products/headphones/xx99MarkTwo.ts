import type { Product } from "@interfaces";

const xx99MarkTwo: Product = {
  name: "XX99 Mark II",
  description:
    "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
  price: 2999,
  createdAt: new Date(),
  features: [
    "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.",
    "The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.",
  ],
  inTheBox: [
    { qnt: 1, item: "Headphone Unit" },
    { qnt: 2, item: "Replacement Earcups" },
    { qnt: 1, item: "User Manual" },
    { qnt: 1, item: "3.5mm 5m Audio Cable" },
    { qnt: 1, item: "Travel Bag" },
  ],
  category: "headphones",
  key: "xx99MarkTwo",
  isHero: false,
};

export default xx99MarkTwo;
