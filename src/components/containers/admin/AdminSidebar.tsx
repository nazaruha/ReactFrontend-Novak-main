import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">Menu</span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li className="nav-item">
                            <Link to="/" className="nav-link align-middle px-0">
                                <i className="fa fa-home" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#submenu1"
                                data-bs-toggle="collapse"
                                className="nav-link px-0 align-middle"
                            >
                                <i className="fa fa-bars" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline">Категорії</span>
                            </Link>
                            <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                <li className="w-100">
                                    <Link
                                        to="/admin/categories/list"
                                        className="nav-link px-0"
                                    >
                                        <i className="fa fa-list-alt ms-4 me-2" aria-hidden="true"></i>
                                        <span className="d-none d-sm-inline">Список</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="categories/create"
                                        className="nav-link px-0"
                                    >
                                        <i className="fa fa-plus-square ms-4 me-2" aria-hidden="true"></i>
                                        <span className="d-none d-sm-inline">Додати</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                to="#submenu2"
                                data-bs-toggle="collapse"
                                className="nav-link px-0 align-middle"
                            >
                                <i className="fa fa-bars" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline">Продукти</span>
                            </Link>
                            <ul className="collapse show nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                <li className="w-100">
                                    <Link
                                        to="/admin/products"
                                        className="nav-link px-0"
                                    >
                                        <i className="fa fa-list-alt ms-4 me-2" aria-hidden="true"></i>
                                        <span className="d-none d-sm-inline">Список</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="products/create"
                                        className="nav-link px-0"
                                    >
                                        <i className="fa fa-plus-square ms-4 me-2" aria-hidden="true"></i>
                                        <span className="d-none d-sm-inline">Додати</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <hr />
                    <div className="dropdown pb-4">
                        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                            <span className="d-none d-sm-inline mx-1">loser</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar;