import DetailGroupChatServiece from "../services/DetailGroupChatService";

let handleCreateDetailGroupChat = async (req, res) =>{
    let message  = await DetailGroupChatServiece.handleCreateDetailGroupChat(req.body);
    return res.status(200).json(message);
}

let handleDelDetailGroupChat = async (req,res)=>{
    let message = await DetailGroupChatServiece.handleDelDetailGroupChat(req.query.id);
    return res.status(200).json(message);
}

let handleGetDetailGroupChat = async (req, res) =>{
    let message = await DetailGroupChatServiece.handleGetDetailGroupChat(req.body.groupchat_id , req.body.user_id);
    return res.status(200).json(message);
}

let handleUpdateDetailGroupChat = async(req, res)=>{
    let message =await DetailGroupChatServiece.handleUpdateDetailGroupChat(req.body);
    return res.status(200).json(message);
}

module.exports = {
    handleCreateDetailGroupChat: handleCreateDetailGroupChat ,
    handleDelDetailGroupChat : handleDelDetailGroupChat ,
    handleGetDetailGroupChat : handleGetDetailGroupChat ,
    handleUpdateDetailGroupChat : handleUpdateDetailGroupChat,
}