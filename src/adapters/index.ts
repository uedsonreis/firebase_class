import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { AuthAdapter } from './auth.adapter';
import { CustomerRepository } from './customer.repository';

export const authAdapter = new AuthAdapter(firebaseAuth);
export const customerRepository = new CustomerRepository(firestore);