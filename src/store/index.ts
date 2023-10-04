import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { AuthReducer } from "../components/auth/authReducer";

export const rootReducer = combineReducers({ // імпортуєм наші редюсери
    auth: AuthReducer // підключити наш редюсер, який міститься під полем auth
});

/*
// creates store - це те, що буде збергіатись в редаксі. Це Старіший спосіб створення стораі
export const store = createStore(rootReducer, // набір наших редюсерів, які будуть в редаксі
    // composeWithDevTools -> щоб працював дев тулс, щоб в браузері дивитись через F12
    composeWithDevTools(applyMiddleware(thunk) /* applyMiddleware(thunk) -> щоб міг редакс працювати асинхроно*///))

export const store = configureStore({ // це новий стор, в якому буде зберігатись все, що в редаксі
    reducer: rootReducer, // набір наших редюсерів, які будуть в редаксі
    devTools: true, // щоб працював дев тулс, щоб в браузері дивитись через F12
    middleware: [thunk] // щоб міг редакс працювати асинхроно
});