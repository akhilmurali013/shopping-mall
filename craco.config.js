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
              "@primary-color": theme.color["primary-700"],
              "@success-color": theme.color["success-700"],
              "@warning-color": theme.color["warning-700"],
              "@error-color": theme.color["error-700"],
              "@text-color": theme.color["gray-700"],
              "@border-radius-base": theme["border-radius-base"],
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
