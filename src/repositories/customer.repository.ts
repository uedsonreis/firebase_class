import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { Customer } from '../pages/Customers/types';

export class CustomerRepository {

    constructor(
        private readonly firestore: ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<FirebaseFirestoreTypes.Module, FirebaseFirestoreTypes.Statics>
    ) {}

    private getRepository() {
        return this.firestore().collection('customers');
    }

    public async list(filter: any) {
        const field = Object.getOwnPropertyNames(filter)[0];
        const response = await this.getRepository().where(field, '==', filter[field]).get();
        return response.docs.map(doc => ({ ...doc.data(), id: doc.id } as Customer));
    }

    public async create(customer: Customer) {
        const document = await this.getRepository().add(customer);
        return document.id;
    }

    public async update(customer: Customer) {
        await this.getRepository().doc(customer.id).set({ ...customer });
    }

}