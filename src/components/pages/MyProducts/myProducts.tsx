import React, { MouseEventHandler, useState } from "react";
import { IProduct } from "./types";
import laptopImage from "./assets/laptop.jpg";
import phoneImage from "./assets/phone.jpg";
import refrigiratorImage from "./assets/refrigirator.jpg";

const MyProducts = () => {
    const products: IProduct[] = [
        {
            id: 1,
            name: 'Ноутбук',
            description: "Класник ноутбук!!!",
            image: laptopImage
        },
        {
            id: 2,
            name: 'Телефон',
            description: "Класна мобіла, я фігею",
            image: phoneImage
        },
        {
            id: 3,
            name: 'холодильник',
            description: "Холодос то шо нада, остудить твій пил як треба",
            image: refrigiratorImage
        },
    ]

    const [productList, setProductList] = useState<IProduct[]>(products);

    //перебрали наші елементи з list за допомогою map (як forEach), але при цьому він повертає розмітку (можна використовувати return)
    const viewList = productList.map((item) => (
        // <div key={item.id} className="col-lg-4 col-md-6">
        //     <img src={item.image} className="card-img-top" alt={`${item.name}#${item.id} image`} /> {/*d-block w-100 card-img-top */}
        //     <div className="card-body">
        //         <h5 className="card-title">{item.name}</h5>
        //         <p className="card-text">{item.description}</p>
        //         <p className="card-text"><small className="text-body-secondary">Last updated {Math.floor(Math.random() * 10 + 1)} mins ago</small></p>
        //     </div>
        // </div>
        <div key={item.id} className="col-lg-4 col-md-6 mb-3">
            <div className="card" style={{ width: '18rem' }}>
                <img src={item.image} className="card-img-top" alt={`${item.name}#${item.id} image`} /> {/*d-block w-100 card-img-top */}
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <a href="#" className="btn btn-primary">Edit</a>
                </div>
            </div>
        </div>
    ))

    const GetRandomImage = (): any => {
        // debugger;
        const URL = "https://picsum.photos/200";
        fetch(URL).then(response => {
            return response;
        }).then(data => {
            console.log(data);
            return data;
        }).catch(error => console.log(error))
    }

    const AddProductOnClick = () => {
        // const url = GetRandomImage();
        const newId = productList.length + 1;
        const newProduct: IProduct = {
            id: newId,
            name: `НОВИЙ ТОВАР ${newId}`,
            description: `ОПИС НОВОГО ТОВАРУ ${newId}`,
            image: "https://picsum.photos/200"
        }

        setProductList([...productList, newProduct]);
    }

    return (
        <div className="container">
            <h1 className="text-center mt-3">Мої Товари</h1>
            <div className="container" id="my-products-table">
                <div className="mb-2" id="buttons">
                    <button
                        className="btn btn-success fs-3"
                        type="button"
                        onClick={AddProductOnClick}
                    >
                        Додати Товар
                    </button>
                </div>
                <div className="row"> {/* card-group */}
                    {viewList}
                </div>
            </div>
        </div>
    )
}

export default MyProducts;