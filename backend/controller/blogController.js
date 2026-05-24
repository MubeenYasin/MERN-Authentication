import Blog from "../models/blog.js"
import Comment from "../models/comment.js";
import BlogDetailsDTO from "../dto/BlogDetailsDTO.js"
import Joi from "joi"
import UserDto from "../dto/userDto.js";
import fs from "fs"
import config from "../config/config.js"
import BlogDTO from "../dto/blogDto.js";
import { title } from "process";

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
    //  CREATE BLOG CONTROLLER
    async create(req, res, next) {
        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            content: Joi.string().required(),
            // client side -> base64 encoded strig -> decode -> store -> save photo's path in db
            photo: Joi.string().allow()
        })
        const { error } = createBlogSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        const { title, author, content, photo } = req.body;
        // / PHOTO HANDLER
        // read as buffer
        // const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'base64') ; 

        // const buffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        let buffer;
        try {
            // پہلے چیک کریں کہ کیا تصویر میں بیس64 کا ہیڈر موجود ہے
            const base64Data = photo.includes(",") ? photo.split(",")[1] : photo;
            buffer = Buffer.from(base64Data, 'base64');
        } catch (err) {
            return next(new Error("تصویر کو بائنری میں تبدیل کرنے میں مسئلہ ہوا ہے۔"));
        }

        // allote a random name
        const imageName = `${Date.now()}-${author}.png`
        // save locally
        try {
            fs.writeFileSync(`storage/${imageName}`, buffer)
        } catch (error) {
            return next(error)
        }
        //save blog db
        let newBlog
        try {
            newBlog = new Blog({
                title,
                author,
                content,
                photoPath: `${config.BACKEND_SERVER_PATH}/storage/${imageName}`
            })
            await newBlog.save()
        } catch (error) { return next(error) }

        const blogDto = new BlogDTO(newBlog)
        return res.status(201).json({ blog: blogDto })
    },
    //  GET ALL BLOGS CONTROLLER
    async getAll(req, res, next) {
        try {
            const blogs = await Blog.find({})

            const blogsDto = []

            for (let i = 0; i < blogs.length; i++) {
                const dto = new BlogDTO(blogs[i]);
                blogsDto.push(dto)
            }
            return res.status(200).json({ blogs: blogsDto })

        } catch (error) { return next(error) }

    },
    // GET BLOG BY ID CONTROLLER
    async getById(req, res, next) {
        // validate id
        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        })
        const { error } = getByIdSchema.validate(req.params)
        if (error) {
            return next(error)
        }

        let blog;
        const { id } = req.params
        try {
            blog = await Blog.findOne({ _id: id }).populate('author');
        } catch (error) { return next(error) }
        // send response
        const blogDto = new BlogDetailsDTO(blog)
        return res.status(200).json({ blog: blogDto })

    },
    //  UPDATE BLOG CONTROLLER
    async update(req, res, next) {
        // validation
        const updateBlogSchema = Joi.object({
            title: Joi.string(),
            content: Joi.string(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blogId: Joi.string().regex(mongodbIdPattern).required(),
            photo: Joi.string()
        })
        const { error } = updateBlogSchema.validate(req.body)
        const { title, content, author, blogId, photo } = req.body
        // delete previous photo
        //save new photo
        let blog
        try {
            blog = await Blog.findOne({ _id: blogId });
        } catch (error) { return next(error) }
        if (photo) {
            let xPhoto = blog.photoPath
            xPhoto = xPhoto.split('/').at(-1);
            // delete xphoto
            try {
                fs.unlinkSync(`storage/${xPhoto}`);
                console.log('old photo deleted')
            } catch (error) { console.log("file not found") }
            // read as buffer
            const buffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            // allote a random name
            const imageName = `${Date.now()}-${author}.png`
            // save locally
            try {
                fs.writeFileSync(`storage/${imageName}`, buffer)
            }
            catch (error) {
                return next(error)
            }
            await Blog.updateOne({ _id: blogId },
                { title, content, photoPath: `${config.BACKEND_SERVER_PATH}/storage/${imageName}` }
            )
        }
        else {
            await Blog.updateOne({ _id: blogId }, { title, content })
        }
        return res.status(200).json({ message: 'Blog updated' })
    },
    // DELTE BLOG CONTROLLER
    async delete(req, res, next) {
        // validate id
        const deleteBlogSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        })
        const { error } = deleteBlogSchema.validate(req.params)
        if (error) {
            return next(error)
        }
        const { id } = req.params
        // delete blog
        // delete comments
        try {
            await Blog.deleteOne({ _id: id })
            await Comment.deleteMany({ blog: id })

            return res.status(200).json({ message: 'blog deleted' })
        } catch (error) { return next(error) }

    },

}

export default blogController;