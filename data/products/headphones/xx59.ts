import { Product } from "@interfaces";

const XX59: Product = {
  name: "XX59",
  description:
    "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
  price: 889,
  createdAt: new Date("10/16/2021"),
  features: [
    "These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.",
    "More than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.",
  ],
  inTheBox: [
    { qnt: 1, item: "Headphone Unit" },
    { qnt: 2, item: "Replacement Earcups" },
    { qnt: 1, item: "User Manual" },
    { qnt: 1, item: "3.5mm 5m Audio Cable" },
  ],
  category: "headphones",
  key: "XX59",
  isHero: false,
};

export default XX59;
