import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export class AuthService {

    constructor(
        private readonly auth: ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<FirebaseAuthTypes.Module, FirebaseAuthTypes.Statics>
    ) {}

    public getLoggedUser() {
        return this.auth().currentUser;
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

    public async createUser(email: string, password: string) {
        return await this.auth().createUserWithEmailAndPassword(email, password);
    }

}