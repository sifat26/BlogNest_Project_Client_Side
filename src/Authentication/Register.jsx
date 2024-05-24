import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
// import { Helmet } from "react-helmet-async";

export function Register() {
  const [error, setError] = useState("");
  const { createUser, updatedUser,user,setUser } = useContext(AuthContext);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const handleRegister = (e) => {
    // updatedUser(userName,photoURL);
    e.preventDefault();
    const userName = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain Uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain Lowercase letter");
      return;
    }

    // console.log(e);
    console.log(email, password, userName);
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
          email:result?.user?.email,
        },{
          withCredentials:true,
        })
        toast.success("Successfully Sign Up");
        navigate(from);
        updatedUser(userName, photoURL)
          .then(() => {
            setUser({...result?.user,displayName:userName,photoURL: photoURL})
            console.log("Updated");
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex justify-center mt-4">
      {/* <Helmet>
        <title>RoyalStays | Sign Up</title>
      </Helmet> */}
      <div className="relative flex flex-col bg-transparent shadow-none rounded-xl bg-clip-border">
        <div className="text-center ">
          <h4 className="block font-['Montserrat'] text-3xl antialiased font-bold leading-snug tracking-normal  mb-4">
            Sign Up
          </h4>
          <p className="block mt-1 font-['Montserrat'] text-base antialiased font-normal leading-relaxed ">
            Nice to meet you! Enter your details to register.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
        >
          <div className="flex flex-col gap-6 mb-1">
            <h6 className="block -mb-3 font-['Montserrat'] text-base antialiased font-semibold leading-relaxed tracking-normal ">
              Your Name
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                placeholder="Tanvir Ahmmed Sifat"
                name="name"
                type="text"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-['Montserrat'] text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
            </div>
            <h6 className="block -mb-3 font-['Montserrat'] text-base antialiased font-semibold leading-relaxed tracking-normal ">
              Your Email
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="email"
                name="email"
                required
                placeholder="name@mail.com"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-['Montserrat'] text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
            </div>
            <h6 className="block -mb-3 font-['Montserrat'] text-base antialiased font-semibold leading-relaxed tracking-normal ">
              Your Photo URL
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="photoURL"
                placeholder="photo.com"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-['Montserrat'] text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
            </div>
            <h6 className="block -mb-3 font-['Montserrat'] text-base antialiased font-semibold leading-relaxed tracking-normal ">
              Password
            </h6>
            <div className="mb-6">
              <Input
                size="lg"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                name="password"
                required
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisibility}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
            </div>
          </div>
          
          <p className="text-red-700">
            <small>{error ? error : ""}</small>
          </p>
          <button
            className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-['Montserrat'] text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            sign up
          </button>
          <p className="block mt-4 font-['Montserrat'] text-base antialiased font-normal leading-relaxed text-center text-gray-700">
            Already have an account?
            <Link to="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
