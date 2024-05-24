import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RecentBlog from "./RecentBlog";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://blognest-server.vercel.app/blogs");
      const data = await res.json();
      // const filteredData = data.filter((item, index) => index < 6);
      const filteredData = data.slice(-6).reverse();
      // console.log("data",filteredData);
      setBlogs(filteredData);
      // setBlogs(data);
    })();
  }, []);
  return (
    <div className="my-12">
      <h2 className="text-5xl text-center font-extrabold my-12">
      <motion.h2
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Recent Blog
    </motion.h2>
      </h2>
      <div className="max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {blogs.map((blog) => (
          <RecentBlog key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
