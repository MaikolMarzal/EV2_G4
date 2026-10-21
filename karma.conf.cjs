module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "webpack"],
    files: ["src/**/*.spec.js", "src/**/*.spec.jsx"],
    preprocessors: {
      "src/**/*.spec.js": ["webpack"],
      "src/**/*.spec.jsx": ["webpack"],
    },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [
          { test: /\.m?jsx?$/, resolve: { fullySpecified: false } },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                plugins: [
                  ["istanbul", { exclude: ["**/*.spec.js", "**/*.spec.jsx"] }],
                ],
              },
            },
          },
          { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
      },
    },
    browsers: ["ChromeHeadless"],
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "text-summary" }, { type: "html" }],
    },
    singleRun: true,
  });
};