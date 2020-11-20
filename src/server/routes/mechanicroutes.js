const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const Mechanicmodel = mongoose.model('mechanicmodel');
const Usermodel = mongoose.model('Usermodel');
const Reviewmodel = mongoose.model('ReviewModel');
const Suggestion = mongoose.model('suggestions');
const VehicalIssuemodel = mongoose.model('vehicalissue');
const Mechanicreport = mongoose.model('mechanicreport');
const Mwarning = mongoose.model('Mwarning');
const Customerreport = mongoose.model('customerreport');
const Admin = mongoose.model('Adminschema');
const uhelp = mongoose.model('uhelp');
const BookedUsermodel = mongoose.model('BookedUsermodel');
const mhelp = mongoose.model('mhelp');
router.post('/issueregister', async (req, res) => {
  console.log('in issue register');
  const issue = new VehicalIssuemodel({
    carcompany: req.body.carcompany,
    issuetype: req.body.issuetype,
    skilltype: req.body.skilltype,
    city: req.body.city,
    vehicaltype: req.body.vehicaltype,
    userdbid: req.body.userdbid,
    phone: req.body.phone,
    userphoto: req.body.userphoto,
    description: req.body.description,
    date: Date.now(),
    status: req.body.status,
    issuevideo: req.body.issuevideo,
  });
  await issue.save().then(() => {
    res.send(issue).catch((err) => {
      res.status(404).send(err.message);
    });
  });
});

router.post('/registeradmin', async (req, res) => {
  console.log('in admin register');
  const admin = new Admin({
    email: req.body.email,
    password: req.body.password,
  });
  await admin.save().then(() => {
    res.send(admin).catch((err) => {
      res.status(404).send(err.message);
    });
  });
});

router.post('/sendwarning', async (req, res) => { 
  const Mwarning1 = new Mwarning({
    warning: req.body.warning,
    mdbid: req.body.mdbid,
    date: Date.now(),
  });
  await Mwarning1.save().then(() => {
    res.send(Mwarning1).catch((err) => {
      res.status(404).send(err.message);
    });
  });
});

