const mongoose = require ("mongoose");

const connectdb = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected");
        
    }catch(error){
        console.error("error connecting with the database" , error);
        process.exit(1);
    }
};


 module.exports =  connectdb;