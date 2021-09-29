import { authService, customerRepository } from '../adapters';

import { CustomerService } from './customer.service';
import { Auth } from './interfaces';

export const auth = authService as Auth;
export const customerService = new CustomerService(auth, customerRepository);