router.delete('/Mdeletewarning/:id', async (req, res) => {
  Mwarning.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/getMwarning/:mdbid', (req, res) => {
  Mwarning.find({
    mdbid: req.params.mdbid,
  })
    .sort('id')
    .then((warning) => {
      if (!warning) return res.send('');
      else res.json(warning);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.delete('/Wdelete/:id', async (req, res) => {
  Mwarning.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.post('/Creportregister', async (req, res) => {
  console.log('in Creport register');
  const report = new Mechanicreport({
    reportdescription: req.body.reportdescription,
    reporttype: req.body.reporttype,
    userdbid: req.body.userdbid,
    mdbid: req.body.mdbid,
    date: req.body.date,
    userphoto: req.body.userphoto,
  });
  await report.save().then(() => {
    res.send(report).catch((err) => {
      res.status(404).send(err.message);
    });
  });
});

router.post('/Mreportregister', async (req, res) => {
  console.log('in Mreport register');
  const report = new Customerreport({
    reportdescription: req.body.reportdescription,
    reporttype: req.body.reporttype,
    userdbid: req.body.userdbid,
    mdbid: req.body.mdbid,
    date: req.body.date,
    mechanicphoto: req.body.mechanicphoto,
  });
  await report.save().then(() => {
    res.send(report).catch((err) => {
      res.status(404).send(err.message);
    });
  });
});

router.get('/Cgetreport', (req, res) => {
  Mechanicreport.find()
    .sort('id')
    .select({
      reportdescription: 1,
      reporttype: 1,
      userdbid: 1,
      mdbid: 1,
      date: 1,
      userphoto: 1,
    })
    .then((reports) => {
      if (!reports) return res.status(404).send('Not Found');
      else res.json(reports);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/Mgetreport', (req, res) => {
  Customerreport.find()
    .sort('id')
    .select({
      reportdescription: 1,
      reporttype: 1,
      userdbid: 1,
      mdbid: 1,
      date: 1,
      mechanicphoto: 1,
    })
    .then((reports) => {
      if (!reports) return res.status(404).send('Not Found');
      else res.json(reports);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});


router.delete('/mdeletehelp/:id', (req, res) => {
  mhelp.findByIdAndDelete({_id:req.params.id})
    .sort('id')
    .then((reports) => {
      if (!reports) return res.status(404).send('Not Found');
      else res.json(reports);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});
router.delete('/udeletehelp/:id', (req, res) => {
  uhelp.findByIdAndDelete({_id:req.params.id})
    .sort('id')
    .then((reports) => {
      if (!reports) return res.status(404).send('Not Found');
      else res.json(reports);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});


router.post('/mhelp', async (req, res) => {
  const mhelp1 = new mhelp({
    question: req.body.question,
    message: req.body.message,
    userid: req.body.userid,
    userimage: req.body.userimage,
  });

  mhelp1
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});
router.get('/mgethelp', (req, res) => {
  mhelp
    .find()
    .sort('id')
    .select({
      question: 1,
      message: 1,
      userid: 1,
      userimage: 1,
    })
    .then((reports) => {
      if (!reports) return res.status(404).send('Not Found');
      else res.json(reports);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/cgethelp', (req, res) => {
  uhelp
    .find()
    .sort('id')
    .select({
      question: 1,
      message: 1,
      userid: 1,
      userimage: 1,
    })
    .then((reports) => {
      if (!reports) return res.status(404).send('Not Found');
      else res.json(reports);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.delete('/deletemhelp/:id', async (req, res) => {
  mhelp
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.delete('/deletechelp/:id', async (req, res) => {
  uhelp
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.delete('/Cdeletereport/:id', async (req, res) => {
  Mechanicreport.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.delete('/Mdeletereport/:id', async (req, res) => {
  Customerreport.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.delete('/deletemechanic/:id', async (req, res) => {
  Mechanicmodel.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.route('/paintercount').get(function (req, res) {
  Mechanicmodel.count({skilltype: 'Painter'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route('/mechaniccount').get(function (req, res) {
  Mechanicmodel.count(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route('/bookedmcount').get(function (req, res) {
  BookedUsermodel.count({Status: 'Online'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route('/enginecount').get(function (req, res) {
  Mechanicmodel.count({skilltype: 'Engine'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
router.route('/bodycount').get(function (req, res) {
  Mechanicmodel.count({skilltype: 'Body'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
router.route('/electriccount').get(function (req, res) {
  Mechanicmodel.count({skilltype: 'Electric'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route('/electricissuecount').get(function (req, res) {
  VehicalIssuemodel.count({issuetype: 'Electric'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route('/bodyissuecount').get(function (req, res) {
  VehicalIssuemodel.count({issuetype: 'Body'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route('/engineissuecount').get(function (req, res) {
  VehicalIssuemodel.count({issuetype: 'Engine'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
router.route('/painterissuecount').get(function (req, res) {
  VehicalIssuemodel.count({issuetype: 'Painter'}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.get('/vehicalissues/:issuetype/:vehicaltype/:carcompany', (req, res) => {
  // var vehicaltype;
  // var issuetype;
  // var carcompany;
  // var description;
  // var phone;
  VehicalIssuemodel.find({
    issuetype: req.params.issuetype,
    vehicaltype: req.params.vehicaltype,
    carcompany: req.params.carcompany,
  })
    .sort('id')
    .select({
      _id: 1,
      phone: 1,
      city: 1,
      carcompany: 1,
      skilltype: 1,
      vehicaltype: 1,
      issuetype: 1,
      description: 1,
      userphoto: 1,
      phone: 1,
      date: 1,
      status: 1,
      issuevideo: 1,
    })
    .then((issues) => {
      if (!issues) return res.status(404).send('Not Found');
      else res.json(issues);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/vehicalissuesC/:userdbid', (req, res) => {
  VehicalIssuemodel.find({
    userdbid: req.params.userdbid,
  })
    .sort('id')
    .select({
      phone: 1,
      city: 1,
      carcompany: 1,
      skilltype: 1,
      vehicaltype: 1,
      issuetype: 1,
      description: 1,
      phone: 1,
      date: 1,
      userphoto: 1,
      status: 1,
      issuevideo: 1,
    })
    .then((issues) => {
      if (!issues) return res.status(404).send('Not Found');
      else res.json(issues);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.post('/postsuggestion', async (req, res) => {
  console.log('in suggestion');
  const suggestion = new Suggestion({
    firstname: req.body.firstname,
    suggestion: req.body.suggestion,
    issueid: req.body.issueid,
    mid: req.body.mid,
    mphoto: req.body.mphoto,
  });
  await suggestion.save().then(() => {
    res.send(suggestion).catch((err) => {
      res.status(404).send(err.message);
    });
  });
});

router.get('/issuessuggestion/:issueid', (req, res) => {
  Suggestion.find({
    issueid: req.params.issueid,
  })
    .sort('id')
    .select({
      suggestion: 1,
      firstname: 1,
      mid: 1,
      mphoto: 1,
    })
    .then((suggestion) => {
      if (!suggestion) return res.status(404).send('Not Found');
      else res.json(suggestion);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.put('/updateissue/:issueid', (req, res) => {
  VehicalIssuemodel.findByIdAndUpdate(
    {_id: req.params.issueid},
    {
      issuetype: req.body.issuetype,
      phone: req.body.Phone,
      photo: req.body.photo,
      carcompany: req.body.carcompany,
      city: req.body.city,
      description: req.body.description,
      vehicaltype: req.body.vehicaltype,
    },
  )
    .then((issue) => {
      if (!issue) {
        return res.status(404).send('Issue Not Found');
      } else {
        // mechanic.update();
        return res.status(200).json(issue);
      }
    })
    .catch((error) => {
      return res.send(error);
    });
});

router.delete('/deleteissue/:id', async (req, res) => {
  VehicalIssuemodel.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.post('/adminsignin', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(422).send({error: 'Provide Email and Password Both!!'});
  }
  const admn1 = await Admin.findOne({email});
  console.log(admn1);
  if (!admn1) {
    return res.status(422).send({error: 'Email not exist!!'});
  }
  try {
    if (admn1.password == password) {
      const atoken = jwt.sign({adminid: admn1._id}, jwtkey);
      res.send({atoken});
    }
  } catch (err) {
    return res.status(422).send({error: 'Password not exist!!'});
  }
});

router.post('/mechanicsignin', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(422).send({error: 'Provide Email and Password Both!!'});
  }
  const mechanic = await Mechanicmodel.findOne({email});
  if (!mechanic) {
    return res.status(422).send({message: 'Email not exist!!'});
  }
   
  try {
    if(mechanic.blocked==true){
      return res.send({message:"blocked"});
    }
    else
    await mechanic.comparePassword(password);
    const token = jwt.sign(
      {
        mechanicid: mechanic._id,
        firstname: mechanic.firstname,
        lastname: mechanic.lastname,
        email: mechanic.email,
        skilltype: mechanic.skilltype,
        vehicletype: mechanic.vehicletype,
        carcompany: mechanic.carcompany,
        city: mechanic.city,
        country: mechanic.country,
        phone: mechanic.phone,
        photo: mechanic.photo,
        address: mechanic.address,
        date: mechanic.date,
        mechanicrate: mechanic.mechanicrate,
        rating: mechanic.rating,
      },
      jwtkey,
    );
    res.send({token});
  } catch (err) {
    return res.status(422).send({error: 'Password not exist!!'});
  }
});

//Mechanic Registeration
router.post('/mechanicregister', async (req, res) => {
  const mechanic = new Mechanicmodel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    carcompany: req.body.carcompany,
    city: req.body.city,
    country: req.body.country,
    mechanicrate: req.body.mechanicrate,
    skilltype: req.body.skilltype,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    vehicletype: req.body.vehicletype,
    date: req.body.date,
    rating: req.body.rating,
    blocked:false
  });

  await mechanic
    .save()
    .then(() => {
      const token = jwt.sign({mechanicid: mechanic._id}, jwtkey);
      res.send({token});
    })
    // .then((data) => {
    //
    //   // res.send(data);
    // })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/me', function (req, res) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).send({auth: false, message: 'No token provided.'});

  jwt.verify(token, jwtkey, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({auth: false, message: 'Failed to authenticate token.'});
    res.status(200).send(decoded);
  });
});

//Update Mechanic Lat and Long
//Update User Lat & Long
router.put('/mechaniclocation/:id', async (req, res) => {
  Mechanicmodel.findByIdAndUpdate(
    {_id: req.params.id},
    {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
  )
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      } else {
        return res.status(200).json(mechanic);
      }
    })
    .catch((error) => {
      return res.send(error);
    });
});

//Update User Profile
router.put('/mforgetpass', async (req, res) => {
  console.log('in m forget api');
  let {nickname, npassword, email} = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    console.log('IN GENRATE SALT');
    if (err) {
      return next(err);
    }
    bcrypt.hash(npassword, salt, (err, hash) => {
      console.log('in hash');
      if (err) {
        return err;
      }
      npassword = hash;
      console.log(npassword);
    });
  });
  const user = await Mechanicmodel.findOne({email});
  if (!user) {
    return res.status(422).send({error: 'Email not exist!!'});
  }
  console.log('user', user);
  try {
    if (user.nickname == nickname) {
      const User = Mechanicmodel.findByIdAndUpdate(user._id, {
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
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
          console.log('afterupdate', data);
          res.send(data);
          // const token = jwt.sign({userid: User._id}, jwtkey);
          // res.send({token});
        })
        .catch((err) => {
          res.status(404).send(err.message);
        });
    } else {
      res.status(422).send({error: 'nickname not exist!!'});
    }
  } catch (err) {
    return res.status(422).send({error: 'Password not exist!!'});
  }
});

router.get('/bodymechanic', (req, res) => {
  Mechanicmodel.find({skilltype: 'Body'})
    .sort('id')
    .select({
      firstname: 1,
      lastname: 1,
      email: 1,
      phone: 1,
      address: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
      latitude: 1,
      longitude: 1,
      mechanicrate: 1,
      rating: 1,
    })
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});


router.get('/getblockmechanic', (req, res) => {
  console.log('in getblock mechaniuc api')
  Mechanicmodel.find({blocked: true})
    .sort('id')
    .select({
      _id:1,
      firstname: 1,
      lastname: 1,
      email: 1,
      phone: 1,
      address: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
      latitude: 1,
      longitude: 1,
      mechanicrate: 1,
      rating: 1,
    })
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});

router.put('/blockmechanic/:id', (req, res) => {
  const User = Mechanicmodel.findByIdAndUpdate(req.params.id, {
    blocked:true
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

router.put('/unblockmechanic/:id', (req, res) => {
  const User = Mechanicmodel.findByIdAndUpdate(req.params.id, {
    blocked:req.body.blocked
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
router.get('/topmechanics', (req, res) => {
  Mechanicmodel.find({rating: {$gte: 3}})
    .sort('id')
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});

router.get('/enginemechanic', (req, res) => {
  Mechanicmodel.find({skilltype: 'Engine'})
    .sort('id')
    .select({
      firstname: 1,
      lastname: 1,
      email: 1,
      phone: 1,
      address: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
      latitude: 1,
      longitude: 1,
      mechanicrate: 1,
      rating: 1,
    })
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});

router.get('/electricmechanic', (req, res) => {
  Mechanicmodel.find({skilltype: 'Electric'})
    .sort('id')
    .select({
      firstname: 1,
      lastname: 1,
      email: 1,
      phone: 1,
      address: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
      latitude: 1,
      longitude: 1,
      mechanicrate: 1,
      rating: 1,
    })
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});

router.get('/paintermechanic', (req, res) => {
  Mechanicmodel.find({skilltype: 'Painter'})
    .sort('id')
    .select({
      firstname: 1,
      lastname: 1,
      email: 1,
      phone: 1,
      address: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
      latitude: 1,
      longitude: 1,
      mechanicrate: 1,
      rating: 1,
    })
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});

//Get Mechanic By Id
router.get('/mechanic/:id', (req, res) => {
  Mechanicmodel.findById(req.params.id)
    .sort('id')
    .select({
      firstname: 1,
      lastname: 1,
      email: 1,
      phone: 1,
      address: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
      latitude: 1,
      longitude: 1,
      mechanicrate: 1,
      rating: 1,
    })
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});

//Get all Mechanics

router.get('/mechanics', (req, res) => {
  async function get() {
    const mechanics = await Mechanicmodel.find().sort('id').select({
      firstname: 1,
      lastname: 1,
      email: 1,
      password: 1,
      phone: 1,
      address: 1,
      latitude: 1,
      longitude: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
      mechanicrate: 1,
      rating: 1,
    });
    if (!mechanics) return res.status(404).send('Not Found');
    res.send(mechanics);
  }
  get();
});
router.get(
  '/nearmechanics/:skilltype/:vehicletype/:carcompany/:id',
  (req, res) => {
    var latitude;
    var longitude;
    var city;
    var country;
    var nearest = [];
    Usermodel.findById(req.params.id)
      .sort('id')
      .select({
        longitude: 1,
        latitude: 1,
        city: 1,
        country: 1,
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User Not Found');
        }
        // return res.status(200).json(user);
        latitude = user.latitude;
        longitude = user.longitude;
        city = user.city;
        country = user.country;
      })
      .then((near) => {
        Mechanicmodel.find({
          skilltype: req.params.skilltype,
          vehicletype: req.params.vehicletype,
          carcompany: req.params.carcompany,
          city: city,
          country: country,
        })
          .sort('id')
          .select({
            firstname: 1,
            lastname: 1,
            email: 1,
            phone: 1,
            photo: 1,
            city: 1,
            address: 1,
            country: 1,
            carcompany: 1,
            skilltype: 1,
            vehicletype: 1,
            mechanicrate: 1,
            longitude: 1,
            latitude: 1,
            rating: 1,
          })
          .then((mechanics) => {
            if (!mechanics) return res.status(404).send('Not Found');
            mechanics.map((item) => {
              let Lat1 = latitude / 57.29577951;
              let Lat2 = item.latitude / 57.29577951;
              let Long1 = longitude / 57.29577951;
              let Long2 = item.longitude / 57.29577951;
              // Calaculate distance
              let dlat = Lat2 - Lat1;
              let dlong = Long2 - Long1;
              //Apply Heversine Formula to calculate  Distance of Spherical Objects
              let a =
                Math.pow(Math.sin(dlat / 2), 2) +
                Math.cos(Lat1) *
                  Math.cos(Lat2) *
                  Math.pow(Math.sin(dlong / 2), 2);
              let c = 2 * Math.asin(Math.sqrt(a));
              let r = 6371;
              let result = c * r; //Get Result In KM
              //Found In 10 KM

              if (result <= 10) {
                //Distance get
                nearest.push({
                  mechanicid: item.id,
                  firstname: item.firstname,
                  lastname: item.lastname,
                  email: item.email,
                  photo: item.photo,
                  phone: item.phone,
                  carcompany: item.carcompany,
                  vehicletype: item.vehicletype,
                  skilltype: item.skilltype,
                  address: item.address,
                  country: item.country,
                  city: item.city,
                  address: item.address,
                  latitude: item.latitude,
                  longitude: item.longitude,
                  mechanicrate: item.mechanicrate,
                  rating: item.rating,
                  distance: Math.trunc(result),
                });
              }
            });
            return res.json(nearest);
          })
          .catch((error) => {
            return res.send(error);
          });
      });
  },
);

router.put('/mechanicrating/:id', async (req, res) => {
  const totalfiverate = await Reviewmodel.find({
    mechanicid: req.params.id,
    rating: 5,
  }).count();
  const totalfourrate = await Reviewmodel.find({
    mechanicid: req.params.id,
    rating: 4,
  }).count();
  const totalthreerate = await Reviewmodel.find({
    mechanicid: req.params.id,
    rating: 3,
  }).count();
  const totaltworate = await Reviewmodel.find({
    mechanicid: req.params.id,
    rating: 2,
  }).count();
  const totalonerate = await Reviewmodel.find({
    mechanicid: req.params.id,
    rating: 1,
  }).count();
  const totalrate =
    (5 * totalfiverate +
      4 * totalfourrate +
      3 * totalthreerate +
      2 * totaltworate +
      1 * totalonerate) /
    (totalfiverate +
      totalfourrate +
      totalthreerate +
      totaltworate +
      totalonerate);
  console.log(totalrate);
  Mechanicmodel.findByIdAndUpdate(
    {_id: req.params.id},
    {
      rating: 1,
    },
  )
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      } else {
        if (mechanic.rating != 0) {
          Mechanicmodel.findByIdAndUpdate(
            {_id: req.params.id},
            {
              rating: Math.trunc(totalrate),
            },
          ).then((m) => {
            return res.status(200).json(m);
          });
        }
      }
    })
    .catch((error) => {
      return res.send(error);
    });
});

//Update User Profile

router.put('/updatemechanic/:id', (req, res) => {
  const User = Mechanicmodel.findByIdAndUpdate(req.params.id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    city: req.body.city,
    country: req.body.country,
    vehicaltype: req.body.vehicaltype,
    skilltype: req.body.skilltype,
    carcompany: req.body.carcompany,
    mechanicrate: req.body.mechanicrate,
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

router.route('/mechaniccount').get(function (req, res) {
  Mechanicmodel.count(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;
