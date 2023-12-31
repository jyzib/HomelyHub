const express = require("express");
const bcrypt = require("bcryptjs");
const user = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const salt = bcrypt.genSaltSync(10);
const log = console.log.bind(console);
const path = require("path");
const donwload = require("image-downloader");
const jwtSecreat = "dnf2ou3yh79f2g38fhxn39183ywx";
const multer = require("multer");
const placesSchma = require("../model/placesModel");
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    const parentDir = path.join(__dirname, "..");
    return cd(null, parentDir + "/upload/");
  },
  filename: function (req, file, cd) {
    console.log(file.originalname);
    const randondate = `${Date.now()}_${file.originalname}`;
    return cd(null, randondate);
  },
});

const upload = multer({ storage });
user.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await userModel.findOne({ email });
  if (data) {
    const datauser = bcrypt.compareSync(password, data.password);
    if (datauser) {
      log("Login ");
      jwt.sign(
        { email: data.email, id: data._id, name: data.name },
        jwtSecreat,
        {},
        (err, token) => {
          if (err) throw err;
          return res
            .cookie("token", token, { sameSite: "None", secure: true })
            .json({ data, status: true });
        }
      );
    } else {
      log("wrong password");
      return res.status(200).json({ status: false, msg: "wrong password" });
    }
  } else {
    return res.status(200).json({ msg: "email not found" });
  }
});

user.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const userSave = await userModel.create({
    name,
    email,
    password: bcrypt.hashSync(password, salt),
  });
  res.status(200).json({ msg: userSave });
});

user.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecreat, {}, (err, user) => {
      if (err) throw err;
      return res.json({ user, status: true });
    });
  } else {
    return res.json({ status: false });
  }
});

user.post("/logout", (req, res) => {
  res
    .cookie("token", "", { sameSite: "None", secure: true })
    .json({ msg: "logout" });
});

user.post("/upload-by-link", async (req, res) => {
  const newName = "photo" + Date.now() + ".jpg";

  const parentDir = path.join(__dirname, "..");
  const { link } = req.body;
  await donwload.image({
    url: link,
    dest: parentDir + "/upload/" + newName,
  });
  res.json(newName);
});
user.post("/upload", upload.array("photos", 10), async (req, res) => {
  let photoarr = [];
  for (let i = 0; i < req.files.length; i++) {
    photoarr.push(req.files[i].filename);
  }

  res.json({ msg: photoarr });
});
user.post("/places", async (req, res) => {
  const data = req.body;

  const dataAll = await placesSchma.create(data);

  console.log(dataAll.owner);
  const userplaces = await placesSchma.find({ owner: dataAll.owner });
  console.log(userplaces);
  res.json({ userplaces });
});
user.put("/places", async (req, res) => {
const {token} =  req.cookies;
const {title,address,description,perkes,checkin,checkout,maxGuest,extraInfo,addedphotos,owner,id,prices} = req.body;
  console.log(addedphotos)
const dataAll = await placesSchma.findById(id);
console.log(dataAll._id)
jwt.verify(token, jwtSecreat, {}, (err, user) => {
    if (err) throw err;
    if(user.id == dataAll.owner){
      placesSchma.updateOne({ _id: dataAll._id }, {
        $set: {
            title, address, description, perkes, checkin, checkout, maxGuest, extraInfo, addedphotos,prices
        }
    }).then((res) => console.log(res)).catch((err) => console.log(err))
    } 
});
// await placesSchma.save()

   res.json({ msg: "true" });

});

user.get('/places',async (req,res)=>{
const allplaaces = await placesSchma.find()
console.log(allplaaces)
res.json({allplaaces})
})



user.post("/Allplaces", async (req, res) => {
  const { owner } = req.body;
  
  const userplaces = await placesSchma.find({ owner: owner });

  res.json({ userplaces });
});


user.get("/:id", async (req, res) => {
  const { id } = req.params;

  const userplaces = await placesSchma.findOne({ _id: id });
  
  res.json(userplaces);
});


module.exports = user;
