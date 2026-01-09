import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("called");
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div
      className="p-5 rounded-xl shadow-md"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Table>
        <TableCaption className="text-[#004643] font-semibold">
          A list of your recent posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow style={{ backgroundColor: "#004643" }}>
            <TableHead className="text-[#F0EDE5]">Company Name</TableHead>
            <TableHead className="text-[#F0EDE5]">Role</TableHead>
            <TableHead className="text-[#F0EDE5]">Date</TableHead>
            <TableHead className="text-right text-[#F0EDE5]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.map((job) => (
            <tr
              key={job._id}
              className="hover:bg-[#F0EDE5] transition-colors"
              style={{ color: "#004643" }}
            >
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>

              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal style={{ color: "#004643" }} />
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-32 rounded-md shadow-md"
                    style={{ backgroundColor: "#F0EDE5", color: "#004643" }}
                  >
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer hover:underline"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>

                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2 hover:underline"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
