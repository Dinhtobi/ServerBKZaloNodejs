import db from '../models/index';

let handleGetMessage = () => {
    return new Promise (async (resolve , reject) =>{
        try {
            let allmessage = await db.Message.findAll();
            if (allmessage){
                resolve({
                    errCode : 0 ,
                    message : allmessage
                });
            }else{
                resolve({
                    errCode : 1 ,
                    errMessage: "Not found message!"
                });
            }

        } catch (error) {
            reject(error);
        }
    })
}

let handleCreateMessage = (data) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            await db.Message.create({
                id_sender : data.id_sender ,
                id_receiver : data.id_receiver ,
                content : data.content ,
                createAt : data.createAt,
                id_group : data.id_group ,
                fileformat : data.fileformat ,
            });
            resolve({
                errCode : 0 ,
                message : "OK!"
            })
        } catch (error) {
            reject(error);
        }
    })
}

let handleDelMessage = (id_message) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            let message = await db.Message.findOne({
                where:{id : id_message},
                raw : false
            });
            if(message){
                await db.Message.destroy({where :{id : id_message}});
                resolve({
                    errCode : 0 ,
                    message : "OK!"
                });
            }else{
                resolve({
                    errCode :1,
                    errMessage : "Not found Message!",
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleFindbyid = (sender_id , receiver_id ) =>{
    return new Promise (async (resolve , reject) =>{
        try {
            let message = await db.Message.findAll({
                where :{id_sender : sender_id ,
                 id_receiver : receiver_id} ,
                 raw : false 
            });
            if(message){
                resolve({
                    errCode : 0 ,
                    message : message 
                })
            }else{
                resolve({
                    errCode : 1 ,
                    errMessage : "Message not found!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleGetMessage : handleGetMessage ,
    handleCreateMessage : handleCreateMessage ,
    handleDelMessage : handleDelMessage ,
    handleFindbyid : handleFindbyid,
}