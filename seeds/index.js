const mongoose = require('mongoose');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for(var i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '601b465f870f321e675fafeb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta itaque provident eum, ab explicabo voluptatibus ut, voluptatem nostrum saepe odio soluta! Quibusdam nulla, nostrum porro soluta ad accusamus perferendis minus.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/sjain99/image/upload/v1613212584/YelpCamp/qrxdmmqiivptpsjyi8yl.jpg',
                  filename: 'YelpCamp/qrxdmmqiivptpsjyi8yl'
                },
                {
                  url: 'https://res.cloudinary.com/sjain99/image/upload/v1613212583/YelpCamp/psqsisliqqlhrid6dehx.jpg',
                  filename: 'YelpCamp/psqsisliqqlhrid6dehx'
                }
              ]
        });
        await camp.save();
    }
}

seedDB().then( () =>{
    mongoose.connection.close();
});