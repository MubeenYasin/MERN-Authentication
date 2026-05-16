class BlogDetailsDTO {
    constructor(blog){
        this._id = blog._id
        this.authorName = blog.author.name
        this.authorMobile = blog.author.mobile
        this.title = blog.title 
        this.content = blog.content
        this.photoPath = blog.photoPath
        this.createAt = blog.createAt
    }
}

export default BlogDetailsDTO