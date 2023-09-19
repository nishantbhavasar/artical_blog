import e, { Request, Response, Router } from "express";
import { AuthController } from "../controller/authController";
import { PostController } from "../controller/postController";
import { verifyJwtToken } from "../middleware/authMiddleware";
const postRouter = Router();
const postController = new PostController();
postRouter.post('/createpost',verifyJwtToken, async (req: Request, res: Response) => {
    console.log(req.body);
    const response = await postController.createPost(req.body,req.headers.authorization as string);
    return res.status(response.status).send(response);
});
postRouter.delete('/deletepost/:id',verifyJwtToken, async (req: Request, res: Response) => {
    // console.log(req.url);
    const response = await postController.deletePost(req?.params?.id,req?.headers?.authorization as string);
    return res.status(response.status).send(response);
});
postRouter.put('/updatepost/:id',verifyJwtToken, async (req: Request, res: Response) => {
    // console.log(req.url);
    const response = await postController.updatePost(req?.body,req?.params?.id,req?.headers?.authorization as string);
    return res.status(response.status).send(response);
});
postRouter.get('/',verifyJwtToken, async (req: Request, res: Response) => {
    // console.log(req.url);
    let response;
    if(req.query?.search){
        response = await postController.getArticalWithFilter(req.query?.search as string);
    }else{
        response = await postController.getAllArtical();
    }
    return res.status(response.status).send(response);
});
postRouter.get('/post/:id',verifyJwtToken, async (req: Request, res: Response) => {
    // console.log(req.url);
    const response = await postController.getPost(req?.params?.id);
    return res.status(response.status).send(response);

});
postRouter.get('/myposts/:id',verifyJwtToken, async (req: Request, res: Response) => {
    // console.log(req.url);
    const response = await postController.getUserPosts(req?.params?.id);
    return res.status(response.status).send(response);

});
export default postRouter