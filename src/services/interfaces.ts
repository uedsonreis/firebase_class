export interface User {
    id: string;
    email: string;
}

export interface Auth {

    getLoggedUser(): User;

    signOut(): Promise<void>;

    signIn(email: string, password: string): Promise<boolean>;

    createUser(email: string, password: string): Promise<User>;
}

export interface Repository<E> {

    list(filter: any): Promise<E[]>;

    create(obj: E): Promise<string>;

    update(obj: E): Promise<void>;
}