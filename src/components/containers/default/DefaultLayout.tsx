import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
  return (
    <>
      <DefaultHeader />
      <div className="container">
        {/* placeholder for chilhood components in Route with element "DefaultLayout" */}
        {/* Сюди підставляється наш дочірній компонент */}
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
