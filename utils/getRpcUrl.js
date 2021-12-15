import random from "lodash/random";

export const nodes = [
  "https://bsc-dataseed.binance.org/",
];

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1);
  return nodes[randomIndex];
};

export default getNodeUrl;
