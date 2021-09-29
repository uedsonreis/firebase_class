import { auth } from '../../services';

export async function save(email: string, password: string, confirmPassword: string) {
    if (!email || !email.includes('@')) {
        return "Email format is invalid!";
    }

    if (password !== confirmPassword) {
        return "Password don't match!";
    }

    await auth.createUser(email, password);
    return undefined;
}