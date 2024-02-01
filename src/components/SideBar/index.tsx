import React, { useContext } from "react";
import { Menu } from "antd";
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
import { AuthContext } from "../../context/Auth";
import { PermissonsType } from "../../models/models";
import { ClaimModel } from "../../pages/users/types";

interface SideBarProps {
  collapsed: boolean;
}

export interface MenuItem {
  label: React.ReactNode;
  key: React.Key | null;
  claimKey: string;
}

function getItem(
  label: React.ReactNode,
  key: React.Key | null,
  claimKey: string
) {
  return {
    key,
    label,
    claimKey,
  };
}

const Sidebar: React.FC<SideBarProps> = ({ collapsed }) => {
  const { userClaimList } = useContext(AuthContext);
  const { pathname } = useLocation();

  const items = [
    getItem(
      <Link to="/activity">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faClipboard} />
          {
            <span className={`label ${!collapsed ? "collapsed" : ""}`}>
              Aktiviteler
            </span>
          }
        </div>
      </Link>,
      "activity",
      PermissonsType.Activity
    ),
    getItem(
      <Link to="/city">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faCity} />
          {
            <span className={`label ${!collapsed ? "collapsed" : ""}`}>
              Şehirler
            </span>
          }
        </div>
      </Link>,
      "city",
      PermissonsType.City
    ),
    getItem(
      <Link to="/hotel">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faHotel} />
          {
            <span className={`label ${!collapsed ? "collapsed" : ""}`}>
              Oteller
            </span>
          }
        </div>
      </Link>,
      "hotel",
      PermissonsType.Hotel
    ),
    getItem(
      <Link to="/airport">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faPlane} />
          {
            <span className={`label ${!collapsed ? "collapsed" : ""}`}>
              Havalimanları
            </span>
          }
        </div>
      </Link>,
      "airport",
      PermissonsType.Airport
    ),
    getItem(
      <Link to="/terminal">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faBus} />
          {
            <span className={`label ${!collapsed ? "collapsed" : ""}`}>
              Terminaller
            </span>
          }
        </div>
      </Link>,
      "terminal",
      PermissonsType.Terminal
    ),
    getItem(
      <Link to="/group">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faUsersBetweenLines} />
          {
            <span className={`label ${!collapsed ? "collapsed" : ""}`}>
              Gruplar
            </span>
          }
        </div>
      </Link>,
      "group",
      PermissonsType.Group
    ),
    getItem(
      <Link to="/user">
        <div className="side-menu-item">
          <FontAwesomeIcon icon={faUsers} />
          {
            <span className={`label ${!collapsed ? "collapsed" : ""}`}>
              Kullanıcılar
            </span>
          }
        </div>
      </Link>,
      "user",
      PermissonsType.Users
    ),
  ];
  const { openKeys, selectedKey } = usePathsForMenuKeys(items, pathname);

  const filteredItems = items.filter((item) =>
    userClaimList.some((claim: ClaimModel) => claim.name === item.claimKey)
  );
  return (
    <div className="side-bar-wrapper">
      {collapsed ? (
        <img className="logo" src="/biglogo.png" alt="turcotravel" />
      ) : (
        <img className="logo" src="/LOGO.png" alt="turcotravel" />
      )}
      <Menu
        theme="dark"
        className="menu"
        multiple={false}
        selectable={false}
        defaultOpenKeys={openKeys}
        mode="inline"
        items={filteredItems as any}
        selectedKeys={selectedKey as string[]}
      />
    </div>
  );
};

export default Sidebar;
