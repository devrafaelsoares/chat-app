import { ReactElement, createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

type Props = {
    children: ReactElement;
};

export const AuthChatContext = createContext<AuthChatProps>({} as AuthChatProps);

export function AuthChatProvider({ children }: Props) {
    const [_, setCookies, removeCookie] = useCookies<'user', UserProps>(['user']);

    const [user, setUser] = useState<UserProps>({} as UserProps);

    const { name, username, status } = user;

    function authUser({ name, username, status }: UserProps) {
        setUser({ name, username, status });
        setCookies('user', { name, username, status }, { path: '*' });
    }

    function disconnectUser() {
        removeCookie('user');
    }

    return (
        <AuthChatContext.Provider value={{ user: { name, username, status }, authUser, disconnectUser }}>
            {children}
        </AuthChatContext.Provider>
    );
}
