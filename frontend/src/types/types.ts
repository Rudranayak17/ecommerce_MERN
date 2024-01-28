export type User = {
    success:boolean
    user: {
        name: string;
        password: string;
        email: string;
        resetPasswordOTP: number | null;
        resetPasswordOTPExpiry: Date | null;
        createdAt: Date
        updatedAt: Date
        role: string;
        avatar: string;
        _id: string;
    }
    token: string;
};

