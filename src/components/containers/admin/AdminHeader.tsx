import { FC } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthUserActionType, IAuthUser } from "../../auth/types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AdminHeader: FC = () => {

    const { isAuth } = useSelector((store: any) => store.auth as IAuthUser)
    return (
        <>
            <header data-bs-theme="dark">
                <nav
                    className="navbar navbar-expand-md navbar-light fixed-top bg-light"
                    style={{
                        borderBottom: "1px solid #212529"
                    }}
                >
                    <div className="container">
                        <NavLink className="navbar-brand" to="/admin">
                            Адмін панель
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                            aria-controls="navbarCollapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/admin/categories/list">
                                        Категорії
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Головна
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default AdminHeader;