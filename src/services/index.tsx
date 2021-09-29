import { authAdapter, customerRepository } from '../adapters';

import { CustomerService } from './customer.service';
import { Auth } from './interfaces';

export const auth = authAdapter as Auth;
export const customerService = new CustomerService(auth, customerRepository);