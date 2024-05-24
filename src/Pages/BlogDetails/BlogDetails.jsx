import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/AuthProvider";
import ShowComment from "./ShowComment";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(user);
  const commentOwnerName = user?.displayName;
  const commentOwnerEmail = user?.email;
  const commentOwnerPhotoUrl = user?.photoURL;
  const commentBlogId = id.toString();
  // console.log(commentOwnerPhotoUrl);
  // console.log(commentOwnerEmail);
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const [control, setControl] = useState(false);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://blognest-server.vercel.app/blogdetails/${id}`
      );
      const data = await res.json();
      // console.log(data);
      setBlog(data);
    })();
  }, [id]);

  useEffect(() => {
    if(!control){
      (async () => {
      const res = await fetch(`https://blognest-server.vercel.app/get/comment/${id}`);
      const data = await res.json();
      // console.log(data);
      setComments(data);
      await delay(200);
      setControl(true);
    })();
    }
    
  }, [id,comments,control]);
  const {
    _id,
    title,
    image,
    category,
    description,
    userName,
    userEmail,
    long_description,
  } = blog;
  const handleComment = (event) => {
  setControl(false);
    if(!user){
      Swal.fire({
        title: "Warning!",
        text: "Please Login First!",
        icon: "warning",
      });
      navigate('/login');
      return;
    }
    event.preventDefault();
    const form = event.target;
    const comment = form.comment.value;
    const newComment = {
      comment,
      commentOwnerName,
      commentOwnerEmail,
      commentOwnerPhotoUrl,
      commentBlogId,
    };
    if (blog.userEmail === commentOwnerEmail) {
      Swal.fire({
        title: "Warning!",
        text: "Can't Comment. You are Owner the blog!",
        icon: "warning",
      });
    } else {
      if(comment !== ""){
        fetch("https://blognest-server.vercel.app/addcomments/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newComment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "comment Added Successfully!",
              icon: "success",
            });
            event.target.reset();
          }
        });
      }else{
        Swal.fire({
          // title: "Oops!",
          text: "Please write something!",
          icon: "info",
        });
      }
      
    }
  };
  // console.log(blog);
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Blog Title */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Blog Details
        </h1>
        <h2 className="flex flex-row flex-nowrap items-center my-8">
          <span className="flex-grow block border-t border-black"></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded leading-none font-medium bg-black text-white">
            {category}
          </span>
          <span className="flex-grow block border-t border-black"></span>
        </h2>
        <div className="flex justify-end">
          {
            user&&(userEmail===user?.email)?(<Link
                to={`/updateblog/${_id}`}
                className=" items-center justify-center rounded-xl bg-cyan-600 py-1 px-2 font-dm text-sm font-medium text-white shadow-xl shadow-cyan-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
              >
                Update
              </Link>):("")
          }
          </div>
          
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{title}</h1>
        <p className="text-xl text-gray-500">{description}</p>
      </header>

      {/* Main Image */}

      <div className="relative mb-8">
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Long Description */}
      <article className="prose prose-lg max-w-none prose-indigo">
        <p>{long_description}</p>
      </article>
      <div className="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
        <div className="w-full  ">
          <form
            onSubmit={handleComment}
            className="relative z-10 h-auto p-8  overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl "
          >
            <h3 className="mb-6 text-2xl font-medium text-center">
              Write a comment
            </h3>
            <textarea
              type="text"
              name="comment"
              className="w-full px-4 py-3 mb-4  border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Write your comment"
              rows="3"
              cols="33"
            ></textarea>
            <input
              type="submit"
              value="Submit comment"
              name="submit"
              className=" text-white px-4 py-3 bg-blue-500  rounded-lg"
              // disabled={!user}
             
            />
          </form>
        </div>
      </div>

      <div>
        {comments.map((comnt) => (
          <ShowComment key={comnt._id} comnt={comnt} />
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
