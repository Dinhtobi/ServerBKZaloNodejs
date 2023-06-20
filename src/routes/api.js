import express from "express"
import userController from "../controllers/UserController";
import MessageController from "../controllers/MessageController";
import BoxChatController from "../controllers/BoxChatController";
import GroupChatController from "../controllers/GroupChatController";
import DetailGroupChatController from "../controllers/DetailGroupChatController";
let router = express.Router();

let initWebRoutes = (app) =>{

    //user
    router.post('/api/login',userController.handleLogin);
    router.get('/api/get-all-users' , userController.HandleGetAllUser);
    router.post('/api/create-new-user' , userController.HandleCreateNewUser);
    router.post('/api/set-status-user' , userController.HandleSetStatus);
    router.post('/api-admin-listmembergroupAPI' , userController.HandleGetAllUserbyIdGroup);
    router.put('/api/edit-user' , userController.HandleEditUser);
    router.delete('/api/del-user' , userController.HandleDelUser);

    //message
    router.post('/api/create-message' , MessageController.handleCreateMessage);
    router.get('/api/getall-message' , MessageController.handleGetMessage);
    router.delete('/api/del-message', MessageController.handleDelMessage);
    router.post('/api/findid-message', MessageController.handleFindbyid);


    //BoxChat
    router.post('/api/create-boxchat', BoxChatController.handleCreateBoxChat);
    router.post('/api/get-boxchat' , BoxChatController.handleGetBoxChat);
    router.put('/api/update-boxchat' , BoxChatController.handleUpdateBoxChat);

    //GroupChat 
    router.post('/api/create-groupchat' , GroupChatController.handleCreateGroupChat);
    router.put('/api/update-groupchat' , GroupChatController.handleUpdateGroupChat);
    router.delete('/api/del-groupchat' , GroupChatController.handleDelGroupChat);
    router.post('/api/get-groupchat' , GroupChatController.handleGetGroupChat);

    //DetailGroupChat
    router.post('/api/create-detailgroupchat', DetailGroupChatController.handleCreateDetailGroupChat);
    router.put('/api/update-detailgroupchat', DetailGroupChatController.handleUpdateDetailGroupChat);
    router.delete('/api/del-detailgroupchat', DetailGroupChatController.handleDelDetailGroupChat);
    router.post('/api/get-detailgroupchat' ,DetailGroupChatController.handleGetDetailGroupChat);
    return app.use("/",router);
}

module.exports = initWebRoutes;