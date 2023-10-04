export interface IRegisterPage {
  email: string;
  firstName: string;
  secondName: string;
  photo: string;
  // image: File | null; // або файл або налл
  // countryId?: number; // буде зберігатись id вибраної країни користувачем
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterError {
  email: string[],
  firstName: string[],
  secondName: string[],
  photo: string[],
  phone: string[],
  password: string[],
  confirmPassword: string[],
}

export interface ISelectItem {
  id: number;
  name: string;
}
