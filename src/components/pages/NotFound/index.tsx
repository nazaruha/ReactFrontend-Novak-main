import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
    return (
        // <div className="container-fluid">
        //     <h1 className="text-danger">Not Found page</h1>
        //     <Link to={"/"}>HomePage</Link>
        // </div>
        <div className="row mt-3">
            <div className="col-md-12">
                <div className="error-template d-flex aligns-items-center justify-content-center text-center">
                    <div>
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="error-actions mt-3">
                            <Link to="/" className="btn btn-primary btn-lg"><span>Take Me Home</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;