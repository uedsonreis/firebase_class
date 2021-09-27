import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Customer } from '../pages/Customers/types';
import { CustomerRepository } from '../repositories/customer.repository';

import { AuthService } from './auth.service';

export class CustomerService {

    constructor(
        private readonly authService: AuthService,
        private readonly repository: CustomerRepository 
    ) {}

    private getUserId() {
        const logged = this.authService.getLoggedUser();
        return logged ? logged.uid : "";
    }

    public async save(customer: Customer) {
        if (customer.id) {
            await this.repository.update(customer);
        } else {
            await this.repository.create({ ...customer, userId: this.getUserId() });
        }
    }

    public async getCustomers() {
        const filter = { userId: this.getUserId() };
        return await this.repository.list(filter);
    }

}