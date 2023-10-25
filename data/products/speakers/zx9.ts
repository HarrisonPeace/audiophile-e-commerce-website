import { Product } from "@interfaces";

const ZX9: Product = {
  name: "ZX9",
  description:
    "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
  price: 4500,
  createdAt: new Date(),
  features: [
    "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).",
    "Discover clear, more natural sounding highs than the competition with ZX9’s signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass unit. You’ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.",
  ],
  inTheBox: [
    { qnt: 1, item: "Speaker Unit" },
    { qnt: 2, item: "Speaker Cloth Panel" },
    { qnt: 1, item: "User Manual" },
    { qnt: 1, item: "3.5mm 10m Audio Cable" },
    { qnt: 1, item: "10m Optical Cable" },
  ],
  category: "speakers",
  key: "9",
  isHero: true,
};

export default ZX9;
