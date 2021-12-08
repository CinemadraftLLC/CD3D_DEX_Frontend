const withImages = require("next-images");

module.exports = {
  withImages,
  images: {
    loader: 'static'
  },
  env: {
    REACT_APP_NETWORK_URL: process.env.REACT_APP_NETWORK_URL,
    REACT_APP_CHAIN_ID: process.env.REACT_APP_CHAIN_ID
  }
};
