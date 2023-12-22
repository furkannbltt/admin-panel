import { MenuItem } from "../components/SideBar";

export const usePathsForMenuKeys = (items: MenuItem[], pathname: string) => {
  const path = pathname.split("/").filter((p) => p);

  if (path.length === 0)
    return {
      openKeys: [],
      selectedKey: ["dashboard"],
    };

  const selectedKey = items.find((item) =>
    path.includes(item?.key as string)
  );
  if (path.length === 1)
    return {
      openKeys: [path[0]],
      selectedKey: [selectedKey?.key],
    };

  return {
    openKeys: [path[0]],
    selectedKey: path[path.length - 1],
  };
};
