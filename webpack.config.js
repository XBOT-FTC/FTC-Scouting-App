const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    plugins: [
        new NodePolyfillPlugin(),
        // other plugins
      ],    
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve("path-browserify"),
        // add more polyfills as needed
      },
    },
  };
  