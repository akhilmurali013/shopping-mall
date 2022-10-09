import { ModuleConfig } from "app/models/module-config";

import storeRecordRotes from "./store-records/routes";

export const root = "stores";

const config: ModuleConfig = {
  id: "stores",
  nav: {
    defaultName: "Stores",
    icon: { name: "shopping-bag" },
    route: root,
    children: [
      {
        route: `${root}/${storeRecordRotes.root}`,
        defaultName: "Store Records",
        folderPath: "stores/store-records",
      },
      {
        route: `${root}/promoted-contents`,
        defaultName: "Promoted Contents",
        folderPath: "stores/promoted-contents",
      },
    ],
  },
};

export default config;
