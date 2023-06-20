import db from "../models/index";

let handleGetBoxChat = (sender_id , receiver_id, group_id, type) =>{
    return new Promise (async (resolve, reject ) =>{
        try {
            if(type === 'All'){

                if(group_id != 0){

                    let boxchat = await db.BoxChat.findAll({where:{
                        id_groupchat : group_id ,
                    }  ,raw : false});
                    if(boxchat){
                        for (let i of boxchat){
                            let Group = await db.GroupChat.findOne({where:{id : i.id_groupchat},raw : false});
                            i.namegroup = Group.namegroup ;
                            i.image = Group.image ;
                        }
                        resolve({
                            errCode : 0 ,
                            message: boxchat
                        })
                    }else{
                        resolve({
                            errCode : 1,
                            message: {}
                        })
                    }
                }else{
                    if(sender_id != 0 && receiver_id == 0){
                        let boxchat = await db.BoxChat.findAll({where :{
                            id_sender : sender_id,
                            id_groupchat : 0 ,
                           
                        }, raw : false}
                        )
                        
                        if(boxchat){
                            for (let i of boxchat){
                                let sender = await db.User.findOne({where :{
                                    id  : i.id_sender,
                                   
                                }, raw : false
                            })
    
                                i.namesender = sender.name;
                                i.urlsender = sender.avatar ;
                                let receiver = await db.User.findOne({ where :{
                                    id : i.id_receiver,
                                }, raw : false
                            })
                                i.namereceiver = receiver.name;
                                i.urlreceiver = receiver.avatar ;
                            }
                            resolve({
                                errCode : 0,
                                message: boxchat
                            })
                        }else{
                            resolve({
                                errCode : 1,
                                message: {}
                            })
                        }
                    } else if (sender_id == 0 && receiver_id != 0){
                        let boxchat = await db.BoxChat.findAll({where :{
                            id_receiver : receiver_id,
                            id_groupchat : 0 
                        }
                        , raw : false,})
                        if(boxchat){
                            for (let i of boxchat){
                                let sender = await db.User.findOne({where :{
                                    id  : i.id_sender,
                                   
                                }, raw : false})
                                i.namesender = sender.name;
                                i.urlsender = sender.avatar ;
                                let receiver = await db.User.findOne({ where :{
                                    id : i.id_receiver,
                                    
                                } ,raw : false});
                                i.namereceiver = receiver.name;
                                i.urlreceiver = receiver.avatar ;
                            }
                            resolve({
                                errCode : 0,
                                message: boxchat
                            })
                        }else{
                            resolve({
                                errCode : 1,
                                message: {}
                            })
                        }
                        }
                }
            }else{
                if (group_id != 0){
                    let boxchat = await db.BoxChat.findOne({
                        where :{ id_groupchat : group_id,},raw : false
                    });
                    if(boxchat){
                    let Group = await db.GroupChat.findOne({where : {id : group_id} ,raw : false})
                    boxchat.namegroup = Group.namegroup ;
                    boxchat.image = Group.image;
                    resolve({
                        errCode : 0,
                        message : boxchat
                    });
                    }else{
                        resolve({
                            errCode : 1,
                            message : {}
                        });
                    }
                }else{
                    let boxchat = await db.BoxChat.findOne({
                        where : {id_sender : sender_id ,
                        id_receiver : receiver_id ,
                        },raw : false
                    })
                    if(boxchat){
                        let sender = await db.User.findOne({where :{
                            id  : sender_id,
                        }, raw : false
                        });
                        boxchat.namesender = sender.name;
                        boxchat.urlsender = sender.avatar ;
                        let receiver = await db.User.findOne({ where :{
                            id : receiver_id,
                        },raw : false});
                        boxchat.namereceiver = boxchat.namereceiver;
                        boxchat.urlreceiver = receiver.avatar;
                        resolve({
                            errCode : 0,
                            message : boxchat
                        });
                    }else{
                        resolve({
                            errCode : 1,
                            message : {}
                        });
                    }
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleUpdateBoxChat = (data) =>{
    return new Promise (async (resolve, reject) =>{
        try {
            let boxchat = await db.BoxChat.findOne({where :{
                id : data.id,
                
            },raw : false });
            if(boxchat){
                boxchat.lastmessage = data.lastmessage ;
                boxchat.createAt = data.createAt;
                await boxchat.save();
                resolve({
                    errCode : 0 ,
                    message : "Update BoxChat Complete!"
                });
            }{
                resolve({
                    errCode : 1 ,
                    errMessage : "BoxChat not found!"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleCreateBoxChat = (data) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            await db.BoxChat.create({
                id_sender : data.id_sender ,
                id_receiver : data.id_receiver ,
                lastmessage : data.lastmessage ,
                createAt : data.createAt ,
                id_groupchat: data.id_groupchat,
            })
            resolve({
                errCode : 0 ,
                errMessage : "Add BoxChat Complete!"
            })
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleGetBoxChat : handleGetBoxChat ,
    handleCreateBoxChat: handleCreateBoxChat ,
    handleUpdateBoxChat : handleUpdateBoxChat ,
}