const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-controls",
        "@storybook/addon-knobs",
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            // this is for both less and scss
            test: /.*\.(?:sc|c)ss$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: true,
                    },
                },
                "sass-loader",
            ],
        });

        config = {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    "@emotion/core": toPath("node_modules/@emotion/react"),
                    "emotion-theming": toPath("node_modules/@emotion/react"),
                },
            },
        };

        return config;
    },
};
