import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthUserActionType, IAuthUser } from "../../auth/types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const DefaultHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser)
  return (
    <>
      <header data-bs-theme="dark">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Магазин
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
                  <NavLink className="nav-link active" aria-current="page" to="/">
                    Головна
                  </NavLink>
                </li>
                {isAuth && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profile">
                        Профіль
                      </NavLink>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-products">
                    Мої Товари
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/api-categories">
                    API Категорії
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/api-products">
                    API Товари
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                {isAuth ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">
                        {user?.name}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/logout"
                        onClick={(e) => {
                          e.preventDefault();
                          localStorage.removeItem("token");
                          dispatch({ type: AuthUserActionType.LOGOUT_USER })
                          navigate("/");
                        }}>
                        Вихід
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Вхід
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Реєстрація
                      </NavLink>
                    </li>
                  </>
                )
                }
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default DefaultHeader;
