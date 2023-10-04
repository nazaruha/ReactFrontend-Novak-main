import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import defaultImage from "../../assets/selectImage.png";
import classNames from "classnames";

interface InputFileGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string, // назва інпута
    type?: "file",
    field: string, // ідентифікатор поля
    onSelectFile: (file: string) => void // File був. Повертаємо id - фото, яке збережено на сервері для товару
    errors?: string[] // список помилок від сервера
    errorFormik?: string | undefined // Помилкаа для самого інпута із Formik
    touched?: boolean | undefined // із Formik
}

const InputFileGroup: FC<InputFileGroupProps> = ({
    label = "Оберіть файл", // Якщо не вказали значення, то буде "Оберіть фото" текст
    type = "file",
    field,
    onSelectFile,
    errors,
    errorFormik,
    touched
}) => {
    const [selectImage, setSelectImage] = useState<File | null>(null); // Файл, який було обрано для даного інпута

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("ініціалузуємо значення для нашої фоточки в регістрі");
        // console.log(e.target.name, e.target.value); // nane - type of chosen element, value - the value of our chosen element
        const files = e.target.files; // Отримуємо файли, які були обрані
        if (files) {
            const file = files[0]; // беремо 1 файл із списку
            // Перевірка фотографії на вірний тип(jpeg, png, gif)
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
            if (!allowedTypes.includes(file.type)) {
                alert("Недопустимий тип файлу")
                return;
            }
            // console.log("ви обрали файл ", file);
            setSelectImage(file); // Зберігаємо в selectImage - сайт файл, який ми обрали на ПК
            const reader = new FileReader();
            reader.readAsDataURL(file); // читає файл. Проводимо читання даного в файлу, для отримання base64
            reader.onload = function () { // виконується коли, прочитається файл до кінця (верхній рядок) (КОЛИ ЧИТАННЯ УСПІШНЕ)
                onSelectFile(reader.result as string); // повертає base64 фотки (результат наш) у callback - метод у батьківському компоненті
            }
            // onSelectFile(file); // видаю батьківському компоненту через callback
        }
        e.target.value = ""; // анулюємо наше значення в таргеті, бо можна два раза подряд вибрати файл з однаковим іменем, і на другий раз воно не спрацює, а фотка може бути інша. Тому анулюємо
    };

    return (
        <div className="mb-3">
            <label htmlFor={field} className="form-label" style={{ cursor: 'pointer' }}>
                {label}
                {selectImage == null ? ( // Якщо фото відсутнє, тоді відображається фото, по якому можна натиснути і обрати файл на  в
                    <img
                        src={defaultImage}
                        width="200"
                        style={{ objectFit: "contain", display: 'block' }}
                        className={classNames(
                            { "border border-danger": errors || (errorFormik && touched) }
                        )}
                    />
                ) : ( // Якщо фото обране, тоді відображаємо дане фото
                    <img
                        src={URL.createObjectURL(selectImage)}
                        width="200"
                        style={{ objectFit: "contain", display: 'block' }}
                    />
                )}
            </label>

            <input
                type={type}
                className="d-none" // display:none MAKES ELEMENT TRANSPARENT(invisible). Використовуємо label, щоб по ньому натиснути
                accept="image/jpeg, image/png, image/gif" // обмеження для файлу
                id={field}
                name={field}
                onChange={onChangeFileHandler} // Подія, яка спрацьовує коли ми обрали файли
            />
            {errors && ( // якщо errors не пустий!!!
                <div className="alert alert-danger"> {/* не юзаєм invalid-feedback бо не прив'язуєм до нашого input'a бо він невидимий */}
                    {errors.map((err, index) => (
                        <span key={index}>{err}</span>
                    ))}
                </div>
            )}
            {(errorFormik && touched) && (
                <div className="alert alert-danger">
                    <span>{errorFormik}</span>
                </div>
            )}
        </div>
    )
}

export default InputFileGroup;