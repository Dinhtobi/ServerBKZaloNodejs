import MessageService from "../services/MessageService";
import db from "../models/index"

let handleGetMessage = async (req, res) =>{
    let message = await MessageService.handleGetMessage();
    return res.status(200).json(message);
}


let handleCreateMessage = async (req,res) =>{
    let message = await MessageService.handleCreateMessage(req.body);
    return res.status(200).json(message);
}

let handleDelMessage = async (req, res) =>{
    let id_message = req.query.id ;
    let message = await MessageService.handleDelMessage(id_message);
    return res.status(200).json(message);
}

let handleFindbyid = async (req,res) =>{
    let sender_id = req.body.id_sender ;
    let receiver_id = req.body.id_receiver;
    let message = await MessageService.handleFindbyid(sender_id , receiver_id);
    return res.status(200).json(message);
}
module.exports = {
    handleGetMessage : handleGetMessage ,
    handleCreateMessage : handleCreateMessage ,
    handleDelMessage : handleDelMessage ,
    handleFindbyid : handleFindbyid ,
}