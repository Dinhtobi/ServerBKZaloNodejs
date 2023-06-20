import BoxChatService from '../services/BoxChatService';

let handleGetBoxChat = async (req, res) =>{
    let sender_id = req.body.id_sender;
    let receiver_id = req.body.id_receiver;
    let group_id = req.body.id_groupchat ;
    let type = req.body.type;
    let message = await BoxChatService.handleGetBoxChat(sender_id ,receiver_id, group_id ,type);
    return res.status(200).json(message);
}

let handleCreateBoxChat = async (req, res) => {
    let message = await BoxChatService.handleCreateBoxChat(req.body);
    return res.status(200).json(message);
}

let handleUpdateBoxChat = async(req,res) =>{
    let message = await BoxChatService.handleUpdateBoxChat(req.body) ;
    return res.status(200).json(message);
}
module.exports = {
    handleGetBoxChat : handleGetBoxChat ,
    handleCreateBoxChat : handleCreateBoxChat ,
    handleUpdateBoxChat : handleUpdateBoxChat ,
}