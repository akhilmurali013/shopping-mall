import analyticsConfig from "analytics/config";
import eventsConfig from "events/config";
import restaurantConfig from "restaurants/config";
import storeConfig from "stores/config";

import { ModuleConfig } from "./models/module-config";

const registeredModules: ModuleConfig[] = [
  analyticsConfig,
  storeConfig,
  restaurantConfig,
  eventsConfig,
];
export default registeredModules;
