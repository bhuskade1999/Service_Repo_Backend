export declare class UserSchema {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}
export declare class UserReturnType {
    message: string;
    access_token?: string;
    user?: UserSchema;
}
