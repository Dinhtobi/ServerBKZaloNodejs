import GroupChatService from '../services/GroupChatService' ;

let handleCreateGroupChat = async (req,res) =>{
    let message = await GroupChatService.handleCreateGroupChat(req.body);
    return res.status(200).json(message);
}

let handleDelGroupChat = async (req,res) =>{
    let message = await GroupChatService.handleDelGroupChat(req.query.id);
    return res.status(200).json(message);
}

let handleUpdateGroupChat = async (req,res) =>{
    let message = await GroupChatService.handleUpdateGroupChat(req.body);
    return res.status(200).json(message);
}

let handleGetGroupChat = async (req, res) =>{
    let group_id = req.body.id_group ;
    let user_id = req.body.id ;

    let message = await GroupChatService.handleGetGroupChat(group_id , user_id);
    return res.status(200).json(message);
}

module.exports = {
    handleCreateGroupChat : handleCreateGroupChat ,
    handleDelGroupChat : handleDelGroupChat ,
    handleUpdateGroupChat : handleUpdateGroupChat ,
    handleGetGroupChat : handleGetGroupChat,
}