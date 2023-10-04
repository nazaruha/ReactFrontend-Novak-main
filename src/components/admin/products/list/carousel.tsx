import { FC } from 'react';
import { IProductItem } from '../types';
import classNames from 'classnames';
import defaultImage from '../../../../assets/selectImage.png';
import { APP_ENV } from '../../../../env';

const item: IProductItem = {
    id: 0,
    name: "",
    categoryName: "",
    priority: 0,
    description: "",
    images: [],
    price: 0
};

interface ICarouselProps {
    obj: IProductItem
}

const Carousel: FC<ICarouselProps> = ({
    obj = item
}) => {
    return (
        <>
            {obj.images.length === 0 ? (
                <img src={`${defaultImage}`} className='card-img-top' />
            ) : (
                <div id={`imageCarousel-${obj.id}`} className="carousel slide">
                    <div className="carousel-indicators">
                        {obj.images.map((_, index) => (
                            <>
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target={`#imageCarousel-${obj.id}`}
                                    data-bs-slide-to={`${index}`}
                                    className={classNames(
                                        { 'active': index === 0 }
                                    )}
                                    aria-label={`Slide ${index + 1}`}
                                >

                                </button>
                            </>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {obj.images.length === 0 && (
                            <div className='carousel-item active'>
                                <img src={`${defaultImage}`} className="d-block w-100" alt={`emptyImage-${obj.id}`} />
                            </div>
                        )}
                        {obj.images.map((image, index) => (
                            <div
                                key={index}
                                className={classNames(
                                    'carousel-item',
                                    { 'active': index === 0 }
                                )}
                            >
                                <img src={`${APP_ENV.BASE_URL}images/600_${image}`} className="d-block w-100" alt={`image-${obj.id}.${index}`} />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#imageCarousel-${obj.id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#imageCarousel-${obj.id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )}
        </>
    )
}

export default Carousel;