import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { AuthService } from './auth.service';
import { CustomerRepository } from './customer.repository';

export const authService = new AuthService(firebaseAuth);
export const customerRepository = new CustomerRepository(firestore);