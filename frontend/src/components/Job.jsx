import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Job({ job }) {
  const navigate = useNavigate();
  // const jobId = "lsekdhjgdsnfvsdkjf";
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-xl shadow-md bg-[#FFFFFF] border border-[#004643]">
      {/* Top row: posted date & bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#004643]/70">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full border-[#004643] text-[#004643] hover:bg-[#004643]/10"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-3 my-3">
        <Button className="p-1" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo || "/default-logo.png"} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg text-[#004643]">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-[#004643]/70">India</p>
        </div>
      </div>

      {/* Job title and description */}
      <div>
        <h1 className="font-bold text-lg my-2 text-[#004643]">{job?.title}</h1>
        <p className="text-sm text-[#004643]/80">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-[#004643] font-bold border border-[#004643]"
          variant="ghost"
        >
          {job?.position}
        </Badge>
        <Badge
          className="text-[#004643] font-bold border border-[#004643]"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-[#004643] font-bold border border-[#004643]"
          variant="ghost"
        >
          {job?.salary}
        </Badge>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="border-[#004643] text-[#004643] hover:bg-[#004643]/10"
        >
          Details
        </Button>
        <Button className="bg-[#004643] text-[#F0EDE5] hover:bg-[#003333]">
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
