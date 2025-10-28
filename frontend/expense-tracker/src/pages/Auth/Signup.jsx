import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
// import uploadImage from "../../Utils/uploadImage";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  // const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (!fullName) throw new Error("Please enter your name");
      if (!validateEmail(email)) throw new Error("Enter a valid email");
      if (!password) throw new Error("Please enter a password");

      setError("");
      // let profileImageUrl = "";

      // if (profilePic) {
      //   const imgUploadRes = await uploadImage(profilePic);
      //   profileImageUrl = imgUploadRes.imageUrl;
      // }

      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        // profileImageUrl,
      });

      const { token, user } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Signup failed.";
      setError(message);
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto mt-10 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-1 mb-6'>
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>
          {/* <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> */}
          <div >
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label='Full Name'
              placeholder='Enter your full name'
              type='text'
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email Address'
              placeholder='abc@example.com'
              type='text'
            />
            <div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label='Password'
                placeholder='Minimum 8 characters'
                type='password'
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
