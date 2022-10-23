import React, { useMemo, useRef, useState } from "react";

import { NavLink, matchPath, useLocation, useNavigate } from "react-router-dom";

import { useClickAway } from "ahooks";
import { Button, Typography } from "antd";

import { ModuleConfig } from "app/models/module-config";
import registeredModules from "app/registered-modules";
import Logo from "common/components/hi-lite-logo";
import Icon from "common/components/icon";
import useUserStore from "common/store/useUserStore";

import LogoutConfirmationModal from "../log-out-confirmation";

import "./styles.less";

const { Title, Text } = Typography;

const NavEntry: React.FC<{
  icon?: React.ReactNode;
  name: string;
}> = ({ icon, name }) => (
  <div className="nav-entry">
    <span className="icon">{icon}</span>
    {name}
  </div>
);

const NavLinkItem: React.FC<{
  icon?: React.ReactNode;
  name: string;
  path: string;
}> = ({ icon, name, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}
  >
    <NavEntry icon={icon} name={name} />
  </NavLink>
);

const NavItemNestedTabs: React.FC<{ module: ModuleConfig }> = ({ module }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useClickAway(() => setOpen(false), ref);

  const isActive = useMemo(() => {
    const match = matchPath("/a/:tab/*", pathname);
    return match?.params?.tab === module.nav.route;
  }, [pathname]);

  return (
    <div ref={ref} role="presentation">
      <div role="presentation" onClick={() => setOpen((p) => !p)}>
        <NavEntry
          name={module.nav.defaultName}
          icon={<Icon {...module.nav.icon} />}
        />
      </div>
      {(isActive || open) && (
        <>
          {module?.nav?.children?.map((child) => (
            <NavLinkItem
              key={child.defaultName}
              name={child.defaultName}
              path={child.route}
            />
          ))}
        </>
      )}
    </div>
  );
};

const NavItem: React.FC<{ module: ModuleConfig }> = ({ module }) => (
  <NavLinkItem
    name={module.nav.defaultName}
    path={module.nav.route as string}
    icon={<Icon {...module.nav.icon} />}
  />
);

const SideBarContents: React.FC = () => (
  <>
    {registeredModules.map((module) =>
      module.nav.children?.length ? (
        <NavItemNestedTabs key={module.id} module={module} />
      ) : (
        <NavItem key={module.id} module={module} />
      )
    )}
  </>
);

const SideBarHeader: React.FC = () => (
  <div className="side-bar-header">
    <Logo />
    <Title level={5} className="text-content">
      HiLITE MALL
    </Title>
  </div>
);

const SideBarFooter: React.FC = () => {
  const navigate = useNavigate();
  const [showConfirmModal, toggleConfirmModal] = useState(false);
  const userDetails = useUserStore((state) => state.userDetails);
  const clearUserDetails = useUserStore((state) => state.clearUserDetails);

  const onLogout = () => {
    clearUserDetails();
    toggleConfirmModal(false);
    navigate("/login");
  };
  return (
    <>
      <div className="side-bar-footer">
        <div>
          <Title level={5} className="user-name">
            {" "}
            {userDetails?.firstName}
          </Title>
          <Text type="secondary">{userDetails?.email}</Text>
        </div>
        <div className="icon">
          <Button
            type="link"
            shape="circle"
            icon={<Icon name="logout" />}
            onClick={() => toggleConfirmModal(true)}
          />
        </div>
      </div>
      {showConfirmModal && (
        <LogoutConfirmationModal
          onClose={() => toggleConfirmModal(false)}
          onDeleteClick={onLogout}
        />
      )}
    </>
  );
};

const SideBar: React.FC = () => (
  <div className="side-bar">
    <div className="header">
      <SideBarHeader />
    </div>
    <div className="content">
      <SideBarContents />
    </div>
    <div className="footer">
      <SideBarFooter />
    </div>
  </div>
);

export default SideBar;
