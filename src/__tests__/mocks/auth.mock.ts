import { Auth, User } from "../../services/interfaces";

class AuthMock implements Auth {

    private readonly email = 'uedson@any.com';

    getLoggedUser(): User {
        return { id: 'ABC123', email: this.email } as User
    }

    async signOut(): Promise<void> {
        console.log("Method not implemented.");
    }

    async signIn(email: string, password: string): Promise<boolean> {
        return (email === this.email && password === '123');
    }

    async createUser(email: string, password: string): Promise<User> {
        return { id: 'DEF456', email } as User
    }
}

const auth: Auth = new AuthMock();

it('Create Auth', () => {
    expect(auth).toBeDefined();
});

export default auth;