import useSWR from 'swr';
import Header from '@/components/Header';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { AuthChatContext } from '@/context/AuthChatContext';
import { LogOut, MessagesSquare, Send } from 'lucide-react';
import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { URL_CHAT_SEND, URL_MESSAGES, URL_REGISTER_USER, URL_SOCKET, URL_TOPIC } from '@/server/url';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Index() {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const [socket] = useState<WebSocket>(new SockJS(URL_SOCKET));
    const [stompClient] = useState<Stomp.Client>(Stomp.over(socket));
    const { disconnectUser } = useContext(AuthChatContext);
    const [cookies] = useCookies(['user']);
    const user = cookies.user as UserProps;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const URL_GET_MESSAGES = `${URL_MESSAGES}/${user.username}`;

    stompClient.connect({}, onConnected, onError);
    stompClient.debug = () => {};

    const MessageSchema = z.object({
        message: z.string().min(1).trim(),
    });

    type MessageSchemaType = z.infer<typeof MessageSchema>;

    const { register, handleSubmit, setValue } = useForm<MessageSchemaType>({
        resolver: zodResolver(MessageSchema),
    });

    useSWR<ChatMessage[]>(URL_GET_MESSAGES, fetcher, {
        onSuccess(messages) {
            setMessages([...messages]);
        },
    });

    function onConnected() {
        const chatCreate: ChatCreate = {
            name: user.name,
            username: user.username,
        };

        stompClient.subscribe(URL_TOPIC, onMessageReceived);

        stompClient.send(URL_REGISTER_USER, {}, JSON.stringify(chatCreate));
    }

    function onError(err: string | Stomp.Frame) {
        console.log(err);
    }

    function onMessageReceived(payload: Stomp.Message) {
        const payloadData = JSON.parse(payload.body) as ChatMessage;
        messages.push(payloadData);
        setMessages([...messages]);
    }

    function sendMessage(message: string) {
        if (stompClient.connected) {
            const { name } = user;
            const newMessage: ChatMessage = {
                sender: name,
                content: message.trim(),
                type: 'CHAT',
                timestamp: new Date(),
            };
            stompClient.send(URL_CHAT_SEND, {}, JSON.stringify(newMessage));
            setValue('message', '');
        }
    }

    function onSubmit({ message }: MessageSchemaType) {
        sendMessage(message);
    }

    function handleDisconnect() {
        disconnectUser();
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col ">
            <Header className="hidden sm:flex" />
            <div className="w-screen flex justify-center">
                <div className="bg-neutral-950 w-full h-screen sm:w-8/12 md:w-9/12 xl:w-7/12 sm:h-[85lvh] rounded-lg relative">
                    <div className="relative w-full flex justify-center items-center h-12 border-b border-white bg-slate-100 top-0  sm:rounded-t-md">
                        <div className="flex items-center gap-3">
                            <h2 className="font-bold text-2xl text-neutra-950">Web Chat</h2>
                            <MessagesSquare className="text-neutra-950" />
                        </div>
                        <button type="button" title="Sair" onClick={handleDisconnect}>
                            <LogOut fontSize="2em" className="text-neutral-950 absolute right-0 top-3 mr-3" />
                        </button>
                    </div>
                    <ul
                        id="chat"
                        className="h-[88lvh] sm:h-[72.8lvh] flex flex-col gap-4 p-4 overflow-auto bg-slate-100"
                    >
                        {messages.map((message, index) => {
                            return message.sender === user.name ? (
                                <li className="w-full flex  justify-end items-center" key={index}>
                                    <p className="bg-white w-72 rounded-t-xl rounded-l-xl p-2 break-all">
                                        {message.content}
                                    </p>
                                </li>
                            ) : (
                                <li className="w-full flex flex-col justify-end items-start" key={index}>
                                    <p className="bg-white w-72 rounded-t-lg rounded-r-lg p-2 break-all ml-6">
                                        {message.content}
                                    </p>
                                    <div className="flex justify-center items-center w-6 h-6 bg-red-800 rounded-full text-sm  mt-1">
                                        {message.sender[0]}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="absolute w-full px-4 bottom-0 sm:border-t border-white bg-slate-100 rounded-b-md">
                        <form action="#" className="flex items-center bg-slate-100" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                {...register('message')}
                                type="text"
                                className="w-full py-4 text-neutral-950 bg-slate-100 outline-none px-4"
                                placeholder="Envie a sua mensagem"
                            />
                            <button type="submit" title="Enviar">
                                <Send className="text-neutral-950" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
