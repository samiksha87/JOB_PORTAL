import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="shadow-md"
      style={{
        backgroundColor: "#004643", // Cyprus
      }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1
            className="text-2xl font-extrabold tracking-wide"
            style={{ color: "#F0EDE5" }} // Sand Dune
          >
            Career<span style={{ color: "#C2C6C1" }}>Connect</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          {/* Menu Links */}
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    style={{ color: "#F0EDE5" }}
                    className="hover:text-[#C2C6C1] transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    style={{ color: "#F0EDE5" }}
                    className="hover:text-[#C2C6C1] transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    style={{ color: "#F0EDE5" }}
                    className="hover:text-[#C2C6C1] transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    style={{ color: "#F0EDE5" }}
                    className="hover:text-[#C2C6C1] transition"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    style={{ color: "#F0EDE5" }}
                    className="hover:text-[#C2C6C1] transition"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Login / Signup Buttons */}
          {!user ? (
            <div className="flex items-center gap-3">
              {/* Login Button */}
              <Link to="/login">
                <Button
                  variant="outline"
                  style={{
                    borderColor: "#F0EDE5",
                    color: "#F0EDE5",
                  }}
                  className="hover:bg-[#C2C6C1] hover:text-[#004643] transition"
                >
                  Login
                </Button>
              </Link>

              {/* Signup Button */}
              <Link to="/signup">
                <Button
                  className="transition"
                  style={{
                    backgroundColor: "#002F2C", // darker Cyprus shade
                    color: "#F0EDE5",
                  }}
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button>
                  <Avatar
                    className="cursor-pointer border-2"
                    style={{ borderColor: "#F0EDE5" }}
                  >
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </button>
              </PopoverTrigger>

              {/* Popover Menu */}
              <PopoverContent
                className="w-80"
                style={{
                  backgroundColor: "#F0EDE5", // Sand Dune
                  borderColor: "#004643", // Cyprus border
                }}
              >
                <div>
                  {/* User Header */}
                  <div className="flex gap-3 mb-3">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#004643" }}
                      >
                        {user?.fullname}
                      </h4>
                      <p className="text-sm" style={{ color: "#002F2C" }}>
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  {/* Popover Links */}
                  <div
                    className="flex flex-col my-2"
                    style={{ color: "#002F2C" }}
                  >
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 style={{ color: "#004643" }} />
                        <Button variant="link">
                          <Link to="/profile" style={{ color: "#004643" }}>
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer mt-1">
                      <LogOut style={{ color: "#004643" }} />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        style={{ color: "#004643" }}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
