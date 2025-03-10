import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repository/userCollection';
import { signToken } from '../helper/helper';
const userRepo = new UserRepository();

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) throw new Error('Need Email')

        const user: any = await userRepo.findUserByEmail(email);

        if (!user) throw new Error('User Not Found')

        const payLoad = {
            id: user.id,
            email: user.email,
        };
        const token = signToken(payLoad);

        res.status(200).json({ message: "success login", token });
    } catch (error) {
        next(error)
    }
}

export const fetchUserData = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await userRepo.fetchAllUsers();

        if (!user) throw new Error('No User Found')

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


export const updateUserData = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.params;
        const userData = req.body;

        await userRepo.updateUser(userId, userData);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
};