import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../../redux/authSlice";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
  });

  //for redux
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
  //iske under API call hone vali hai thats why we used async
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EDE5]">
      <Navbar className="bg-[#004643] text-[#F0EDE5]" />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-[#FFFFFF] border border-[#004643] rounded-xl p-6 my-10 shadow-md"
        >
          <h1 className="font-bold text-2xl mb-5 text-[#004643]">Sign Up</h1>

          <div className="my-2">
            <Label className="text-[#004643]">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Your full name"
              className="border border-[#004643] rounded-lg p-2 text-[#004643] placeholder:text-[#004643] my-1"
            />
          </div>

          <div className="my-2">
            <Label className="text-[#004643]">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              className="border border-[#004643] rounded-lg p-2 text-[#004643] placeholder:text-[#004643] my-1"
            />
          </div>

          <div className="my-2">
            <Label className="text-[#004643]">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
              className="border border-[#004643] rounded-lg p-2 text-[#004643] placeholder:text-[#004643] my-1"
            />
          </div>

          <div className="my-2">
            <Label className="text-[#004643]">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password"
              className="border border-[#004643] rounded-lg p-2 text-[#004643] placeholder:text-[#004643] my-1"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-5">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-[#004643]">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-[#004643]">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label className="text-[#004643]">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer border border-[#004643] rounded-lg p-1"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4 bg-[#004643] text-[#F0EDE5] rounded-lg flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#004643] text-[#F0EDE5] hover:bg-[#003333] rounded-lg transition-colors"
            >
              Sign Up
            </Button>
          )}

          <span className="text-sm text-[#004643] mt-2 block text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#004643]/80 hover:text-[#004643] font-semibold"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
