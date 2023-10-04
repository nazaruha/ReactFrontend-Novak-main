// описує типи для фоми логіна
export interface ILoginPage {
  email: string;
  password: string;
}

export interface ILoginError {
  email: string[],
  password: string[],
  invalid: string[], // буде виводитись тоді, коли ти ввів пошту і пароль, але пароль такий не підвязаний до пошти
}

export interface IUser {
  name: string,
  image: string,
  roles: string,
}
