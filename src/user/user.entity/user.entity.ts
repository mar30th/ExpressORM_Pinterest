export class UserEntity {
    user_id: number;
    email: string;
    password: string;
    full_name: string;
    age: number;
    avatar: string
}

export class UserLogin {
    email: string;
    password: string
}

export class UserUpdate {
    email?: string;
    full_name?: string;
    age?: number;
    avatar?: string;
}