import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CustomerRepository } from '../repositories/customer.repository';

import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';

const customerRepository = new CustomerRepository(firestore);

export const authService = new AuthService(auth);
export const customerService = new CustomerService(authService, customerRepository);