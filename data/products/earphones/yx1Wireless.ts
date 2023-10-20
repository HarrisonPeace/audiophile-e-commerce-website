import { Product } from "@interfaces";

const yx1Wireless: Product = {
  name: "YX1 WIRELESS",
  description:
    "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
  price: 599,
  createdAt: new Date(),
  features: [
    "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.",
    "The YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.",
  ],
  inTheBox: [
    { qnt: 1, item: "Earphone Unit" },
    { qnt: 2, item: "Multi-size Earplugs" },
    { qnt: 1, item: "User Manual" },
    { qnt: 1, item: "USB-C Charging Cable" },
    { qnt: 1, item: "Travel Pouch" },
  ],
  category: "earphones",
  key: "yx1Wireless",
  isHero: true,
};

export default yx1Wireless;
