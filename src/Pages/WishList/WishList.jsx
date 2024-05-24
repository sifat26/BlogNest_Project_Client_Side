import { Option, Select } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/AuthProvider";
import Loader from "../../Loader/Loader";
import SingleWishList from "./SingleWishList";

const WishList = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isRun, setIsRun] = useState(true);
  const [control, setControl] = useState(false);
  const [wishBlog, setWishBlog] = useState([]);
 
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  useEffect(() => {
    console.log("Running",isRun);
    if (isRun) {
      (async () => {
        const res = await fetch(
          `https://blognest-server.vercel.app/wishBlog/${user?.email}`,{credentials:"include"}, 
        );
        const data = await res.json();
        setLoading(false);
        setWishBlog(data);
        await delay(2000);
          setIsRun(false)
        
        // console.log("Etai amar", data);
      })(); 
    }
    
  }, [user, control, wishBlog]);
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("My id",_id);
        fetch(`https://blognest-server.vercel.app/wishBlog/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount > 0) {
              setControl(!control);
              Swal.fire({
                title: "Deleted!",
                text: "Your Product has been deleted.",
                icon: "success",
              });
              setIsRun(true)
            }
          });
      }
    });
  };
  const handleAllFilter = (category) => {
    // setLoading(true);
    //const category = category;
    // console.log("funwish", category);

    (async () => {
      const res = await fetch(
        `https://blognest-server.vercel.app/filterwish/${category}/${user?.email}`,{credentials:"include"}
      );
      const data = await res.json();

      setWishBlog(data);
      // console.log("Filter kora", data);
      // console.log("setwishblog", wishBlog);
      // setLoading(false);
    })();
  };


  return (
    <div className="my-12 lg:mx-32 md:mx-14 ">
      <h2 className="text-5xl text-center font-extrabold my-12">Wish List </h2>
      <div className="">
        <label className="  block  text-blueGray-600 text-lg font-bold mb-2">
          Filter By
        </label>
        <Select
          value="{filter}"
          onChange={(e) => {
            handleAllFilter(e);
          }}
          label="Select Filter Option"
        >
          {/* <Option  value="">filter</Option> */}
          <Option value="Health">Health</Option>
          <Option value="Art">Art</Option>
          <Option value="Travel">Travel</Option>
          <Option value="Self-Improvement">Self-Improvement</Option>
          <Option value="Fashion">Fashion</Option>
        </Select>
      </div>
      <div className="max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {loading ? (
          <Loader />
        ) : (
          wishBlog.map((wishBlog) => (
            <SingleWishList
              key={wishBlog._id}
              wishBlog={wishBlog}
              // handleDelete={()=>handleDelete(wishBlog._id)}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WishList;
