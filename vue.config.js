const autoPrefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  css: {
    // modules: false,
    // extract: true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          autoPrefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  }
};
