import type { StorybookConfig } from "@storybook/react-webpack5";
const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
  webpackFinal: async (config) => {
    if (config.module && config.resolve) {
      if (config.module?.rules && config.resolve?.extensions) {
        config.module.rules.push({
          test: /\.(ts|tsx)$/,
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              ["react-app", { flow: false, typescript: true }],
              require.resolve("@emotion/babel-preset-css-prop"),
            ],
          },
        });
        config.resolve.extensions.push(".ts", ".tsx");
        config.resolve.alias = {
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "@emotion/styled": toPath("node_modules/@emotion/styled"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        };
      }
    }
    return config;
  },
};
export default config;
