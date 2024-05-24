// import { Option, Select } from "@material-tailwind/react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import AllBlog from "./AllBlog";
// import { query } from "firebase/database";
// import { useQuery } from "@tanstack/react-query";
// import Loader from "../../Loader/Loader";
// // import axios from "axios";

// const AllBlogs = () => {
//       const [blogs, setBlogs] = useState([]);
//     const [search, setSearch] = useState('t')
//     const [isSearch, setIsSearch] = useState
//     (false);
//     // const{isPending,data:blogs}=useQuery({
//     //   queryKey:['blogs'],
//     //   queryFn:async()=>{
//     //     const res = await fetch("https://blognest-server.vercel.app/blogs");
//     //     return res.json();
        
//     //   }
//     // })
//     // if(isPending){
//     //   return <Loader/>
//     // }


//     useEffect(() => {
//       (async () => {
//         const res = await fetch("https://blognest-server.vercel.app/blogs");
//         const data = await res.json();
       
//          setBlogs(data);
//         //  getData();
//         // setBlogs(data);
//       })();
//     }, []);
   
//     useEffect(() =>{
//       (async()=>{
//         const result =await axios.get(`https://blognest-server.vercel.app/all_blogs?search=${search}`);
//             const data = await result.data;
//             setBlogs(data);   
//       })();
//     },[search]);


//     //  const{data:blogs}=useQuery({
//     //   queryKey:['blogs'],
//     //   queryFn:async()=>{
//     //     const res = await fetch("https://blognest-server.vercel.app/blogs");
//     //     return res.json();
        
//     //   }
//     // })
    
//     const handleAllFilter=(category)=>{
//       // setLoading(true);
//       // const category = category;
//       console.log("fun",category);
      
//       (async()=>{
//         const res = await fetch(`https://blognest-server.vercel.app/filterblog/${category}`);
//         const data = await res.json();
        
//         setBlogs(data);
//         // setLoading(false)
  
//       })();
//     }
//     const handleSearch = (e) => {
//       e.preventDefault()
//       setSearch(e.target.search.value);
//       setIsSearch(true);
//       console.log("e",e.target.search.value);
//       // const text=e.target.search.value
//       console.log('Search',search);
//       // setSearch(text);
//       console.log(search);

//     }
//     return (
//         <div className="my-12">
//       <h2 className="text-5xl text-center font-extrabold my-12">All Blog</h2>
//       <div className="flex gap-5 justify-center">
//         <form onSubmit={handleSearch}>
//           <h2 className="block  text-blueGray-600 text-lg font-bold ">Search</h2>
//             <div className=' p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300 '>
//               <input
//                 className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
//                 type='text'
//                 name='search'
//                 placeholder='Enter Job Title'
//                 aria-label='Enter Job Title'
//               /> 
//               <button type="submit" className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
//                 Search
//               </button>
//             </div>
//           </form>
//         <div className="">
//           <label
//             className="  block  text-blueGray-600 text-lg font-bold mb-2"
//           >
//             Filter By
//           </label>
//           <Select 
//           value="{filter}"
//           onChange={(e)=>{
//             console.log(e);
//             handleAllFilter(e)
//           }
            
//           }
//           label="Select Filter Option">
//               {/* <Option  value="">filter</Option> */}
//             <Option  value="Health">Health</Option>
//             <Option value="Art">Art</Option>
//             <Option value="Travel">Travel</Option>
//             <Option value="Self-Improvement">Self-Improvement</Option>
//             <Option value="Fashion">Fashion</Option>
//           </Select>
//         </div>
        
        
//         </div>
      
//       <div className="max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//          {
//           blogs.map((blog )=><AllBlog key={blog._id} blog={blog} />)
//         }

//          </div>
//     </div>
//     );
// };

// export default AllBlogs;



import { Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import AllBlog from "./AllBlog";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";

const fetchBlogs = async () => {
  const res = await axios.get("https://blognest-server.vercel.app/blogs");
  return res.data;
};

const fetchBlogsBySearch = async (search) => {
  const res = await axios.get(`https://blognest-server.vercel.app/all_blogs?search=${search}`);
  return res.data;
};

const fetchBlogsByCategory = async (category) => {
  const res = await axios.get(`https://blognest-server.vercel.app/filterblog/${category}`);
  return res.data;
};

const AllBlogs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const queryKey = ['blogs', { search, category }];
  const queryFn = () => {
    if (search) {
      return fetchBlogsBySearch(search);
    } else if (category) {
      return fetchBlogsByCategory(category);
    } else {
      return fetchBlogs();
    }
  };

  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn,
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  const handleFilterChange = (value) => {
    setCategory(value);
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading blogs: {error.message}</div>;

  return (
    <div className="my-12">
      <h2 className="text-5xl text-center font-extrabold my-12">All Blog</h2>
      <div className="flex gap-5 justify-center lg:flex-row flex-col">
        <form onSubmit={handleSearch}>
          <h2 className="block text-blueGray-600 text-lg font-bold">Search</h2>
          <div className='mx-12 lg:mx-0 p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
            <input
              className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
              type='text'
              name='search'
              placeholder='Enter Blog Title'
              aria-label='Enter Blog Title'
            />
            <button type="submit" className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
              Search
            </button>
          </div>
        </form>
        <div className="mx-12 lg:mx-0">
          <label className="block text-blueGray-600 text-lg font-bold mb-2">Filter By</label>
          <Select
            value={category}
            onChange={handleFilterChange}
            label="Select Filter Option">
            <Option value="Health">Health</Option>
            <Option value="Art">Art</Option>
            <Option value="Travel">Travel</Option>
            <Option value="Self-Improvement">Self-Improvement</Option>
            <Option value="Fashion">Fashion</Option>
          </Select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {blogs?.map((blog) => <AllBlog key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default AllBlogs;
