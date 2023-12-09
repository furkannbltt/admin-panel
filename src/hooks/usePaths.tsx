import { SubMenuType } from "antd/es/menu/hooks/useItems";
import { ItemType } from "antd/lib/menu/hooks/useItems";

export const usePathsForMenuKeys = (items: ItemType[], pathname: string) => {
  const path = pathname.split("/").filter((p) => p);

  if (path.length === 0)
    return {
      openKeys: [],
      selectedKey: ["dashboard"],
    };

  const selectedKey = items.find((item) =>
    path.includes(item?.key as string)
  ) as SubMenuType;
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
