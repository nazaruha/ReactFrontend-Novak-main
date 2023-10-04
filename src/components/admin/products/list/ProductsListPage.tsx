import { FC, useEffect, useState } from 'react'
import classNames from 'classnames';
import defaultImage from '../../../../assets/selectImage.png';
import { Link, useSearchParams } from 'react-router-dom';
import { IProductItem, IProductSearchResult, IProductSearch, ICategorySelect } from '../types';
import http from '../../../../http_common';
import { APP_ENV } from '../../../../env';
import Carousel from './carousel';
import * as Scroll from 'react-scroll';
import ModalDelete from '../../../common/ModalDeleteTeacher';
import { updateSourceFile } from 'typescript';
import parse from 'html-react-parser'; // for parsing html code from string into your page
import { useFormik } from 'formik';
import InputGroup from '../../../common/inputGroup';

const ProductsListPage = () => {

    const Element = Scroll.Element;
    const scroller = Scroll.scroller;

    const [searchParams, setSearchParams] = useSearchParams(); // хук, для того, щоб отримувати данні з url сторінки

    // Список категорій у селекті
    const [categories, setCategories] = useState<ICategorySelect[]>([]);

    useEffect(() => {
        // Посилаємо запит на сервер по список категорій для тега select
        http.get<ICategorySelect[]>("api/categories/list").then((resp) => {
            setCategories(resp.data);
            console.log("categories", resp.data);
        });
    }, []);

    const [list, setList] = useState<IProductItem[]>([]);
    const [search, setSearch] = useState<IProductSearch>({
        name: searchParams.get("name") || "",
        categorySlug: searchParams.get("categorySlug") || "",
        page: searchParams.get("page") || 1
    });

    //Проводимо пошук товарів
    const onSubmitSearch = (values: IProductSearch) => {
        console.log("Проводимо пошук", values);
        setSearch(values);
    }

    const formik = useFormik({
        initialValues: search,
        onSubmit: onSubmitSearch,
    })

    const { values, touched, errors, handleSubmit, handleChange } = formik;

    const [searchResut, setSearchResult] = useState<IProductSearchResult>({
        products: [],
        pages: 0,
        currentPage: 0,
        total: 0,
        categoryName: ""
    });

    const viewList = list.map((item) => (
        <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
            <div className="card w-75" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <Carousel obj={item} />
                <div className="card-body">
                    <h5 className="card-title">{item.name} | {item.categoryName}</h5>
                    <p className="card-text">{item.description}</p>
                </div>
            </div>
        </div>
    ))

    useEffect(() => {
        // http.get<IProductItem[]>("api/products/list")
        //     .then(resp => {
        //         console.log("Products", resp.data);
        //         setList(resp.data)
        //     })
        //     .catch(err => {
        //         console.log("error", err);
        //     })
        http.get<IProductSearchResult>("api/products/search", {
            params: search
        })
            .then(resp => {
                const { data } = resp;
                console.log("Server response", data);
                setSearchResult(data);
                scroller.scrollTo("myScrollToElement", {
                    duration: 0,
                    delay: 0,
                    smooth: true,
                    offset: 0, // Scrolls to element + 50 pixels down the page
                })
            })
            .catch(error => {
                console.log("err", error);
            })
    }, [search]);

    const { products, pages, currentPage } = searchResut;

    const buttons = [];
    for (let i = 1; i <= pages; i++) {
        buttons.push(i);
    }

    const pagination = buttons.map(x => {
        return (
            <li className={classNames(
                "page-item",
                { "active": x === currentPage }
            )} key={x}>
                <Link className="page-link" to={`?page=${x}`} onClick={() => setSearch({ ...search, page: x })}>
                    {x}
                </Link>
            </li>
        );
    })

    const onDeleteProduct = async (id: number) => {
        try {
            await http.delete(`api/products/delete/${id}`);
            setSearch({ ...search, page: 1 });
        } catch (error) {
            console.log("Error Delete", error);
        }
    }

    const tableViewList = products.map((item) => {
        return (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>
                    {item.images.map(img => {
                        return (
                            <span key={img}>
                                <img src={`${APP_ENV.BASE_URL}images/150_${img}`} alt="Якась фотка" width="75" />
                            </span>
                        );
                    })}
                </td>
                <td>{item.categoryName}</td>
                <td>{parse(item.description)}</td>
                <td style={{ display: 'flex' }}>
                    <ModalDelete
                        id={item.id}
                        text={`Ви дійсно бажаєте видалити певний продукт '${item.name}'?`}
                        deleteFunc={onDeleteProduct} />
                    &nbsp; {/* Це пробєл тіпа */}
                    <Link to={`edit/${item.id}`} className='btn btn-warning'>Змінити</Link>
                </td>
            </tr>
        )
    })



    return (
        <>
            <Element name="myScrollToElement"></Element>
            <h1 className='text-center mt-3'>Продукти</h1>

            {/* Формочка пошуку продуктів */}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-3'>
                        <InputGroup
                            label="Пошук продуктів"
                            type="text"
                            field="name"
                            value={values.name}
                            placeholder="Введіть Назву"
                            onChange={handleChange} // onChangeHandler
                            errorFormik={errors.name}
                            touched={touched.name}
                        />
                    </div>
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label htmlFor="categorySlug" className='form-label'>Оберіть Категорію</label>
                            {/* Select - містить у собі значення категорій, по дефолту - 0 */}
                            <select
                                className={classNames(
                                    "form-select",
                                    { "is-invalid": errors.categorySlug && touched.categorySlug }
                                )}
                                aria-label="Category select"
                                defaultValue={values.categorySlug} // Значення, яке міститься в select
                                onChange={handleChange} // Якщо значення міняється, воно записується у формік
                                name="categorySlug" // Значення поля у форміку = categoryId - якщо його не буде - formik - не буде нічого добавлять
                                id='categorySlug' // Це використовується для label
                            >
                                {/* Значення, яке завжди буде не обране, для того, щоб нагадать, що треба вказувать категорію */}
                                <option value="" disabled>---</option> {/* disabled - щоб при виборі категорії ти не міг обрати цей варік */}
                                {/* Перебираємо список категорій і виводимо їх у вигляді options */}
                                {categories.map(item => (
                                    <option key={item.id} value={item.urlSlug}>{item.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-md-1' style={{ display: 'flex', alignItems: 'center', paddingTop: 16 }}>
                        <button type='submit' className='btn btn-primary'>
                            Пошук
                        </button>
                    </div>
                </div>
            </form>

            <Link to="/admin/products/create" className="btn btn-success">Додати</Link>
            {/* <div className="row g-4 mt-3">
                {viewList}
            </div> */}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Фото</th>
                        <th scope="col">Категорія</th>
                        <th scope="col">Опис</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {tableViewList}
                </tbody>
            </table>

            <nav aria-label="..." style={{ display: 'flex', justifyContent: 'end' }}>
                <ul className="pagination">
                    <li className="page-item disabled">
                        <span className="page-link">
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </span>
                    </li>
                    {pagination}
                    <li className="page-item">
                        <a className="page-link" href="#">
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default ProductsListPage;