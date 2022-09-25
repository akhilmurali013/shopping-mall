import { ModuleConfig } from "app/models/module-config";

import routes from "./routes";

const config: ModuleConfig = {
  id: "restaurants",
  nav: {
    defaultName: "Restaurants",
    route: routes.root,
    icon: { name: "filter" },
    folderPath: "restaurants",
  },
};

export default config;
