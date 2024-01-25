const webpack = require("@cypress/webpack-preprocessor");

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.cy.ts$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    },
  };

  on("file:preprocessor", webpack(options));
};
