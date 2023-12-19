import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCity,
  faClipboard,
  faHotel,
  faPlane,
  faUsers,
  faUsersBetweenLines,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { usePathsForMenuKeys } from "../../hooks/usePaths";
import "./style.scss";

interface SideBarProps {
  collapsed: boolean;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key?: React.Key | null): MenuItem {
  return {
    key,
    label,
  } as MenuItem;
}

const Sidebar: React.FC<SideBarProps> = ({ collapsed }) => {
  const { pathname } = useLocation();

  const items: MenuItem[] = [
    getItem(
      <Link to="/activity">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faClipboard} />
          {collapsed && <span className="label">Aktiviteler</span>}
        </div>
      </Link>,
      "activity"
    ),
    getItem(
      <Link to="/city">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faCity} />
          {collapsed && <span className="label">Şehirler</span>}
        </div>
      </Link>,
      "city"
    ),
    getItem(
      <Link to="/hotel">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faHotel} />
          {collapsed && <span className="label">Oteller</span>}
        </div>
      </Link>,
      "hotel"
    ),
    getItem(
      <Link to="/airport">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faPlane} />
          {collapsed && <span className="label">Havalimanları</span>}
        </div>
      </Link>,
      "airport"
    ),
    getItem(
      <Link to="/terminal">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faBus} />
          {collapsed && <span className="label">Terminaller</span>}
        </div>
      </Link>,
      "bus"
    ),
    getItem(
      <Link to="/group">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faUsersBetweenLines} />
          {collapsed && <span className="label">Gruplar</span>}
        </div>
      </Link>,
      "group"
    ),
    getItem(
      <Link to="/user">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faUsers} />
          {collapsed && <span className="label">Kullanıcılar</span>}
        </div>
      </Link>,
      "user"
    ),
  ];
  const { openKeys, selectedKey } = usePathsForMenuKeys(items, pathname);

  return (
    <Menu
      style={{ height: "100%", borderRight: 0, paddingTop: "4rem" }}
      multiple={false}
      selectable={false}
      defaultOpenKeys={openKeys}
      mode="inline"
      items={items}
      selectedKeys={selectedKey as string[]}
    />
  );
};

export default Sidebar;
