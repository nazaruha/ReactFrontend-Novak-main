import React, { useState } from "react";
import { ICarousel } from "./types";
import car1 from '../../assets/1.jpg';
import car2 from '../../assets/2.jpg';
import car3 from '../../assets/3.jpg';
import classNames from "classnames";

const Carousel: React.FC = () => {
  const [items, setItems] = useState<ICarousel[]>([
    { img: car1 },
    { img: car2 },
    { img: car3 },
  ]);
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {items.map((item, index) => (
            <div key={index}
              className={classNames("carousel-item", { "active": index === 1 })}
            >
              <img src={item.img} className="d-block w-100" alt="..." />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <h1 className="text-center">Головна сторінка</h1>
    </>
  );
};

export default Carousel;