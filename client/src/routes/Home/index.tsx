import Header from '@/components/Header';
import Form from '@/components/Form';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Index() {
    const [cookies] = useCookies(['user']);

    const user = cookies.user as UserProps;

    if (cookies.user && user.status === 'ONLINE') return <Navigate to="/chat" />;

    return (
        <div className="min-h-screen w-full bg-neutral-950">
            <Header />
            <main className="w-full h-[90lvh]">
                <section className="flex flex-col justify-center items-center h-full">
                    <div className="flex flex-col items-center gap-3">
                        <img src="chat.png" className="w-12" alt="" />
                        <h2 className="text-white text-3xl">Web Chat</h2>
                    </div>
                    <Form />
                </section>
            </main>
        </div>
    );
}
