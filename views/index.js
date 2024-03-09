const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const Chat=require("./models/chat.js");
app.set("views", path.join(__dirname,"/views"));
app.set("view engine","ejs");

const { v4: uuidv4 } = require('uuid');

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded( {extended: true}));
// mongoose
const mongoose = require('mongoose');


var methodOverride = require('method-override');
app.use(methodOverride('_method'));

main()
.then(() => {
    console.log('connection successfull');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}




// mongoose ended
app.get("/chats", async(req,res) => {
    let chats=await Chat.find();
    // console.log(chats);
    // res.send("working");
    res.render("index.ejs",{chats})


 
})

app.post("/chats", (req,res) => {

    let {from,to,msg}=req.body;

    let newChat=new Chat({

        id:uuidv4(),
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    // console.log(newChat);
    // res.send("working");

    newChat
    .save()
    .then((res) => {
         console.log("saved to db")})
         .catch( err => {
        console.log(err);
    });

    res.redirect("/chats");

})
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
})

//edit route
app.get("/chats/:id/edit" , async(req,res) => {

    let {id} =req.params;
    let chat=await Chat.findById(id);

    res.render("edit.ejs",{chat});
})

app.put("/chats/:id" , async(req,res) => {
    let {id}=req.params;
    let {msg: newMsg}=req.body; //// Access the value using req.body.msg
    // console.log(newMsg);
    // res.send("working");

    let updateChat=await Chat.findByIdAndUpdate(id,
         {msg:newMsg},
         {runValidators:true, new:true});

         res.redirect("/chats");
})

app.delete("/chats/:id" ,async (req,res) => {
    let {id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
      

})
app.listen(8080, () => {
    console.log(`app listening on ${port}`);
})