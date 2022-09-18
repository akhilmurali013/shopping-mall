import { ModuleConfig } from "app/models/module-config";

const config: ModuleConfig = {
  id: "stores",
  nav: {
    defaultName: "Stores",
    route: "stores",
    icon: { name: "shopping-bag" },
    children: [
      {
        route: "records",
        defaultName: "Store Records",
        folderPath: "stores/store-records",
      },
      {
        route: "promoted-contents",
        defaultName: "Promoted Contents",
        folderPath: "stores/promoted-contents",
      },
    ],
  },
};

export default config;
