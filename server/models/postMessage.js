import mongoose from "mongoose";

 // give the uniformity to the documents
 // each post need to have following things
 // without this, you can create post absolutely different
const postSchema = mongoose.Schema({
  title : String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: String,
})

// turn into model(collections of document)
const PostMesage = mongoose.model('PostMessage', postSchema)

export default PostMesage;