import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

type Props = {
    children: ReactElement;
};

export function PrivateRoute({ children }: Props) {
    const [cookies] = useCookies(['user']);

    if (!cookies.user) return <Navigate to="/" />;

    const user = cookies.user as UserProps;

    if (user.status === 'OFFLINE') return <Navigate to="/" />;

    return children;
}
