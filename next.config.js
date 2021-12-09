const withImages = require("next-images");

module.exports = {
  images: {
    domains: ['localhost', 'http://18.116.235.55'],
  },
  env: {
    REACT_APP_NETWORK_URL: process.env.REACT_APP_NETWORK_URL,
    REACT_APP_CHAIN_ID: process.env.REACT_APP_CHAIN_ID
  }
};
