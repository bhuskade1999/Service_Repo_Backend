import { AuthService } from "./auth.service";
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    signIns(email: string, password: string): Promise<{
        message: string;
        access_token: string;
    }>;
}
