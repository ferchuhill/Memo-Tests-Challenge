import type { StorybookConfig } from "@storybook/nextjs";
const path = require("path");
const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },

    webpackFinal: async (config) => {
        config.module?.rules?.push({
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "postcss-loader",
                "sass-loader",
            ],
        });

        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "@": path.resolve(__dirname, "../src/"),
            };
        }

        return config;
    },
};
export default config;