import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../auth/types";
import { useEffect } from "react";

const AdminLayout = () => {
    const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate("/login")
        else if (user?.roles !== "admin") navigate("/not-found")
    }, [])

    return (
        <>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <AdminSidebar />
                    <div className="col py-3">
                        {/* placeholder for chilhood components in Route with element "DefaultLayout" */}
                        {/* Сюди підставляється наш дочірній компонент */}
                        {isAuth && <Outlet />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;