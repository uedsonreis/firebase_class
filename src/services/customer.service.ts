import { Customer } from '../entities/customer';
import { Auth, Repository } from './interfaces';

export class CustomerService {

    constructor(
        private readonly auth: Auth,
        private readonly repository: Repository<Customer>
    ) {}

    private getUserId() {
        const logged = this.auth.getLoggedUser();
        return logged ? logged.id : "";
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