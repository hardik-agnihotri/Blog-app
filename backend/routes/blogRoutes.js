import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from "../controllers/blogControllers.js";
import { protect } from "../middleware/auth.js"
import { validate } from "../middleware/validate.js"
import { blogSchema } from "../validators/blogValidator.js";


const router = express.Router();

router.get("/",protect,getAllBlogs);
router.post("/",protect,validate(blogSchema),createBlog);
router.get("/:id", protect, getSingleBlog);
router.put("/:id",protect,updateBlog);
router.delete("/:id",protect,deleteBlog);

export default router