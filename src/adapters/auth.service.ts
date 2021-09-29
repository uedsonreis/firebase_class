import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Auth, User } from '../services/interfaces';

export class AuthService implements Auth {

    constructor(
        private readonly auth: ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<FirebaseAuthTypes.Module, FirebaseAuthTypes.Statics>
    ) {}

    public getLoggedUser() {
        return this.parser(this.auth().currentUser);
    }

    public async signOut() {
        if (this.auth().currentUser) await this.auth().signOut();
    }

    public async signIn(email: string, password: string) {
        try {
            await this.auth().signInWithEmailAndPassword(email, password);
            return true;
        } catch (error) {
            console.log('Login invalid:', error);
            return false;
        }
    }

    public async createUser(email: string, password: string): Promise<User> {
        const credential = await this.auth().createUserWithEmailAndPassword(email, password);
        return this.parser(credential.user);
    }

    private parser(logged: FirebaseAuthTypes.User | null): User {
        let user: User = { id: "", email: "" };
        if (logged) {
            user.id = logged.uid;
            user.email = logged.email!;
        }
        return user;
    }

}