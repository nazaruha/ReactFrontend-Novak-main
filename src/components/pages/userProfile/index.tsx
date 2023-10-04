import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../auth/types';
import NotFoundPage from '../NotFound';

const UserProfile: FC = () => {
    const { isAuth } = useSelector((store: any) => store.auth as IAuthUser)

    if (!isAuth) {
        return (
            <>
                <NotFoundPage />
            </>
        )
    }

    return (
        <>
            <h1 className='text-center mt-3'>User Profile</h1>

        </>
    )
}

export default UserProfile;