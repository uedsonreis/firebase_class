import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { Repository } from '../services/interfaces';
import { Customer } from '../entities/customer';

export class CustomerRepository implements Repository<Customer> {

    constructor(
        private readonly firestore: ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<FirebaseFirestoreTypes.Module, FirebaseFirestoreTypes.Statics>
    ) {}

    private getCollection() {
        return this.firestore().collection('customers');
    }

    public async list(filter: any) {
        const field = Object.getOwnPropertyNames(filter)[0];
        const response = await this.getCollection().where(field, '==', filter[field]).get();
        return response.docs.map(doc => ({ ...doc.data(), id: doc.id } as Customer));
    }

    public async create(customer: Customer) {
        const document = await this.getCollection().add(customer);
        return document.id;
    }

    public async update(customer: Customer) {
        await this.getCollection().doc(customer.id).set({ ...customer });
    }

}