import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl shadow-md bg-[#FFFFFF] border border-[#004643] cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div>
        <h1 className="font-medium text-lg text-[#004643]">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-[#004643]/70">India</p>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2 text-[#004643]">{job?.title}</h1>
        <p className="text-sm text-[#004643]/80">{job?.description}</p>
      </div>

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
    </div>
  );
};

export default LatestJobCards;
