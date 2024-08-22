import mongoose from "mongoose";

const connectarDB = async () => {
    try {
        
        const db = await mongoose.connect(process.env.MONGODB_URI)


        const url = `${db.connection.host} : ${db.connection.port}`
        console.log(`Mongodb conectado en: ${url}`);
        
        

    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1); 
    }
}



export default connectarDB