var express = require('express');
var router = express.Router();

const User = require('../models/userSchema')
const passport = require('passport')
const localStrategy = require('passport-local')

passport.use(new localStrategy(User.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// Step 1 sign up
router.get('/signup',(req,res)=>{
  res.render('signup')
})

router.post('/signup',async(req,res)=>{
  try{
    const {name,username,email,password} = req.body
    User.register({name,username,email},password)
    res.redirect('/')
  }catch(err){
    res.send(err)
  }
})


// Step 2 Log in
router.post('/login',
passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/'
})
,(req,res)=>{})


// step-4 logout
router.get('/logout',(req,res)=>{
  req.logout(()=>{
    res.redirect('/')
  })
})


// step -5 when clicking on forgot password this sends to checkemail page
router.get('/email-check',(req,res)=>{
  res.render('emailcheck')
})

// this routes check if email is registerde or not if it does then send to forgot password page
router.post('/email-check',async(req,res)=>{
try{
  const{email} = req.body
  const user =await User.findOne({email:email})
  if(user){
    res.redirect(`/forgot-password/${user._id}`)
  }else{
    res.redirect('/email-check')
  }
}catch(err){
  res.send(err)
}
})


// step-6 
router.get('/forgot-password/:id',(req,res)=>{
  res.render('forgotPassword',{id:req.params.id})
})

router.post('/forgot-password/:id',async(req,res)=>{
  try{
    const user = await User.findById(req.params.id)
    await user.setPassword(req.body.password)
    await user.save
    res.redirect('/')
  }catch(err){
    res.send(err)
  }
})


// step-3
router.get('/profile',isLoggedIn,(req,res)=>{
  res.render('profile')
})


// this is a middle ware which check if the usre is logged in or not
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    next()
  }else{
    res.redirect('/')
  }
}



module.exports = router;
