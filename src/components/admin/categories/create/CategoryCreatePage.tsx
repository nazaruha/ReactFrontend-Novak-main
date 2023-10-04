import { ChangeEvent, FC, useState } from "react";
import { ICategoryCreate } from "./types";
import InputGroup from "../../../common/inputGroup";
import InputFileGroup from "../../../common/inputFileGroup";
import http from "../../../../http_common";
import { useNavigate } from "react-router-dom";
import getUserRole from "../../../../helpers/getUserRole";
import NotFoundPage from "../../../pages/NotFound";

const CategoryCreatePage: FC = () => {
    const init: ICategoryCreate = {
        title: "",
        priority: 0,
        urlSlug: "",
        image: "",
    }

    const [categoryData, setCategoryData] = useState<ICategoryCreate>(init)
    const navigate = useNavigate();

    const ChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        http.post("api/Categories/add", categoryData)
            .then(resp => {
                console.log("Категорія добавлена!", resp)
                navigate("/admin/categories/list");
            })
            .catch(err => {
                console.log("Помилка відправки категорії", err); // 401 - не авторизований
            })
    }

    if (getUserRole() !== "admin") {
        return (
            <NotFoundPage />
        )
    }

    return (

        <>
            <h1 className="text-center mt-3">Додати категорію</h1>

            <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
                <InputGroup
                    label="Введіть назву"
                    field="title"
                    placeholder="Назва"
                    value={categoryData.title}
                    onChange={ChangeInputHandler}
                />
                <InputGroup
                    label="Введіть urlSlug"
                    field="urlSlug"
                    placeholder="urlSlug"
                    value={categoryData.urlSlug}
                    onChange={ChangeInputHandler}
                />
                <InputGroup
                    label="Виберіть пріорітетність"
                    type="number"
                    field="priority"
                    placeholder="пріорітетність"
                    value={categoryData.priority}
                    onChange={ChangeInputHandler}
                />
                <InputFileGroup
                    label="Оберіть фотографію"
                    field="image"
                    onSelectFile={(file) => {
                        setCategoryData({ ...categoryData, image: file });
                        console.log(file);
                    }}
                />
                <button type="submit" className="btn btn-primary">
                    Добавити категорію
                </button>
            </form>
        </>
    )
}

export default CategoryCreatePage;