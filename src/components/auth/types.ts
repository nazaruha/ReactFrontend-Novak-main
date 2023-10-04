import { IUser } from "./login/types"

export interface IAuthUser { // інтерфейс який буде казати чи юзер авторизований
    isAuth: boolean
    user?: IUser
}

export enum AuthUserActionType { // actions наші
    LOGIN_USER = "AUTH_LOGIN_USER", // будем використовувати цей action для логіна користувача (isAuth = true)
    LOGOUT_USER = "AUTH_LOGOUT_USER" // будем використовувати цей action для розлогіна користувача (isAuth = false)
}