import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthChatContext } from '@/context/AuthChatContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const { authUser } = useContext(AuthChatContext);

    const navigate = useNavigate();

    const formSchema = z.object({
        name: z.string().min(1, { message: 'Campo obrigatório' }),
        username: z.string().min(1, { message: 'Campo obrigatório' }),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            username: '',
        },
    });

    function onSubmit({ name, username }: FormSchemaType) {
        authUser({ name, username, status: 'ONLINE' });
        navigate('/chat');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-80">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input
                                    className="text-white text-md placeholder:text-gray-400"
                                    placeholder="Insira seu nome"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <FormControl>
                                <Input
                                    className="text-white text-md placeholder:text-gray-400"
                                    placeholder="Insira seu nome de usuário"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    variant="outline"
                    className="w-full border-none bg-blue-800 hover:bg-blue-900 text-white hover:text-white focus:bg-blue-900"
                    type="submit"
                >
                    Entrar
                </Button>
            </form>
        </Form>
    );
}
