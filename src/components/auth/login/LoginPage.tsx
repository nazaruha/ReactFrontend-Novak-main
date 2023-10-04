import React, { ChangeEvent, useState } from "react";
import { ILoginError, ILoginPage, IUser } from "./types";
import InputGroup from "../../common/inputGroup";
import http from "../../../http_common";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../../helpers/setAuthToken";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { AuthUserActionType } from "../types";

const LoginPage = () => {

  //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: ILoginPage = {
    email: "",
    password: ""
  };

  //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
  const [data, setData] = useState<ILoginPage>(init);
  const [errors, setErrors] = useState<ILoginError>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //console.log("Дестурктуризація", {...data, password: "123456"});

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Ми відправляємо на сервер", data);
    http.post(`api/account/login`, data)
      .then(resp => {
        const token = resp.data.token as string; // отримаємо токен з ріквеста
        // localStorage.setItem("token", token); // зберігаємо наш токен в localStorage нашого браузера
        setAuthToken(token);
        const user = jwtDecode<IUser>(token); // розшифровуємо наш токен - отримуємо данні в json форматі
        console.log("Вхід успішний", resp);
        console.log("Токен", token);
        console.log("Декодований Токен", user);

        dispatch({ type: AuthUserActionType.LOGIN_USER, payload: user }); // передаєм данні юзера в payload

        navigate("/");
      })
      .catch(badRequest => {
        // помилки, які ідуть від сервера
        const errs = badRequest.response.data.errors as ILoginError;
        console.log("Вхід не успішний ", badRequest.response.data.errors);
        console.log(errs);
        setErrors(errs);
      });
    //setData({email: "pylyp", password: "123456"});
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("Щось вводити в інтпут");
    // console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  }
  return (
    <>
      <h1 className="text-center">Вхід на сайт</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <div className={classNames(
          { ['alert alert-danger']: errors?.invalid }
        )}>
          {errors?.invalid && (
            errors.invalid.map((item, index) => (
              <span key={index}>{item}</span>
            ))
          )}
        </div>
        <InputGroup
          label="Електрона адреса"
          type="email"
          field="email"
          value={data.email}
          onChange={onChangeHandler}
          errors={errors?.email}
        />

        <InputGroup
          label="Пароль"
          type="password"
          field="password"
          value={data.password}
          onChange={onChangeHandler}
          errors={errors?.password}
        />

        <button type="submit" className="btn btn-primary">
          Вхід
        </button>
      </form>
    </>
  );
};

export default LoginPage;
