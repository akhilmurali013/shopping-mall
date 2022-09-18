import React, { Suspense, useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";

import registeredModules from "app/registered-modules";

import SideBar from "../side-bar";

import "./styles.less";

const importView = (module: string) =>
  React.lazy(() => import(`../../../${module}/view`));

const useModules = () => {
  const [views, setViews] = useState(
    [] as { path: string; view: React.ReactNode }[]
  );

  useEffect(() => {
    const loadModuleViews = async () => {
      const modules = registeredModules.map((module) => {
        if (module.nav.children) {
          return module.nav.children.map((child) => ({
            path: `${module.nav.route}/${child.route}`,
            elementPath: child.folderPath,
          }));
        }
        if (module.nav.folderPath) {
          return [
            {
              path: module.nav.route,
              elementPath: module.nav.folderPath,
            },
          ];
        }
        return [];
      });
      const flattenedModules = modules.reduce((list, module) => {
        if (module?.length) {
          return [...list, ...module];
        }
        return list;
      }, [] as { path: string; elementPath: string }[]);

      const componentPromises = flattenedModules.map(async (module) => {
        const View = await importView(module.elementPath);
        return { path: module.path, view: <View /> };
      });

      Promise.all(componentPromises).then(setViews);
    };
    loadModuleViews();
  }, [registeredModules]);
  return views;
};

const App: React.FC = () => {
  const modules = useModules();

  console.log({ modules });
  return (
    <div className="app-layout">
      <SideBar />
      <div className="site-layout">
        <Suspense fallback={<div>suspense</div>}>
          <Routes>
            {modules.map((module) => (
              <Route
                key={module.path}
                path={`${module.path}/*`}
                element={module.view}
              />
            ))}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
