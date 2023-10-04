import { AuthUserActionType, IAuthUser } from "./types";
import { IUser } from "./login/types";

const initState: IAuthUser = {
    isAuth: false
}

//state - те що він зберігає
//action - це дії які він може виконувати
export const AuthReducer = (state = initState, action: any): IAuthUser => {
    switch (action.type) {
        case AuthUserActionType.LOGIN_USER: { // юзається, коли наш користувач залогінився
            return {
                ...state,
                isAuth: true,
                user: action.payload // зберігаємо інфо про юзера який залогінився
            };
        }
        case AuthUserActionType.LOGOUT_USER: { // юзається, коли наш користувач  розлогінився
            return {
                ...state,
                isAuth: false,
                user: undefined
            };
        }
    }
    return state;
}