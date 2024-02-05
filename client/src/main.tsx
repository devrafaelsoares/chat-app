import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthChatProvider } from './context/AuthChatContext';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthChatProvider>
        <RouterProvider router={router} />
    </AuthChatProvider>
);
