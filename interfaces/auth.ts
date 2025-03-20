export interface UserCredentials {
    username: string;
    password: string;
}

interface UserMockCredentials {
    username: string;
    passphrase: string;
}

export interface Users {
    name: string;
    surname: string;
    credentials: UserMockCredentials;
    active: boolean;
    created: string;
    _comment: string;
}