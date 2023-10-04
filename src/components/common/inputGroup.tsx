import classNames from "classnames";
import React, { ChangeEvent, InputHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> { // interface який вказує що буде передаватись в наш компонент InputGroup
    label: string;
    type?: "text" | "password" | "email" | "number"; // вот такі стрінгі можна буде вписати лише в тип, на інші буде тобі помилку вибивать і казать шо не можна такі
    field: string; // 'name' and 'id' attributes' values of html input element
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string[],
    errorFormik?: string | undefined,
    touched?: boolean | undefined
}

const InputGroup: React.FC<InputGroupProps> = ({
    label,
    type = "text",
    field,
    placeholder = "",
    value, // ми його не добавляли в інтерфейс наш, бо він вже автоматично встроєний в атрибут input елементів
    onChange,
    errors,
    errorFormik,
    touched
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={field} className="form-label">
                {label}
            </label>
            <input
                type={type}
                // className="form-control is-invalid"
                className={classNames(
                    "form-control",
                    { "is-invalid": errors || (errorFormik && touched) } // буде добавляться цей клас, якщо клас errors не пустий або errorFormik
                )}
                id={field}
                name={field}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                aria-describedby="emailHelp"
            />
            {errors && ( // якщо errors не пустий!!!
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                    {errors.map((err, index) => (
                        <span key={index}>{err}</span>
                    ))}
                </div>
            )}
            {(errorFormik && touched) && (
                <div id="FormikUserValidationFeedback" className="invalid-feedback">
                    <span>{errorFormik}</span>
                </div>
            )}
        </div>
    );
}

export default InputGroup;