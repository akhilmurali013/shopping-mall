export interface IconConfig {
  name: string;
  fill?: string;
  stroke?: string;
}

export interface SubModuleConfig {
  route: string;
  defaultName: string;
  folderPath: string;
}

export interface ModuleConfig {
  id: string;
  nav: {
    defaultName: string;
    route: string;
    icon: IconConfig;
    // should be available if there is submodules
    children?: SubModuleConfig[];
    // should be available if no submodules
    folderPath?: string;
  };
}
