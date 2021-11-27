const Sauce = require("../models/sauce");
const fs = require('fs');

// Show all sauces 
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      console.log('sauces',sauces)
      res.status(200).json(sauces)})
    .catch((error) => res.status(404).json({ error }));  
   // next();
};

// Show only one sauce 
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
   // next();
}

// Create New Sauce 
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(req.file.filename);
  const url = req.protocol + '://' + req.get('host');
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersdisLiked: [],
  });
 console.log(sauceObject);
  sauce.save()
    .then(() => res.status(201).json({ message: "sauce post saved successfully" }))
    .catch((error) => res.status(400).json({ error }));
    console.log(sauce);
};

// Modify new sauce 
exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body }

  Sauce.updateOne({ _id : req.params.id}, {...sauceObject, _id: req.params.id})
  .then(res.status(200).json({ message : "Sauce modified successfully"}))
  .catch(error => res.status(400).json({ error }))
  next();
}

// Delete sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id : req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split("/images/")[1]
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({_id : req.params.id})
  .then(res.status(200).json({ message: "Sauce deleted successfully" }))
  .catch(error => res.status(400).json({ error }))
  
    })
  })
  .catch(error => res.status(500).json({ error }))
  next();
}

// Like / Dislike sauce
exports.likeDislikeSauce = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id
          // Sauce liked
  switch (like) {
    case 1 :
        Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
          .then(() => res.status(200).json({ message: `liked` }))
          .catch((error) => res.status(400).json({ error }))
          next();
      break;
          // Sauce dislike
    case 0 :
        Sauce.findOne({ _id: sauceId })
           .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                .then(() => res.status(200).json({ message: `neutral` }))
                .catch((error) => res.status(400).json({ error }))
                next();
            }
            if (sauce.usersDisliked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
                .then(() => res.status(200).json({ message: `neutral` }))
                .catch((error) => res.status(400).json({ error }))
              next();
            }
          })
          .catch((error) => res.status(404).json({ error }))
      break;
          // Sauce update 
    case -1 :
        Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
          .then(() => { res.status(200).json({ message: `unliked` }) })
          .catch((error) => res.status(400).json({ error }))
          next();
      break;
      
      default:
        console.log(error);
  }
}