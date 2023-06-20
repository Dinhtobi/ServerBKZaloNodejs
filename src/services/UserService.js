import db from '../models/index';
import bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email , password) =>{
    return new Promise (async (resolve, reject) =>{
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    // attributes: ['email' , 'password'],
                    where: {email : email},
                    raw: true
                })
                if(user) {
                    let check = await bcrypt.compareSync(password , user.password)
                    if(check) {
                        userData.errCode = 0 ;
                        userData.errMessage = 'OK!'
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3 ;
                        userData.errMessage = 'Wrong Password!'
                    }
                }else{
                    userData.errCode = 2;
                    errMessage = 'User not exist!'
                }
                resolve(userData)
            }else{
                userData.errCode = 1;
                userData.errMessage = `Your's Email not exist!`;
                resolve(userData);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            let user = await db.User.findOne({
                where: {email : userEmail}
            });
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUser = (userid) =>{
    // console.log(userid);
    return new Promise( async (resolve ,reject) =>{
        try {
            let users = '';
            if(userid === 'All'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            } else if( userid && userid !== 'All'){
                users = await db.User.findOne({
                    where:{
                        id : userid
                    } ,
                    attributes :{
                        exclude: ['password']
                    },
                })
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            let hashpassword = await bcrypt.hashSync(password, salt)
            resolve(hashpassword);
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try {
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode : 1 ,
                    message : "Your email is exist!"
                });
            }
           else {
            let hashpasswordFormBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                name: data.name, 
                email: data.email,
                password : hashpasswordFormBcrypt ,
                avatar : data.avatar,
                status: data.status
            })
            let user = await db.User.findOne({
                where : {email : data.email}
                , raw : false
            })
            resolve({
                errCode : 0 ,
                message: user
            })
           }
        } catch (error) {
            reject(error);
        }
    })
}

let editUser = (data)=>{
    return new Promise (async (resolve, reject) =>{
        try {
            if(!data.id) {
                resolve({
                    errCode : 2 ,
                    message :"Missing parameter!"
                })
            }
            let user = await db.User.findOne({where: {id : data.id}, raw: false});
            if(user){
                user.name = data.name ;
                user.avatar = data.avatar ;
                let hashpasswordFormBcrypt = await hashUserPassword(data.password);
                user.password = hashpasswordFormBcrypt;
                if(user.email != data.email){

                    let isExist = await checkUserEmail(data.email);
                    if(!isExist){
                        user.email = data.email ;
                        await user.save();
                        resolve({
                            errCode: 0 ,
                            message: user
                        })
                    }
                    else{
                        resolve({
                            errCode : 2,
                            message : "Email exist!"
                        });
                    }
                }else{
                    await user.save();
                    resolve({
                        errCode: 0 ,
                        message: user
                    })
                }
                
                
            }else{
                resolve({
                    errCode: 1 ,
                    message: "User not found!"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let setstatus =(userid ,status) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            let user = await db.User.findOne({
                where :{id : userid},
                raw : false
            })
            if(user) {
                user.status = status ;
                await user.save();
                resolve({
                    errCode: 0 ,
                    message :"Update Status Complete!"
                });
            }else{
                console.log("User not found!");
                resolve({
                    errCode: 1 ,
                    errMessage : "User not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let delUser = (userid) =>{
    return new Promise (async (resolve, reject) =>{
        try {
            let user = await db.User.findOne({where:{id : userid} , raw : false})
            if(user){
                await db.User.destroy({
                    where: {id: userid}
                });
                resolve({
                    errCode : 0,
                    message : "Delete Complete!"
                });
            }else{
                resolve({
                    errCode: 1,
                    message:"User not found!"
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllbyidgroup = (groupid, type) =>{
    return new Promise (async (resolve, reject) =>{
        try {
            let detailgroup = await db.DetailGroupChat.findAll({
                where : {id_groupchat : groupid} ,
                raw : false
            });
            let users =  await db.User.findAll();
            if (users === null || detailgroup === null){
                resolve({
                    errCode: 1 ,
                    errMessage : "Infomation wrong!"
                });
            }else{
                let useringroup = [];
               if(type === 'Admin'){
                for(let user of users){
                    for(let item of detailgroup){
                        if(user.id === item.id_user){
                            useringroup.push(user);
                            break;
                        }
                    }
                }
                resolve({
                    errCode: 0 ,
                    message: "Get Complete!",
                    users: useringroup
                })
               }else{
                for(let user of users){
                    for(let item of detailgroup){
                        if(user.id === item.id_user && item.status === 1){
                            useringroup.push(user);
                            break;
                        }
                    }
                }
                resolve({
                    errCode: 0 ,
                    message: "Get Complete!",
                    users: useringroup
                })
               }
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleUserLogin:handleUserLogin,
    getAllUser : getAllUser ,
    createNewUser : createNewUser ,
    editUser: editUser,
    delUser : delUser,
    setstatus: setstatus,
    getAllbyidgroup:getAllbyidgroup,
}