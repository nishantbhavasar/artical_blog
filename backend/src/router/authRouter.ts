import { Request, Response, Router } from "express";
import { AuthController } from "../controller/authController";
const authRouter = Router();
const authController = new AuthController();
authRouter.post('/login', async (req: Request, res: Response) => {
    console.log(req.url);
    const response = await authController.login(req.body);
    if (response.token) res.cookie('token', response.token); // store token in cookie so we can access from any route to get user Login Information
    return res.status(response.status).send(response);
});
authRouter.post('/register', async (req: Request, res: Response) => {
    console.log(req.url);
    const response = await authController.register(req.body);
    return res.status(response.status).send(response);
});
export default authRouter