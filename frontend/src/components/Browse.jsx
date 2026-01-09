import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

// const { allJobs } = [1, 2, 3];

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="min-h-screen bg-[#F0EDE5]">
      <Navbar className="bg-[#004643] text-[#F0EDE5]" />

      <div className="max-w-7xl mx-auto my-10 p-4">
        <h1 className="font-bold text-2xl mb-8 text-[#004643]">
          Search Results ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? (
          <p className="text-[#004643]/70 text-center text-lg">
            No jobs found matching your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job
                key={job._id}
                job={job}
                className="bg-[#FFFFFF] border border-[#004643] rounded-xl shadow-md p-4"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
