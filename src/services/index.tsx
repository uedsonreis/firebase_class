import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';

export const authService = new AuthService(auth);
export const customerService = new CustomerService(authService, firestore);