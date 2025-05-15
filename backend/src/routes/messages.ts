import {Router} from 'express';
import { deleteMessages, getMessages, postMessage } from '../controllers/messagesController';

const messagesRouter = Router();

messagesRouter.get('/messages', getMessages);
messagesRouter.post('/messages', postMessage);
messagesRouter.delete('/messages', deleteMessages);

export default messagesRouter;


