import { Customer } from "../../entities/customer";
import { Repository } from "../../services/interfaces";

class CustomerRepositoryMock implements Repository<Customer> {

    private identity = 3;

    private readonly customers: Customer[] = [
        { id: 'ABC1', email: 'fulano@any.com', name: 'Fulano de Tal', userId: 'ABC123' },
        { id: 'DEF2', email: 'joao@any.com', name: 'João das Neves', userId: 'DEF456' },
    ];

    async list({ userId }: any): Promise<Customer[]> {
        return this.customers.filter(c => c.userId === userId);
    }
    
    async create(obj: Customer): Promise<string> {
        obj.id = "XYZ" + this.identity.toString();
        this.customers.push(obj);
        this.identity++;
        return obj.id;
    }
    
    async update(obj: Customer): Promise<void> {
        this.customers.forEach(customer => {
            if (customer.id === obj.id) {
                customer.name = obj.name;
                customer.email = obj.email;
            }
        });
    }

}

const repository: Repository<Customer> = new CustomerRepositoryMock();

it('Create Customer Repository', () => {
    expect(repository).toBeDefined();
});

export default repository;