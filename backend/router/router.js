import express from "express"
import authController from "../controller/authController.js"
import blogController from "../controller/blogController.js"
import auth from "../middlewares/auth.js"
import commentController from "../controller/commentController.js"
const router = express.Router()

//  AUTH CONTROLLER ROUTS
router.get('/test', (req, res) => res.send("Test Page"))
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', auth, authController.logout)
router.get('/refresh', authController.refresh)

//  BLOG COTROLLER 
//  create blog
router.post('/blog', auth, blogController.create)
//  get all blog
router.get('/blog/all', auth, blogController.getAll)
//  get blog by id
router.get('/blog/:id', auth, blogController.getById)
//  update blog
router.put('/blog', auth, blogController.update)
//  delete blog
router.delete('/blog/:id', auth, blogController.delete)

//      COMMENT CONTROLLER
// create comment
router.post('/comment', auth, commentController.create)
// get comment by id
router.get('/comment/:id', auth, commentController.getById)


export default router