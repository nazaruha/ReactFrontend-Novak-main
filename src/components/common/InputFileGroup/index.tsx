import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import defaultImage from "../../../assets/selectImage.png";
import "./style.css";

interface InputFileGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    type?: "file",
    field: string,
    onSelectFile: (file: File) => void
}

const InputFileGroup: FC<InputFileGroupProps> = ({
    label = "Оберіть файл",
    type = "file",
    field,
    onSelectFile
}) => {
    const [selectImage, setSelectImage] = useState<File | null>(null);

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("ініціалузуємо значення для нашої фоточки в регістрі");
        // console.log(e.target.name, e.target.value); // nane - type of chosen element, value - the value of our chosen element
        const files = e.target.files;
        if (files) // якщо людина обрала файла (files !== null)
        {
            const file = files[0];
            console.log("ви обрали файл ", file);
            setSelectImage(file);
            onSelectFile(file); // видаю батьківському компоненту через callback (RegistterPage.tsx параметри тега InputGroup)
        }
        e.target.value = ""; // анулюємо наше значення в таргеті, бо можна два раза подряд вибрати файл з однаковим іменем, і на другий раз воно не спрацює, а фотка може бути інша. Тому анулюємо
    };

    return (
        <div className="mb-3">
            <label htmlFor={field} className="form-label" style={{ cursor: 'pointer' }}>
                {label}
                {selectImage == null ? (
                    <img
                        // src="https://i.natgeofe.com/k/3892766d-ad0e-4027-9cca-a03708fcd1e6/beaver-closeup_4x3.jpg"
                        src={defaultImage}
                        width="200"
                        style={{ objectFit: "contain", display: 'block' }}
                    />
                ) : (
                    <img
                        src={URL.createObjectURL(selectImage)}
                        width="200"
                        style={{ objectFit: "contain", display: 'block' }}
                    />
                )}
            </label>

            <input
                type={type}
                className="d-none" // display:none MAKES ELEMENT TRANSPARENT(invisible)
                id={field}
                name={field}
                onChange={onChangeFileHandler}
            />
        </div>
    )
}

export default InputFileGroup;