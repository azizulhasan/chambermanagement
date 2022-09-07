const Blog = require('../models/blog');
const multer = require('multer')

/**
 * Display all blogs.
 * @param {Object} req for getting all blogs.
 * @param {Object} res 
 */
const blog_index = (req, res) => {

  Blog.find().sort({ createdAt: -1 })

    .then(result => {
      res.set('Access-Control-Allow-Origin' ,'*')
      res.json({ data: result });
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Display single blog details.
 * @param {Object} req for getting single.
 * @param {Object} res 
 */
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      
      res.json({ data: result });
    })
    .catch(err => {
      res.json(err);
    });
}
/**
 * blog creation page.
 * @param {Object} req for the page of blog creation.
 * @param {Object} res 
 */
const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

/**
 * Store image to "uploads" folder. after modifiying image namge.
 * 
 */
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        
        cb(null, Date.now()+"_"+file.originalname)
    }
})

const uploads = multer({
    storage: Storage
}).single('image')

/**
 * Save the blog to databse and save image to "uploads" folder.
 * @param {Object} req blog save request.
 * @param {Object} res 
 */
const blog_create_post = (req, res) => {
    
  uploads(req, res, (err)=> {
      if(err){
          console.log(err)
      }else{
          const blog = new Blog({
              ...req.body, 
              ...{
                  imageName: req.file.filename,
              }
          });
      blog.save()
        .then(result => {
          res.redirect('/blogs');
        })
        .catch(err => {
          console.log(err);
        });
      }
  })
}

/**
 * Blog delete request.
 * @param {Object} req for single blog delete.
 * @param {Object} res 
 */
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
}