import { Customer } from '../entities/customer';
import { CustomerService } from '../services/customer.service';
import auth from './mocks/auth.mock';
import customerRepository from './mocks/customer.repository.mock';

const customerService = new CustomerService(auth, customerRepository);

it('list', async () => {
    const list = await customerService.getCustomers();

    expect(list.length).toBe(1);
    expect(list[0].email).toBe('fulano@any.com');
});

it('save', async () => {
    const customer = {
        name: 'Cicrano de Tal', email: 'cicrano@any.com',
        userId: auth.getLoggedUser().id
    } as Customer;

    await customerService.save(customer);
    const list = await customerService.getCustomers();

    expect(list.length).toBe(2);
    expect(list[list.length-1].id).toBeDefined();
});