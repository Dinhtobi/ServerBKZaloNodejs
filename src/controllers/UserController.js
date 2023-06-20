import db from "../models/index"
import UserService from "../services/UserService"

let handleLogin = async (req, res)=>{
    let email = req.body.email; 
    let password = req.body.password; 
    if(!email || !password) {
        return res.status(500).json({
            errCode : 1 ,
            message :"Missing inputs parameter!"
        })
    }
    else{
        let userData = await UserService.handleUserLogin(email, password);
        return res.status(200).json({
        errCode: userData.errCode ,
        message : userData.message ,
        user: userData.user ? userData.user : {},
    });
        // return res.status(200).json(userData.user);
}
    }

let HandleGetAllUser = async (req, res) =>{
    let id = req.query.id; 
    if(!id){
        return res.status(200).json({
            errCode : 0 ,
            message : "Missing required parameter",
            users: []
        });
    }
    let users = await UserService.getAllUser(id) ;
    return res.status(200).json({
        errCode : 0 ,
        message: "OK!",
        users
    });
}

let HandleCreateNewUser = async (req,res) =>{
    let message = await UserService.createNewUser(req.body);
    return res.status(200).json(message);
}

let HandleEditUser = async (req,res) =>{
    let data = req.body ;
    let message = await UserService.editUser(data);
    return res.status(200).json(message);
}

let HandleDelUser = async (req, res) =>{
    let id = req.body.id ;
    if(!id){
        return res.status(200).json({
            errCode: 1 ,
            message: "Missing parameter"
        });
    }
    let message = await UserService.delUser(id);
    return res.status(200).json(message);
}

let HandleSetStatus = async (req, res) =>{
    let data = req.body ;
    if(!data){
        return res.status(400).json({
            errCode: 1 ,
            message: "Missing parameter!"
        })
    }else{
        let message = await UserService.setstatus(data.id, data.status);
        return res.status(200).json(message);
    }
}


let HandleGetAllUserbyIdGroup = async (req, res) =>{
    let data = req.body ;
    let message = await UserService.getAllbyidgroup(data.id, data.type);
    return res.status(200).json(message);
}
module.exports ={
    handleLogin : handleLogin ,
    HandleCreateNewUser: HandleCreateNewUser,
    HandleDelUser : HandleDelUser ,
    HandleEditUser : HandleEditUser ,
    HandleGetAllUser : HandleGetAllUser,
    HandleSetStatus:HandleSetStatus,
    HandleGetAllUserbyIdGroup:HandleGetAllUserbyIdGroup,
}