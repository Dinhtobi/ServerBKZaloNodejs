import db from '../models/index';

let handleCreateGroupChat = (data) =>{
    return new Promise (async (resolve ,reject) =>{
        try {
            let groupChat = await db.GroupChat.create({
                namegroup : data.namegroup ,
                id_createdbyuser : data.id_createdbyuser ,
                image :data.image ,
                status:1 ,
            })
            let newgroupchat = await db.GroupChat.findOne({
                where :{id : groupChat.id}
                , raw : false
            })
            resolve({
                errCode : 0 , 
                message : newgroupchat
            });
        } catch (error) {
            reject(error);
        }
    })
}

let handleDelGroupChat = (groupchat_id) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            let groupchat = await db.GroupChat.findOne({where: { id : groupchat_id, raw : false}});
            if(groupchat) {
                await db.GroupChat.destroy({ where :{
                    id : groupchat_id
                }});
                resolve({
                    errCode : 0 ,
                    message :"Delete GroupChat Complete!"
                });
            }else{
                resolve({
                    errCode : 1 ,
                    errMessage: "Not found GroupChat!" 
                });
            }
        } catch (error) {
            reject(error) ;
        }
    })
}

let handleUpdateGroupChat = (data) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            let groupchat = await db.GroupChat.findOne({where : {id : data.id}, raw : false });
            if(groupchat){
                if(data.id_createdbyuser == 0) {
                    groupchat.namegroup = data.namegroup ;
                    groupchat.image = data.image ;
                    groupchat.status = data.status;
                        await groupchat.save();
                        resolve({
                            errCode : 0 ,
                            message : "Change information GroupChat complete!"
                        });
                    
                }else{
                    groupchat.id_createdbyuser = data.id_createdbyuser 
                    await groupchat.save();
                    resolve({
                        errCode : 0 ,
                        message :"Change usercreated complete!"
                    });
                }
            }else{
                resolve({
                    errCode : 1 ,
                    errMessage : "GroupChat not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetGroupChat = (groupchat_id , user_id) =>{
    return new Promise (async (resolve ,reject) => {
        try {
            if(groupchat_id != 0 && user_id == 0) {
                let groupChat = await db.GroupChat.findOne({
                    where : {id : groupchat_id} ,
                    raw : false
                });
                if(groupChat) {
                    resolve({
                        errCode: 0,
                        message : groupChat
                    });
                }else{
                    resolve({
                        errCode : 1 ,
                        errMessage : "GroupChat not found!"
                    });
                }
            }else{
               

                let detailgroupchat = await db.DetailGroupChat.findAll({
                    where : { id_user : user_id ,
                        status : 1},
                    raw : false ,
                })
                let groupchats = await db.GroupChat.findAll({
                    where: {status : 1},
                    raw : false ,
                });
                let message = [] ;
                for (let i of detailgroupchat) {
                    for (let j of groupchats) {
                        if(i.id_groupchat == j.id){
                            message.push(j) ;
                        }
                    }
                }
                resolve({
                    errCode : 0,
                    message : message 
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleCreateGroupChat : handleCreateGroupChat ,
    handleDelGroupChat: handleDelGroupChat ,
    handleUpdateGroupChat : handleUpdateGroupChat ,
    handleGetGroupChat :handleGetGroupChat,
}