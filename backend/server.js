const express = require('express');
const app=express();
const cors=require("cors");
app.use(express.json());
app.use(cors());
const db= require('./models');





const userRouter = require("./routes/Login");
const roomRouter = require("./routes/rooms");

app.use("/",userRouter);
app.use("/rooms",roomRouter);
const studentDetailsRouter = require('./routes/student'); // Assume you save your student route here
app.use("/details", studentDetailsRouter); // Mounting your details router here
const admindetails = require('./routes/admin'); // Adjust if the file is named differently
app.use('/students', admindetails); // Make sure this matches the endpoint you're trying to hit
const complaintRoutes = require('./routes/complaintroutes');
app.use('/complaints',complaintRoutes);

db.sequelize.sync().then(()=>{
    app.listen(4000,()=>{
        console.log("riya");
    });
});
