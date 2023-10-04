import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useState } from "react";
import defaultImage from "../../../assets/images-plus.png";
import "./style.css";
import { IUploadImage, IUploadImageResult } from "./types";
import http from "../../../http_common";
import { APP_ENV } from "../../../env";
import { IProductImageItem } from "../../admin/products/types";

// Властивості, які може мати інпут для вибору декількох файлів
interface InputFileProductGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string, // назва інпута
    type?: "file",
    field: string, // ідентифікатор поля
    onRemoveFile: (id: number) => void // обробник для видалення фото по id в батька
    onSelectFile: (id: number) => void // повертаємо id - фото, яке збережемо на сервері товару
    errors?: string[] // список помилок від сервера
    errorFormik?: string | string[] | undefined // Помилкаа для самого інпута із Formik
    touched?: boolean | undefined // із Formik
    imgView?: IProductImageItem[]; // Масив фото, який ми хочемо відобразить
}

const InputFileProductGroup: FC<InputFileProductGroupProps> = ({
    label = "Оберіть файл", // Якщо не вказали значення, то буде "Оберіть файл" текст
    type = "file",
    field,
    onRemoveFile,
    onSelectFile,
    errors,
    errorFormik,
    touched,
    imgView = []
}) => {
    // Набір фото, які обрав користувач
    const [images, setImages] = useState<IProductImageItem[]>([]); // Список імен файлів, які ми будемо відображати в даному компоненті

    useEffect(() => {
        setImages(imgView);
    }, [imgView])

    const onRemoveImage = (img: IProductImageItem) => {
        console.log("Remove image", img);
        setImages(images.filter(x => x.id !== img.id));
        onRemoveFile(Number(img.id));
    }

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("ініціалузуємо значення для нашої фоточки в регістрі");
        // console.log(e.target.name, e.target.value); // nane - type of chosen element, value - the value of our chosen element
        const files = e.target.files;
        if (files) // якщо людина обрала файла (files !== null)
        {
            const file = files[0];
            console.log("ви обрали файл ", file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const upload: IUploadImage = {
                    image: reader.result as string
                };
                try {
                    const dataServer = await http.post("api/products/upload", upload) // відправляємо base64 на сервер і очікуємо результат
                    const imageServer = dataServer.data; // якщо результат був успішний - ми отримуємо об'єкт, який включає назву файлу та id фото
                    setImages([...images, imageServer]) // Зберігаємо назву фото для відображення у списку
                    onSelectFile(imageServer.id); // Передажмо через callback - id фото для даного товару
                } catch (problem) { console.log("problem", problem) }
            }
            // onSelectFile(file); // видаю батьківському компоненту через callback (RegistterPage.tsx параметри тега InputGroup)
        }
        e.target.value = ""; // анулюємо наше значення в таргеті, бо можна два раза подряд вибрати файл з однаковим іменем, і на другий раз воно не спрацює, а фотка може бути інша. Тому анулюємо
    };

    return (
        <div className="mb-3">
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor={field} className="form-label" style={{ cursor: 'pointer' }}>
                        <h6>{label}</h6>

                        <img
                            width="80%"
                            className="img-fluid"
                            src={defaultImage} // фото, по якому натискаємо і можемо вибрати файл
                            style={{ cursor: "pointer" }}
                        />
                    </label>

                    <input
                        type={type}
                        className="d-none" // display:none MAKES ELEMENT TRANSPARENT(invisible)
                        accept="image/jpeg, image/png, image/gif" // обмеження для файлу по формату
                        id={field}
                        name={field}
                        onChange={onChangeFileHandler} // Обробник, який спрацьовує, коли ми обрали файл
                    />
                </div>
                {/* Фото, які є при зміні товару (ProdcutEditPage.tsx) */}
                {images.map((item) => (
                    <div key={item.id} className="col-md-4 mt-5">
                        <div>
                            <i
                                className="fa fa-times fs-2x fa-fw text-danger"
                                style={{ cursor: 'pointer' }}
                                aria-hidden="true"
                                onClick={() => {
                                    setImages(images.filter((x) => x.id !== item.id));
                                    onRemoveFile(Number(item.id));
                                }}
                            ></i>
                        </div>
                        <img
                            width="80%"
                            className="img-fluid"
                            src={`${APP_ENV.BASE_URL}images/300_${item.name}`}
                        />
                    </div>
                ))}
                {/* Відображаємо список файлів, які ми обрали */}
                {images.map((item) => (
                    <div key={item.id} className="col-md-4 mt-5">
                        <div>
                            <i
                                className="fa fa-times fs-2x fa-fw text-danger"
                                style={{ cursor: 'pointer' }}
                                aria-hidden="true"
                                onClick={() => onRemoveImage(item)}
                            ></i>
                        </div>
                        <img
                            width="80%"
                            className="img-fluid"
                            src={`${APP_ENV.BASE_URL}images/300_${item.name}`}
                        />
                    </div>
                ))}
            </div>


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

export default InputFileProductGroup;