const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usermodel = mongoose.model('Usermodel');
const uhelp = mongoose.model('uhelp');
const upolicy = mongoose.model('upolicy');
const uterms = mongoose.model('uterms');
const BookedUsermodel = mongoose.model('BookedUsermodel');
const Reviewmodel = mongoose.model('ReviewModel');
const bcrypt = require('bcrypt');
const natural = require('natural');

//User Register

router.post('/userregister', (req, res) => {
  const User = new Usermodel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nickname:req.body.nickname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    city: req.body.city,
    country: req.body.country,
    date: req.body.date,
  });

  User.save()
    .then((data) => {
      // console.log(data);
      // res.send(data);
      const token = jwt.sign({userid: User._id}, jwtkey);
      res.send({token});
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.post('./addupolicy', async(req,res)=>{
  const policy = new upolicy({
    policy:req.body.policy,
  });

  policy.save()
    .then((data) => {
       console.log(data);
       res.send(data);
      
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
})
router.post('./adduterms', async(req,res)=>{
  const terms = new uterms({
    terms:req.body.terms,
  });

  terms.save()
    .then((data) => {
       console.log(data);
       res.send(data);
      
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
})

router.post('./uhelp', async(req,res)=>{
  const uhelp1 = new uhelp({
    question:req.body.question,
    message:req.body.message,
    contact:req.body.contact
  });

  uhelp1.save()
    .then((data) => {
       console.log(data);
       res.send(data);
      
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
})


//Update User Profile
router.put('/forgetpass', async(req, res) => {
  let {nickname, npassword,email} = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    console.log('IN GENRATE SALT')
    if (err) {
      return next(err);
    }
    bcrypt.hash(npassword, salt, (err, hash) => {
      console.log('in hash')
      if (err) {
        return (err);
      }
      npassword = hash;
console.log(npassword);
    
    });
  });
  const user = await Usermodel.findOne({email})
  if (!user) {
    return res.status(422).send({error: 'Email not exist!!'});
  }
  console.log('user',user);
  try {
    if(user.nickname==nickname)
   {

    const User = Usermodel.findByIdAndUpdate(user._id,{
      firstname: user.firstname,
    lastname: user.lastname,
    nickname:user.nickname,
    email: user.email,
    password: npassword,
    phone: user.phone,
    address: user.address,
    photo: user.photo,
    longitude: user.longitude,
    latitude: user.latitude,
    city: user.city,
    country: user.country,
    date: user.date,
      })
      .then((data) => {
        console.log('afterupdate',data);
        res.send(data);
        // const token = jwt.sign({userid: User._id}, jwtkey);
        // res.send({token});
      })
      .catch((err) => {
        res.status(404).send(err.message);
      });
   }
   else{res.status(422).send({error: 'nickname not exist!!'});}
    
  } catch (err) {
    return res.status(422).send({error: 'Password not exist!!'});
  }
});


router.put('/updateuser/:id', (req, res) => {
  const User = Usermodel.findByIdAndUpdate(req.params.id,{
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    // password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    city: req.body.city,
    country: req.body.country,
    })
    .then((data) => {
      console.log(data);
      res.send(data);
      // const token = jwt.sign({userid: User._id}, jwtkey);
      // res.send({token});
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.route("/usercount").get(function(req, res) {
  Usermodel.count(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
//User Login

router.post('/usersignin', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(422).send({error: 'Provide Email and Password Both!!'});
  }
  const user = await Usermodel.findOne({email});
  if (!user) {
    return res.status(422).send({error: 'Email not exist!!'});
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({userid: user._id,firstname:user.firstname}, jwtkey);
    res.send({token});
  } catch (err) {
    return res.status(422).send({error: 'Password not exist!!'});
  }
});

//Get user By id
router.get('/user/:id', (req, res) => {
  Usermodel.findById(req.params.id)
    .select({
      firstname: 1,
      lastname: 1,
      latitude: 1,
      longitude: 1,
      email: 1,
      password:1,
      phone: 1,
      photo: 1,
      address: 1,
      city: 1,
      country: 1,
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.send(error);
    });
});

//Update User Lat & Long
router.put('/userlocation/:id', (req, res) => {
  Usermodel.findByIdAndUpdate(
    {_id: req.params.id},
    {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      } else {
        // user.update();
        return res.status(200).json(user);
      }
    })

    .catch((error) => {
      return res.send(error);
    });
});

//Get all Users
router.get('/users', (req, res) => {
  async function get() {
    const users = await Usermodel.find().sort('id').select({
      firstname: 1,
      lastname: 1,
      email: 1,
      password: 1,
      phone: 1,
      address: 1,
      photo: 1,
      latitude: 1,
      longitude: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
    });
    if (!users) return res.status(404).send('Not Found');
    res.send(users);
  }
  get();
});
//////////////////////////////////////////////////User Review APIS//////////////////////////////
router.post('/add/:uid/:mid', async (req, res) => {
  const Review = new Reviewmodel({
    userid: req.params.uid,
    mechanicid: req.params.mid,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    photo: req.body.photo,
    rating: req.body.rating,
    description: req.body.description,
  });

  Review.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/getuser/:id', (req, res) => {
  var data = [];
  Reviewmodel.find({mechanicid: req.params.id})
    .select({
      userid: 1,
      mechanicid: 1,
      firstname: 1,
      lastname: 1,
      photo: 1,
      rating: 1,
      description: 1,
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }
      user.map((item) => {
        var Analyzer = natural.SentimentAnalyzer;
        var stemmer = natural.PorterStemmer;
        var analyzer = new Analyzer('English', stemmer, 'afinn');
        var tokenizer = new natural.WordTokenizer();
        // console.log(tokenizer.tokenize(req.body.description));
        // getSentiment expects an array of strings
        var word = tokenizer.tokenize(item.description);
        const r = analyzer.getSentiment(word);
        console.log(r)
     data.push({
            rating: item.rating,
            description: item.description,
            rating: item.rating,
            photo: item.photo,
            firstname: item.firstname,
          });
     
      //   if (
      //     (r > 1 && item.rating == 5) || (r > 1 && item.rating == 4)) {
      //     data.push({
      //       rating: item.rating,
      //       description: item.description,
      //       rating: item.rating,
      //       photo: item.photo,
      //       firstname: item.firstname,
      //     });
      //   } else if (
      //     (r >= 0 && r <= 1 && item.rating == 3) ||
      //     (r >= 0 && r <= 1 && item.rating == 4) ||
      //     (r >= 0 && r <= 1 && item.rating == 2)
      //   ) {
      //     data.push({
      //       rating: item.rating,
      //       description: item.description,
      //       rating: item.rating,
      //       photo: item.photo,
      //       firstname: item.firstname,
      //     });
      //   } else if ((r < 0 && item.rating == 1) || (r < 0 && item.rating == 2)) {
      //     data.push({
      //       rating: item.rating,
      //       description: item.description,
      //       rating: item.rating,
      //       photo: item.photo,
      //       firstname: item.firstname,
      //     });
      //   }
      });
      res.json(data);
    })
    .catch((error) => {
      return res.send(error);
    });
});
module.exports = router;
