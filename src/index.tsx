import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
//store (redux) imports
import { store } from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./helpers/setAuthToken";
import { AuthUserActionType } from "./components/auth/types";
import jwtDecode from "jwt-decode";
import { IUser } from "./components/auth/login/types";

if (localStorage.token) { //перевіряє чи є токен уже в нашому localStorage
  setAuthToken(localStorage.token);  // і якщо є, то записуєм наш токен в axios
  const user = jwtDecode<IUser>(localStorage.token); // розшифровуємо наш токен - отримуємо данні в json форматі
  store.dispatch({ type: AuthUserActionType.LOGIN_USER, payload: user }); // логіним юзера в редюсері (isAuth = true) і передаєм його данні в payload
}

const root = ReactDOM.createRoot(
  document.getElementById('root')! as HTMLElement // находимо #root елемент в нашому index.html, який знаходиться в папці public
  // ! означає, тіпа якщо найшли, то рендерим, якщо не найшли то не рендерим
);
root.render(
  <Provider store={store}> {/* подключаєм наш редакс і стор */}
    <BrowserRouter> {/* для того, щоб працювала маршрутизація. react-router-dom */}
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
