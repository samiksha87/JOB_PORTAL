import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const skills = ["Html", "Css", "Javascript", "Reactjs"];
const isResume = true;

const Profile = () => {
  // useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="bg-[#F0EDE5] min-h-screen">
      <Navbar className="bg-[#004643] text-[#F0EDE5]" />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-[#FFFFFF] border border-[#004643] rounded-2xl my-5 p-8 shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-[#004643]">
              <AvatarImage
                src={
                  user?.profile?.avatar ||
                  "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl text-[#004643]">
                {user?.fullname}
              </h1>
              <p className="text-[#004643]/80">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="text-[#004643] border border-[#004643] hover:bg-[#004643]/10"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5 text-[#004643]">
          <div className="flex items-center gap-3 my-2">
            <Mail className="text-[#004643]" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="text-[#004643]" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h1 className="font-bold text-[#004643] mb-2">Skills</h1>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="text-[#004643] border border-[#004643] bg-[#F0EDE5]"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-[#004643]/70">NA</span>
            )}
            {skills?.length > 0 &&
              skills.map((item, index) => (
                <Badge
                  key={index}
                  className="text-[#004643] border border-[#004643] bg-[#F0EDE5]"
                >
                  {item}
                </Badge>
              ))}
          </div>
        </div>

        {/* Resume */}
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <Label className="text-md font-bold text-[#004643]">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-[#004643] hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-[#004643]/70">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-[#FFFFFF] border border-[#004643] rounded-2xl p-5 shadow-md my-5">
        <h1 className="font-bold text-lg text-[#004643] mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
