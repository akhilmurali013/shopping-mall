import analyticsConfig from "analytics/config";
import storeConfig from "stores/config";

import { ModuleConfig } from "./models/module-config";

const registeredModules: ModuleConfig[] = [analyticsConfig, storeConfig];
export default registeredModules;
