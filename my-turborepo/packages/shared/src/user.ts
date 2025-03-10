export interface User {
    id: string;
    name: string;
    email: string;
}

export function validateUser(user: User): boolean {
    return user.email.includes('@') && user.name.length > 0;
}