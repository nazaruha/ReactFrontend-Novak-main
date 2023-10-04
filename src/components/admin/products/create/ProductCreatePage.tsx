import { FC, useEffect, useState } from 'react';
import { ICategorySelect, IProductCreate } from '../types';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputGroup from '../../../common/inputGroup';
import http from '../../../../http_common';
import InputFileGroup from '../../../common/inputFileGroup';
import InputFileProductGroup from '../../../common/InputFileProductGroup';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Editor } from '@tinymce/tinymce-react';
import EditorTiny from '../../../common/EditorTiny';

const ProductCreatePage: FC = () => {
    // Навігація
    const navigate = useNavigate();
    // Зберігаємо список категорій для select options
    const [categories, setCategories] = useState<ICategorySelect[]>([])
    //створили конкретни екземлеяр на основі нашого інтерфейсу
    const init: IProductCreate = {
        name: "",
        priority: 0,
        categoryId: 0,
        price: 0,
        description: "",
        ids: [],
    }

    useEffect(() => {
        //Посилаємо запит на сервер по список категорій для тега select
        http.get<ICategorySelect[]>("api/categories/list")
            .then(resp => {
                setCategories(resp.data)
                console.log("categories", resp.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    // схема валідації даних
    const validSchema = yup.object({
        name: yup.string() // валідуємо назву товару
            .required("Вкажіть назву"),
        priority: yup.number()
            .min(1, "Пріорітет мусить бути не менше 1")
            .required("Вкажіть пріорітет"),  //перевіряємо пріорітет
        categoryId: yup.number()
            .min(1, "Оберіть категорію"), //Має бути обрана категорія
        price: yup.number()
            .min(1, "Ціна мусить бути не менше 1")
            .required("Вкажіть ціну"), //має бути ціна товару
        description: yup.string()
            .required("Вкажіть опис"), //Має бути опис у товару
        ids: yup.array()
            .of(yup.number())
            .min(1, "Мінімум одна фотка для для товару")
            .required("Оберіть хоча б одне фото") //перевіряємо чи масив має елементи
    });

    //Дані, які приходять після валіації із форміка
    const onFormikSubmit = async (values: IProductCreate) => {
        //Вивовдимо дані на консоль, щоб їх побачить
        console.log("Formik submit data", values);
        try {
            //запит на створення продукта
            const result = await http.post("/api/products/add", values)
            console.log('Product create', result);
            navigate(".."); // повертаємось на один рівень вище
        } catch (error) {
            // якщо запит на сервер буде неуспішни
            console.log("error", error)
        }
    }

    // створюємо useFormik
    const formik = useFormik({
        initialValues: init, // данні які передаєм (початкові налаштування для полів)
        onSubmit: onFormikSubmit, // метод, який спрацює при submit форми і коли усі дані у форміку валідні
        validationSchema: validSchema // схема валідації даних
    });

    const {
        values, // отримуємо доступ до полів у форміку
        touched, // Відслідковує подію виклику методу handleSubmit
        errors, // Містить набір помилок для сервака
        handleSubmit, // Метод, який спрацьовує на форміку для валідації даних і якщо вони валідні то буде спрацьовувати onFormikSubmit
        handleChange, // Метод, який відслідковує зміни значення полів у формі
        setFieldValue, // Можна задавати значення полів через іменовані параметри (імя поля, значення)
    } = formik; // усі значення 

    return (
        <>
            <h1 className='text-center'>Додати Продукт</h1>

            {/* Форма яка зберігає значення усіх полів */}
            <form onSubmit={handleSubmit} className='col-md-10 offset-md-1'>
                {/* Значення - назва товару */}
                <InputGroup
                    label="Назва"
                    type="text"
                    field="name"
                    value={values.name}
                    placeholder="Введіть Назву"
                    onChange={handleChange} // onChangeHandler
                    errorFormik={errors.name}
                    touched={touched.name}
                />

                {/* Пріорітет - отримує від користувача пріорітет */}
                <InputGroup
                    label="Пріорітет"
                    type="number"
                    field="priority"
                    value={values.priority}
                    placeholder="Введіть Пріорітет"
                    onChange={handleChange} // onChangeHandler
                    errorFormik={errors.priority}
                    touched={touched.priority}
                />

                <InputGroup
                    label="Ціна"
                    type="number"
                    field="price"
                    value={values.price}
                    placeholder="Введіть Ціну"
                    onChange={handleChange} // onChangeHandler
                    errorFormik={errors.price}
                    touched={touched.price}
                />

                {/* Використовуємо наш компонент для вводу опису, який формується за допомогою TinyMCE */}
                <EditorTiny
                    label='Опис' // Значення, яке ми вводимо в поле
                    field='description' // Підпис для даного інпуту
                    value={values.description} // Назва інпуту
                    error={errors.description} // Якщо є помилка, то вона буде передаватися
                    touched={touched.description} // Якщо натискалася кнопка Submit
                    // Метод, який викликає сам компонент, коли в інпуті змінюється значення
                    onEditorChange={(text: string) => { // Цей параметр взяли з IAllProps (tiny's interface)
                        setFieldValue("description", text); // Текст, який в середині інпуту, записуємо у формік в полу description
                    }}
                />

                {/* <InputGroup
                    label="Опис"
                    type="text"
                    field="description"
                    value={values.description}
                    placeholder="Введіть Опис"
                    onChange={handleChange} // onChangeHandler
                    errorFormik={errors.description}
                    touched={touched.description}
                /> */}

                <div className="mb-3">
                    <label htmlFor="categoryId" className='form-label'>Оберіть Категорію</label>
                    {/* Select - містить у собі значення категорій, по дефолту - 0 */}
                    <select
                        className={classNames(
                            "form-select",
                            { "is-invalid": errors.categoryId && touched.categoryId }
                        )}
                        aria-label="Category select"
                        defaultValue={values.categoryId} // Значення, яке міститься в select
                        onChange={handleChange} // Якщо значення міняється, воно записується у формік
                        name="categoryId" // Значення поля у форміку = categoryId - якщо його не буде - formik - не буде нічого добавлять
                        id='categoryId' // Це використовується для label
                    >
                        {/* Значення, яке завжди буде не обране, для того, щоб нагадать, що треба вказувать категорію */}
                        <option value="0" disabled>---</option> {/* disabled - щоб при виборі категорії ти не міг обрати цей варік */}
                        {/* Перебираємо список категорій і виводимо їх у вигляді options */}
                        {categories.map(item => (
                            <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {(errors.categoryId && touched.categoryId) && (
                        <span className='text-danger'>{errors.categoryId}</span>
                    )}
                </div>

                {/* Відповідає за вибір фото для товару, і вивід самих фото на екран. Дані фото передаються на сервер і id
                записуються у formik */}
                <InputFileProductGroup
                    label="Оберіть фото товару"
                    field="image2Select"
                    errorFormik={errors.ids}
                    touched={touched.ids}
                    onRemoveFile={(id) => {
                        setFieldValue("ids", values.ids.filter(x => x !== id));
                    }}
                    onSelectFile={(id) => { //callback метод, який вертає id - зображення товарів, який буде відправлено на серваку
                        // додаємо у колекції новий елемент id - фото товару
                        setFieldValue("ids", [...values.ids, id]); // записали id фотки в масив ids
                        console.log("Select image id", id);
                    }}
                // errors={errors?.photo}
                // touched={touched.photo}
                />

                <button type="submit" className="btn btn-primary">
                    Створити товар
                </button>
            </form >

        </>
    )
}

export default ProductCreatePage;