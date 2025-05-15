import { db } from '../db';
import axios from 'axios';
import { Request, Response} from 'express';


export const getMessages = async (req: Request, res: Response) => {
   const [rows] = await db.query('SELECT * FROM messages');
   res.json(rows);
};

export const postMessage = async (req: Request, res: Response) => {
    const {content} = req.body;
    await db.query('INSERT INTO messages(content, sender) VALUES(?, ?)', [content, 'user']);
    
    const aiResponse = await axios.post("http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse", {
        input: content,
    });

    const botResponse = aiResponse.data.choices[0].message.content;

    await db.query("INSERT INTO messages(content, sender) VALUES(?, ?)", [botResponse, 'bot'])

    res.json({user: content, bot: botResponse});
};

export const deleteMessages = async (req: Request, res: Response) => {
    await db.query("TRUNCATE messages;");

    res.json("Mensajes eliminados correctamente");
};

