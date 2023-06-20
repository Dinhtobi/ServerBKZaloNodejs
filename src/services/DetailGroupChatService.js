import { where } from "sequelize";
import db from "../models/index";

let handleCreateDetailGroupChat = (data) =>{
    return new Promise (async (resolve, reject) =>{
        try {
            let detailgroupchat = await db.DetailGroupChat.findOne({where :{
                id_user : data.id_user ,
                id_groupchat : data.id_groupchat,
            } , raw : false }
            );
            if(detailgroupchat){
                detailgroupchat.status = 1 ;
                detailgroupchat.timejoin = data.timejoin;
                await detailgroupchat.save();
            }else{
            await db.DetailGroupChat.create({
                id_groupchat : data.id_groupchat ,
                id_user : data.id_user ,
                timejoin : data.timejoin, 
                status : 1 
            });
        }
            resolve({
                errCode : 0 , 
                message : "OK!"
            });
        } catch (error) {
            reject(error);
        }
    })
}

let handleDelDetailGroupChat = (groupchat_id) =>{
    return new Promise(async (resolve , reject ) =>{
        try {
            let detailgroupchat = await db.DetailGroupChat.findAll({
                where: {id_groupchat : groupchat_id},
                raw : false
            });
            if(detailgroupchat) {
                for(let i of detailgroupchat) {
                    await db.DetailGroupChat.destroy({
                        where: {id: i.id},
                    });
                }
                resolve({
                    errCode : 0 ,
                    message : "Del Complete!"
                });
            }else{
                resolve({
                    errCode : 1,
                    errMessage: "Not found groupchat!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetDetailGroupChat = (groupchat_id , user_id) =>{
    return new Promise (async (resolve ,reject) =>{
        try {
            if(user_id) {
                let detailgroupchat = db.DetailGroupChat.findOne({
                    where : {id_groupchat : groupchat_id ,id_user : user_id}
                    ,raw : false
                });
                if(detailgroupchat) {
                    resolve({
                        errCode : 0 ,
                        message: "OK!"
                    });
                }else{
                    resolve({
                        errCode: 1 ,
                        errMessage :"Not found detailgroupchat!"
                    });
                }
            }else{
                let detailgroupchat = db.DetailGroupChat.findAll({
                    where: {id_groupchat : groupchat_id},
                    raw : false
                })
                if(detailgroupchat) {
                    resolve({
                        errCode : 0 ,
                        message: "OK!"
                    });
                }else{
                    resolve({
                        errCode: 1 ,
                        errMessage :"Not found detailgroupchat!"
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleUpdateDetailGroupChat = (data) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            if(data.status == 1) {
                let detailgroupchat = await db.DetailGroupChat.findOne({
                    where : {id_user : data.id_user ,
                        id_groupchat : data.id_groupchat},
                    raw : false
                });
                if(detailgroupchat) {
                    detailgroupchat.status = data.status;
                    detailgroupchat.timejoin = data.timejoin;
                    await detailgroupchat.save();
                    resolve({
                        errCode : 0 ,
                        message: "Update Complete!"
                    });
                }
            }else{
                let detailgroupchat = await db.DetailGroupChat.findOne({
                    where : {id_user : data.id_user ,
                        id_groupchat : data.id_groupchat},
                    raw : false
                });
                if(detailgroupchat) {
                    detailgroupchat.status = data.status;
                    detailgroupchat.timeout = data.timeout;
                    await detailgroupchat.save();
                    resolve({
                        errCode : 0 ,
                        message: "Update Complete!"
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports ={
    handleCreateDetailGroupChat : handleCreateDetailGroupChat ,
    handleDelDetailGroupChat : handleDelDetailGroupChat ,
    handleGetDetailGroupChat : handleGetDetailGroupChat,
    handleUpdateDetailGroupChat : handleUpdateDetailGroupChat,
}