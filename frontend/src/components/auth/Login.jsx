import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
    <div style={{ backgroundColor: "#F0EDE5", minHeight: "100vh" }}>
      <Navbar />

      {/* Center Wrapper */}
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 p-8 my-12 rounded-xl shadow-lg"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #C2C6C1",
          }}
        >
          <h1
            className="font-extrabold text-3xl mb-6 text-center"
            style={{ color: "#004643" }}
          >
            Log In
          </h1>

          {/* Email */}
          <div className="my-4">
            <Label style={{ color: "#004643", fontWeight: "600" }}>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              style={{
                border: "2px solid #C2C6C1",
                backgroundColor: "#F0EDE5",
                color: "#004643",
              }}
            />
          </div>

          {/* Password */}
          <div className="my-4">
            <Label style={{ color: "#004643", fontWeight: "600" }}>
              Password
            </Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password"
              style={{
                border: "2px solid #C2C6C1",
                backgroundColor: "#F0EDE5",
                color: "#004643",
              }}
            />
          </div>

          {/* Role Selection */}
          <div className="mt-5 mb-3">
            <RadioGroup className="flex items-center gap-6">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  style={{ accentColor: "#004643" }}
                />
                <span style={{ color: "#004643" }}>Student</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  style={{ accentColor: "#004643" }}
                />
                <span style={{ color: "#004643" }}>Recruiter</span>
              </label>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              className="w-full my-5 flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#004643",
                color: "#F0EDE5",
              }}
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-5"
              style={{
                backgroundColor: "#004643",
                color: "#F0EDE5",
              }}
            >
              Log In
            </Button>
          )}

          {/* Link */}
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#004643", fontWeight: "600" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
