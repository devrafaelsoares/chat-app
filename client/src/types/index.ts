type UserStatus = 'ONLINE' | 'OFFLINE';

type MensageType = 'CHAT' | 'JOIN' | 'LEAVE';

type UserProps = {
    name: string;
    username: string;
    status: UserStatus;
};

type AuthChatProps = {
    user: UserProps;
    authUser: (user: UserProps) => void;
    disconnectUser: () => void;
};

type ChatCreate = {
    name: string;
    username: string;
};

type ChatMessage = {
    sender: string;
    content: string;
    type: MensageType;
    timestamp: Date;
};
