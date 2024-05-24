import { useContext, useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
 import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, {  } from "react-hot-toast";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
// import { Helmet } from "react-helmet-async";
export function Login() {
  const { signInUser, signInWithGoogle,signInWithGithub ,setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location=useLocation();
  const from =location?.state ||'/';
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(e);
    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        const loggedInUser=result.user;
        console.log(loggedInUser);
        // const user={email}
        axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
          email:result?.user?.email,
        },{
          withCredentials:true,
        })
        e.target.reset();
        toast.success('Login Successfully!');
        setUser(result.user);
        navigate(from);
        // alert("Login Successfully");
        
      })
      .catch((error) => {
        console.error(error);
        toast.error("Wrong Email or Password");
      }
    );
  };
  const handleGoogleSignIn = async() => {
    try{
      const result=await signInWithGoogle()
      console.log(result.user);
      const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
        email:result?.user?.email,
      },{
        withCredentials:true,
      }
    )
      console.log(data);

      // .then((result) => {
      //   console.log(result.user);
        toast.success('Login Successfully!');

        navigate(from);
      }
     
    catch(error)  {
        console.error(error.message);
        toast.error(error?.message);
      };
  };
  const handleGithubSignIn = () => {
    signInWithGithub()
      .then((result) => {
        console.log(result.user);
        axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
          email:result?.user?.email,
        },{
          withCredentials:true,
        })
        
        navigate(from);
        toast.success('Login Successfully!');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <section className="grid text-center  items-center p-8">
      {/* <Helmet
      >
                <title>RoyalStays | Sign In</title>
            </Helmet> */}
      <div>
        <Typography variant="h3"  className="mb-2 font-bold font-['Montserrat']">
          Sign In
        </Typography>
        <Typography className="mb-16  font-normal text-[18px] font-['Montserrat']">
          Enter your email and password to sign in
        </Typography>
        <form
          onSubmit={handleLogin}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium font-['Montserrat'] "
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              required
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 font-['Montserrat']"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium  font-['Montserrat']"
              >
                Password
              </Typography>
            </label>
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
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6 font-['Montserrat']"
            fullWidth
          >
            sign in
          </Button>
          <Button
            onClick={handleGoogleSignIn}
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2 font-['Montserrat'] text-black"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6 "
            />{" "}
            sign in with google
          </Button>
          <Button
          onClick={handleGithubSignIn}
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2 font-['Montserrat'] text-black"
            fullWidth
          >
            <img
              src={`https://cdn-icons-png.flaticon.com/512/25/25231.png`}
              alt="github"
              className="h-6 w-6 "
            />{" "}
            sign in with Github
          </Button>
          <Typography
            variant="small"
            
            className="mt-4 text-center font-normal font-['Montserrat']"
          >
            Not registered?{" "}
            <Link to="/register" className="font-medium  font-['Montserrat']">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      
    </section>
  );
}

export default Login;
