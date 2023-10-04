import jwtDecode from 'jwt-decode'
import { IUser } from '../components/auth/login/types';
const getUserRole = () => {
    const token = localStorage.token;
    if (token) {
        const userData = getUserData(token);
        return userData.roles;
    }
    return "";
}

const getUserData = (token: string) => {
    const userData = jwtDecode<IUser>(token);
    return userData;
}

export default getUserRole;