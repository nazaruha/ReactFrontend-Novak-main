import React, { useEffect, useState } from 'react';
import { ICategory } from './types';
import axios from 'axios';
import { APP_ENV } from '../../../env';
import http from '../../../http_common';
import getUserRole from '../../../helpers/getUserRole';
import { Link } from 'react-router-dom';
import DefaultModal from '../../common/Modal/indext';
import EclipseWidget from '../../common/eclipse';

const ApiProducts: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false); // for loader aclipse

    const [userRole, setUserRole] = useState<string>("");
    const [list, setList] = useState<ICategory[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [deleteId, setDeleteId] = useState<number>(-1);
    const [show, setShow] = useState<boolean>(false);

    const handleCloseModal = () => {
        setShow(false);
        console.log("Close modal")
    }

    const handleClickDelete = (id: number) => {
        setDeleteId(id);
        setShow(true);
        console.log("Retreive id", id);
    }

    const handleDeleteCategory = async (e: any) => {
        e.preventDefault();
        http.delete(`api/categories/delete/${deleteId}`)
            .then(resp => {
                console.log("Category is deleted!", resp)
                setShow(false);
                // window.location.reload(); // refresh window
                setRefresh(refresh + 1); // refresh state only and useEffect
            })
            .catch(err => {
                console.log("ERR delete category =>", err)
            })
    }

    //перебрали наші елементи з list за допомогою map (як forEach), але при цьому він повертає розмітку (можна використовувати return)
    const viewList = list.map((item) => (
        <div key={item.id} className="col-lg-4 col-md-6 mb-3">
            <div className="card" style={{ width: '18rem' }}>
                <img src={`${APP_ENV.BASE_URL}images/150_${item.image}`} className="card-img-top" alt={`${item.image}#${item.id} image`} /> {/*d-block w-100 card-img-top */}
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.urlSlug}</p>
                    {userRole === "admin" && (
                        <div className="d-flex justify-content-center">
                            <a href="#" className="btn btn-primary w-50">Edit</a>
                            <a href="#" className="btn btn-warning w-50 ms-1">Update</a>
                            <button className="btn btn-danger w-50 ms-1" onClick={() => handleClickDelete(item.id)}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ))

    useEffect(() => {
        console.log("useEffect rendered.")
        setLoading(true);
        // axios.get("https://f21.allin.ml/api/categories/list")
        // axios.get<ICategory[]>(`${APP_ENV.BASE_URL}api/categories/list`) // get() - не регістро залежна url частина. Асинхронний запит
        http.get<ICategory[]>(`api/categories/list`) //юзаєм http. Це ми там наш axios створили. Убираєм шлях сервера, бо він в http дефолтно записани
            .then(resp => {
                console.log("Server response: ", resp); // поверне об'єкт з данними
                const { data } = resp; // data буде мати тип 'any' якщо не вказати повертаючий тип в <> у методі get() коли фетчиш дану
                console.log(data);
                setList(data); // initialize our list from useState. This means that our web will render
            })
        setUserRole(getUserRole());
        setLoading(false);
    }, [refresh]); // [] - не очікує ніяких змін. Але якщо убрать її, то буде цикліруваться, якщо будем юзати там  useState

    console.log("component rendered", APP_ENV);

    return (
        <>
            {loading && <EclipseWidget />} {/** our loader */}
            <DefaultModal
                show={show}
                title='Delete Category'
                body='Are you sure you want to delete this Category?'
                closeButtonText='Close'
                closeButtonColor='secondary'
                applyButtonText='Delete'
                applyButtonColor='danger'
                handleClose={handleCloseModal}
                handleApplyEvent={handleDeleteCategory}
            />
            <h1 className="text-center mt-3">API Товари</h1>
            <div className="row">
                {userRole === "admin" && (
                    <div className='col-12 mb-3'>
                        <Link className="btn btn-success w-15" to={'/admin/categories/create'}>Create Category</Link>
                        {/* <button className='btn btn-success w-15'>Create Category</button> */}
                    </div>
                )}
                {viewList}
            </div>
        </>
    )
}

export default ApiProducts;