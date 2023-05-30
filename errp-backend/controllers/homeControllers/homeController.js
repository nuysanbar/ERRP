const recommendedProducts=(req,res)=>{
        res.status(200).json({"home": req.username + "reccommended system"})
    }

module.exports={recommendedProducts};


// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017/myproject';

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   const data = db.collection('data').find();
//   const users = [];
//   const items = [];
//   const ratings = [];

//   data.forEach((doc) => {
//     const user = doc.user;
//     const item = doc.item;
//     const description = doc.description;
//     const tags = doc.tags;

//     if (!users.includes(user)) {
//       users.push(user);
//     }

//     if (!items.includes(item)) {
//       items.push(item);
//     }

//     ratings.push([users.indexOf(user), items.indexOf(item), 1]);

//     const itemData = db.collection('items').findOne({ _id: item });
//     itemData.description = description;
//     itemData.tags = tags;
//     db.collection('items').update({ _id: item }, itemData);
//   });

//   const userRatings = [];

//   for (let i = 0; i < users.length; i++) {
//     const userRatingsRow = [];
//     for (let j = 0; j < items.length; j++) {
//       userRatingsRow.push(0);
//     }
//     userRatings.push(userRatingsRow);
//   }

//   ratings.forEach((rating) => {
//     const user = rating[0];
//     const item = rating[1];
//     const ratingValue = rating[2];
//     userRatings[user][item] = ratingValue;
//   });

//   const itemFeatures = [];

//   items.forEach((item) => {
//     const itemData = db.collection('items').findOne({ _id: item });
//     const description = itemData.description;
//     const tags = itemData.tags;
//     const features = [];
//     features.push(description);
//     tags.forEach((tag) => features.push(tag));
//     itemFeatures.push(features);
//   });

//   const userFeatures = [];

//   users.forEach((user) => {
//     const userRatingsRow = userRatings[users.indexOf(user)];
//     const features = [];

//     for (let i = 0; i < items.length; i++) {
//       const rating = userRatingsRow[i];
//       if (rating > 0) {
//         const itemFeaturesRow = itemFeatures[i];
//         itemFeaturesRow.forEach((feature) => features.push(feature));
//       }
//     }

//     userFeatures.push(features);
//   });

//   const similarityMatrix = [];

//   for (let i = 0; i < users.length; i++) {
//     const row = [];
//     for (let j = 0; j < users.length; j++) {
//       const user1Features = userFeatures[i];
//       const user2Features = userFeatures[j];
//       const intersection = user1Features.filter((feature) =>
//         user2Features.includes(feature)
//       );
//       const similarity =
//         intersection.length /
//         (user1Features.length + user2Features.length - intersection.length);
//       row.push(similarity);
//     }
//     similarityMatrix.push(row);
//   }

//   console.log(similarityMatrix);
//   db.close();
// });