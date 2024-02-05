import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

export default function Index() {
    return (
        <div className="min-h-screen w-full bg-neutral-950">
            <Header />
            <main className="flex h-[80lvh] flex-col items-center justify-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white">404</h1>
                <p className="text-3xl md:text-4xl lg:text-5xl text-white mt-4">Recurso não encontrado</p>
                <p className="md:text-lg lg:text-xl text-white mt-4 text-center sm:text-start">
                    Pedimos desculpas, não foi possível encontrar o recurso especificado
                </p>
                <Link
                    to="/"
                    className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 mt-12 rounded transition duration-150"
                    title="Retornar a home"
                >
                    <ArrowLeft />
                    <span>Voltar a home</span>
                </Link>
            </main>
        </div>
    );
}
