var express = require("express");
var router = express.Router();

const  credential = [
    {
    email : "student1@gmail.com",
    password : "student1"
    },
    {
        email : "student2@gmail.com",
        password : "student2"
        }
]

const alumni={
    email:"alumni@gmail.com",
    password:"alumni"
}
let requestedSlot=[];

// login user
router.post('/login', (req, res)=>{
    if(req.body.email == credential[0].email && req.body.password == credential[0].password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful...!");
    }

    if(req.body.email == credential[1].email && req.body.password == credential[1].password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful...!");
    }

    if(req.body.email == alumni.email && req.body.password == alumni.password){
        req.session.user = req.body.email;
        res.redirect('/route/alumni');
        //res.end("Login Successful...!");
    }
    else{
        res.end("Invalid Username")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

// route for alumni
router.get('/alumni', (req, res) => {
    if(req.session.user){
        res.render('alumni', {user : req.session.user,slots:requestedSlot})
    }
    
    else{
        res.send("Unauthorize User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Home", logout : "logout Successfully...!"})
        }
    })
})

//


router.post('/slot-request', (req, res)=>{
    
    console.log(req.body);
    
    

    const {days,slots,stdid}=req.body;
    
    
        if (!days || !slots || !stdid){
            res.send("all fileds are required");
        }
        requestedSlot.push({days,slots,stdid});
        console.log("1",requestedSlot);
        res.send("slot requested succesfully");
    
    
});


module.exports = router;

