import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const createBlog = async (req, res) => {
  const { title, description, image } = req.body;
  const userId = req.userId;
  try {
    const blog = await Blog.create({
      title,
      description,
      image,
      user: userId,
    });

    await User.findByIdAndUpdate(userId, { $push: { blogs: blog._id } });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Blog creation failed" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "username email");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Fetching blogs failed" });
  }
};

export const updateBlog = async (req, res) => {
  const { title, description, image } = req.body;
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (blog.user.toString() != req.userId) {
      return res.status(403).json({
        error: "Unauthorized",
      });
    }

    blog.title = title;
    blog.description = description;
    blog.image = image;

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Updating blog failed" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Blog.findByIdAndDelete(id);
    await User.findByIdAndUpdate(req.userId, { $pull: { blogs: id } });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Deleting blog failed" });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "username");
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};
