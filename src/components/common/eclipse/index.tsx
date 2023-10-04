import './index.css';
import { FaSpinner } from 'react-icons/fa';

const EclipseWidgetContainer = () => {
    return (
        <div className="my_eclipse">
            <div className="progress">
                <div>

                    {/* <FaSpinner size="3x" className="icon-spin" /> */}
                    <i className='fa fa-spinner fa-pulse fa-3x fa-fw'></i>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
        </div>
    )
}
const EclipseWidget = (EclipseWidgetContainer);
export default EclipseWidget;