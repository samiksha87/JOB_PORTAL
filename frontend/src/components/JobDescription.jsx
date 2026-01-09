import { Badge } from "./ui/badge";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useState } from "react";

function JobDescription() {
  //   const isApplied = true; // This would typically come from props or state
  //to get the id of job
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log(res.data);
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  //   useGetSingleJob(jobId); //custom hook to fetch single job
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);
  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-[#F0EDE5] rounded-xl">
      {/* Header: Title + Badges + Apply button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-[#004643]">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge
              className="text-[#004643] font-bold border border-[#004643]"
              variant="ghost"
            >
              {singleJob?.postion} Positions
            </Badge>
            <Badge
              className="text-[#004643] font-bold border border-[#004643]"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="text-[#004643] font-bold border border-[#004643]"
              variant="ghost"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-[#F0EDE5] ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#004643] hover:bg-[#003333]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description Section */}
      <h1 className="border-b-2 border-[#004643]/50 font-medium py-4 text-[#004643]">
        Job Description
      </h1>

      <div className="my-4 space-y-2 text-[#004643]">
        <h1 className="font-bold">
          Role: <span className="pl-4 font-normal">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold">
          Location:{" "}
          <span className="pl-4 font-normal">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold">
          Description:{" "}
          <span className="pl-4 font-normal">{singleJob?.description}</span>
        </h1>
        <h1 className="font-bold">
          Experience:{" "}
          <span className="pl-4 font-normal">{singleJob?.experience} yrs</span>
        </h1>
        <h1 className="font-bold">
          Salary:{" "}
          <span className="pl-4 font-normal">{singleJob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold">
          Total Applicants:{" "}
          <span className="pl-4 font-normal">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold">
          Posted Date:{" "}
          <span className="pl-4 font-normal">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
