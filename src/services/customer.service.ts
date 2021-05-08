import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Customer } from '../pages/Customers/types';

import { AuthService } from './auth.service';

export class CustomerService {

    constructor(
        private readonly authService: AuthService,
        private readonly firestore: ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<FirebaseFirestoreTypes.Module, FirebaseFirestoreTypes.Statics>
    ) {}

    private getRepository() {
        return this.firestore().collection('customers');
    }

    private getUserId() {
        const logged = this.authService.getLoggedUser();
        return logged ? logged.uid : "";
    }

    public async save(customer: Customer) {
        if (customer.id) {
            await this.getRepository().doc(customer.id).set({ ...customer });
        } else {
            await this.getRepository().add({ ...customer, userId: this.getUserId() });
        }
    }

    public async getCustomers() {
        const response = await this.getRepository().where('userId', '==', this.getUserId()).get();
        return response.docs.map(doc => ({ ...doc.data(), id: doc.id } as Customer));
    }

}