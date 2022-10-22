const CracoLessPlugin = require("craco-less");

const theme = require("./theme");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": theme.color["primary-600"],
              "@success-color": theme.color["success-700"],
              "@warning-color": theme.color["warning-700"],
              "@error-color": theme.color["error-700"],
              "@text-color": theme.color["gray-700"],
              "@border-radius-base": theme["border-radius-base"],
              "@border-color-base": theme.color["gray-300"],
              "@disabled-color": theme.color["gray-500"],
              "@disabled-bg": theme.color["gray-50"],
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
