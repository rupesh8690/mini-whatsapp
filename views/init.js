// mongoose
const mongoose = require('mongoose');

const Chat=require("./models/chat.js");

const { v4: uuidv4 } = require('uuid');

main()
.then(() => {
    console.log('connection successfull');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
        id:uuidv4(),
        from:"neha",
        to:"priya",
        msg:"send me your exam sheets",
        created_at:new Date(),
    
    },
    {
        id:uuidv4(),
        from:"sita",
        to:"krish",
        msg:"how are you?",
        created_at:new Date(),
    },
    {
        id:uuidv4(),
        from:"manish",
        to:"sachin",
        msg:"Feeling relaxed",
        created_at:new Date(),
    }

]
Chat.insertMany(allChats);