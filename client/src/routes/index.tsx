import { createBrowserRouter } from 'react-router-dom';
import Home from '@/routes/Home';
import Page404 from '@/routes/Errors/Page404/';
import Chat from '@/routes/Chat';
import { PrivateRoute } from './private-route';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'chat',
        element: (
            <PrivateRoute>
                <Chat />
            </PrivateRoute>
        ),
    },
    {
        path: '*',
        element: <Page404 />,
    },
]);
