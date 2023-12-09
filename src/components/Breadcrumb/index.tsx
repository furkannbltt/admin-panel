import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const HeaderBreadcrumb = () => {
  const { pathname } = useLocation();

  const getPathsWithoutFirst = (path: string) => {
    const paths = path.split("/").filter((path) => path !== "");
    return paths;
  };

  const items = [
    {
      title: (
        <Link to={`/`}>
          <HomeOutlined
            style={{
              marginRight: "8px",
            }}
          />
          Anasayfa
        </Link>
      ),
    },
    ...getPathsWithoutFirst(pathname).map((path, index) => ({
      title:
        getPathsWithoutFirst(pathname).length - 1 === index ? (
          <span
            key={index}
            style={{
              textTransform: "capitalize",
            }}
          >
            {path}
          </span>
        ) : (
          <Link
            to={`/${path}`}
            style={{
              textTransform: "capitalize",
            }}
            key={index}
          >
            {path}
          </Link>
        ),
    })),
  ];

  return (
    <Breadcrumb
      items={items}
      style={{
        margin: "12px 0",
        borderRadius: "8px",
        padding: "8px 16px",
      }}
    ></Breadcrumb>
  );
};

export default HeaderBreadcrumb;
