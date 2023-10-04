import { ChangeEvent, useState } from "react";
import { IRegisterPage, ISelectItem, IRegisterError } from "./types";
import InputGroup from "../../common/inputGroup";
import InputFileGroup from "../../common/inputFileGroup";

import http from "../../../http_common";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthUserActionType } from "../types";

const RegisterPage = () => {
  //створили конкретний екземлеяр на основі нашого інтерфейсу
  const init: IRegisterPage = {
    email: "",
    firstName: "",
    secondName: "",
    photo: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // image: null
  };

  //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
  const [data, setData] = useState<IRegisterPage>(init); // useState - хук, паралельний компонент
  const [_errors, setErros] = useState<IRegisterError>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [countries, setCountries] = useState<ISelectItem[]>([
  //   {
  //     id: 1,
  //     name: "Україна"
  //   },
  //   {
  //     id: 2,
  //     name: "Польща"
  //   },
  //   {
  //     id: 3,
  //     name: "Америка USA"
  //   }
  // ]);

  // const viewCountriesOption = countries.map((item, index) => ( // index - буде починатись з 0, реактовська класна штука. Для ключів круто юзать
  //   <option key={index} value={item.id}>
  //     {item.name}
  //   </option>
  // ));

  console.log("Render Register component", "------SALO----");

  //console.log("Деструктуризація", {...data, password: "123456"});

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    // console.log("Ми відправляємо на сервер", data);
    //setData({email: "pylyp", password: "123456"});
    try {
      const result = await http.post("api/Account/register", data)
      console.log("Result server good", result);
    } catch (err: any) {
      const errs = err.response.data.errors as IRegisterError;
      console.log(errs);
      setErros(errs);
      console.log("Bad request", err.response.data.errors);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    // console.log("Щось вводити в інтпут");
    // console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onFormikSubmit = async (values: IRegisterPage) => {
    console.log("Formik Submit Form to Server", values);
    try {
      const result = await http.post("api/Account/register", values)
      console.log("Result server good", result);

      navigate("/login");
    } catch (err: any) {
      const errs = err.response.data.errors as IRegisterError;
      if (errs.email) {
        setFieldError("email", errs.email[0])
      }
      console.log(errs);
      setErros(errs);
      console.log("Bad request", err.response.data.errors);
    }
  }

  const registerSchema = yup.object({
    email: yup.string().required("Вкажіть пошту").email("Введіть коректно пошту"),
    firstName: yup.string().required("Вкажіть Ім'я"),
    secondName: yup.string().required("Вкажіть Фамілію"),
    photo: yup.string().required("Оберіть Фото"),
    phone: yup.string().required("Вкажіть телефон"),
    password: yup.string()
      .min(5, "Пароль повинен містити мінімум 5 символів")
      .matches(/[0-9a-zA-Z]/, "Пароль може містить латинські символи і цифри")
      .required("Поле не повинне бути пустим"),
    confirmPassword: yup.string()
      .min(5, "Пароль повинен містити мінімум 5 символів")
      .oneOf([yup.ref("password")], () => "Паролі повинні співпадати")
      .required("Поле не повинне бути пустим")
    // confirmPassword: yup.string()
  })

  const formik = useFormik({
    initialValues: init, // данні які передаєм
    onSubmit: onFormikSubmit, // метод, який спрацює при submit форми
    validationSchema: registerSchema
  });

  // values - данні, які будуть зберігатись у формі
  // touched - буде викидувать помилки на поля, коли ти натиснув кнопку Submit (щоб не появлялись помилки сразу, при початку веденні даних)
  // errors - приймає наші помилки
  // handleSubmit - буде наш submit метод юзатись, який ми ввели в нашому форміку вище
  // handleChange - автоматично юзається свій handleChange для форми
  // setFieldValue(field_name, value_for_field) - щоб записати значення у formik
  // setFieldErorr(field_name, value_for_field) - заповнювати поле помилки іншим текстом
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue, setFieldError } = formik;

  return (
    <>
      <h1 className="text-center mt-3">Реєстрація на сайті</h1>
      {/* handleSubmit - буде юзатись formik (onFormikSubmit) */}
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">

        <InputGroup
          label="Електрона адреса"
          type="email"
          field="email"
          value={values.email}
          placeholder="Введіть пошту"
          onChange={handleChange} // onChangeHandler
          errors={_errors?.email}
          errorFormik={errors.email}
          touched={touched.email}
        />

        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Ім'я"
              type="text"
              field="firstName"
              value={values.firstName}
              placeholder="Введіть ім'я"
              onChange={handleChange}
              errors={_errors?.firstName}
              errorFormik={errors.firstName}
              touched={touched.firstName}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Фамілія"
              type="text"
              field="secondName"
              value={values.secondName}
              placeholder="Введіть фамілію"
              onChange={handleChange}
              errors={_errors?.secondName}
              errorFormik={errors.secondName}
              touched={touched.secondName}
            />
          </div>
        </div>

        {/* <div className="mb-3">
          <label className="form-label">
            Країна
          </label>
          <select className="form-select" aria-label="Default select example" name="countryId" id="countryId" onChange={onChangeHandler}>
            <option defaultValue="0">Оберіть країну</option>
            {viewCountriesOption}
          </select>
        </div> */}

        {/* <div className="mb-3">
          <label htmlFor="image" className="form-label">
            {data.image == null ? (
              <img
                src="https://i.natgeofe.com/k/3892766d-ad0e-4027-9cca-a03708fcd1e6/beaver-closeup_4x3.jpg"
                width="200"
                style={{ cursor: "pointer", objectFit: "contain" }}
              />
            ) : (
              <img
                src={URL.createObjectURL(data.image)}
                width="200"
                style={{ borderRadius: "40%", cursor: "pointer" }}
              />
            )}
          </label>

          <input
            type="file"
            className="d-none" // display:none MAKES ELEMENT TRANSPARENT(invisible)
            id="image"
            name="image"
            onChange={onChangeFileHandler}
          />
        </div> */}

        <InputFileGroup
          label="Оберіть фото для аватара"
          field="image"
          onSelectFile={(file) => {
            setFieldValue("photo", file)
            // Для особистой валідації
            // setData({ ...data, photo: file });
            // console.log(file);
          }}
          errors={_errors?.photo}
          errorFormik={errors.photo}
          touched={touched.photo}
        />

        {/* <InputFileGroup
          label="Оберіть фото для вашої подруги"
          field="image"
          onSelectFile={(file) => {
            setData({ ...data, "image": file });
          }}
        /> */}

        <InputGroup
          label="Телефон"
          type="text"
          field="phone"
          value={values.phone}
          placeholder="Введіть номер телефону"
          onChange={handleChange}
          errors={_errors?.phone}
          errorFormik={errors.phone}
          touched={touched.phone}
        />


        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Пароль"
              type="password"
              field="password"
              value={values.password}
              placeholder="Введіть пароль"
              onChange={handleChange}
              errors={_errors?.password}
              errorFormik={errors.password}
              touched={touched.password}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Підтвердження пароля"
              type="password"
              field="confirmPassword"
              value={values.confirmPassword}
              placeholder="Введіть підтведження пароль"
              onChange={handleChange}
              errors={_errors?.confirmPassword}
              errorFormik={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Реєстрація
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
