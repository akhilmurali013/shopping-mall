import { ModuleConfig } from "app/models/module-config";

import comboOffersRoutes from "./combo-offers/routes";
import promotedContentRotes from "./promoted-contents/routes";
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
      {
        route: `${root}/${comboOffersRoutes.root}`,
        defaultName: "Combo Offers",
        folderPath: "restaurants/combo-offers",
      },
      {
        route: `${root}/${promotedContentRotes.root}`,
        defaultName: "Promoted Contents",
        folderPath: "restaurants/promoted-contents",
      },
    ],
  },
};

export default config;
