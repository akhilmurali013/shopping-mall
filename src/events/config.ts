import { ModuleConfig } from "app/models/module-config";

import routes from "./routes";

const config: ModuleConfig = {
  id: "events",
  nav: {
    defaultName: "Events",
    route: routes.root,
    icon: { name: "loud-speaker" },
    folderPath: "events",
  },
};

export default config;
