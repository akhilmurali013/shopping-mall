import { ModuleConfig } from "app/models/module-config";

import restaurantRoutes from "./restaurant-records/routes";

export const root = "restaurant";

const config: ModuleConfig = {
  id: "restaurants",
  nav: {
    defaultName: "Restaurants",
    route: root,
    icon: { name: "filter" },
    children: [
      {
        route: `${root}/${restaurantRoutes.root}`,
        defaultName: "Restaurant Records",
        folderPath: "restaurants/restaurant-records",
      },
    ],
  },
};

export default config;
