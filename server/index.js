import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
const app = express();
dotenv.config();
//setup the starting prefix for the routes in postRoutes
// become access by localhost:5000/posts/

// setup body Parser to send out the request
app.use(bodyParser.json({limit: "30mb", extended: true}))  // limit setting the size of images, transforms the text-based JSON input into JS-accessible variables under req.body
app.use(bodyParser.urlencoded({limit: "30mb", extended: true})) // for URL-encoded requests, extended: true precises that the req.body object will contain values of any type instead of just strings.
app.use(cors())
app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
  .catch((error)=>console.log(error.message));
