import { useEffect, useState } from "react";
import Carousel from "./carousel";
import { ICategoryItem, IProductHomePage } from "./types";
import { useDispatch } from "react-redux";
import { AuthUserActionType } from "../auth/types";
import EclipseWidget from "../common/eclipse";
import http from "../../http_common";
import { APP_ENV } from "../../env";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false); // for loader aclipse
  const [home, setHome] = useState<IProductHomePage>();
  const [list, setList] = useState<ICategoryItem[]>([ // в <> вписуємо початковий стан нашого об'єкта. Якщо б це був не TS то не було б взагалі ніяких <>
    {
      id: 1,
      name: "Ноутбук",
      image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07966250.png"
    },
    {
      id: 2,
      name: "Телефон",
      image: "data:image/jpeg;base64,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"
    },
  ]);

  //перебрали наші елементи з list за допомогою map (як forEach), але при цьому він повертає розмітку (можна використовувати return)
  const viewList = list.map((item) => ( // кругла дужка, значить шо буде returnить наш код, якщо б фігурна була то нічого не повертало б
    //ключ має бути, щоб веб-браузер не ругався. Він мусить мати ключи, щоб спокійно апдейтить(удаляти, добавляти) елементи в\з таблицю\і
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>
        <img src={item.image} style={{ objectFit: "contain" }} alt="Якась фотка" width="75" height="75" />
      </td>
      <td>{item.name}</td>
    </tr>
  ));
  // такий же як і viewList, але тут ми юзанули return() щоб повернути розмітку
  // const viewList1 = list.map((item) => {
  //   return (
  //     <tr key={item.id}>
  //       <th scope="row">{item.id}</th>
  //       <td>
  //         <img src={item.image} style={{ objectFit: "contain" }} alt="Якась фотка" width="75" height="75" />
  //       </td>
  //       <td>{item.name}</td>
  //     </tr>
  //   )
  // })

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    http.get<IProductHomePage>("api/products/search")
      .then(resp => {
        const { data } = resp;
        // console.log("ТОВАРИ", data);
        setHome(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <EclipseWidget />}
      <Carousel />
      <button className="btn btn-primary" onClick={() => {
        dispatch({ type: AuthUserActionType.LOGIN_USER }) // міняєм данні в редюсері
      }}>
        ВХІД
      </button>
      <button className="btn btn-danger" onClick={() => {
        dispatch({ type: AuthUserActionType.LOGOUT_USER })
      }}>
        ВИХІД
      </button>
      <h1 className="text-center">Список товарів</h1>
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Фото</th>
            <th scope="col">Назва</th>
          </tr>
        </thead>
        <tbody>
          {viewList}
        </tbody>
      </table> */}
      <div className="row">
        {home?.products.map(product => (
          <div className="card col-md-3 h-100 m-1" style={{ width: "18rem" }}>
            <img
              style={{ height: "250px", width: "100%", objectFit: 'contain' }}
              src={`${APP_ENV.BASE_URL}images/300_${product.images[0]}`}
              className="card-img-top p-2" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.categoryName}</p>
              <a href="#" className="btn btn-success">Додати в кошик <i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
