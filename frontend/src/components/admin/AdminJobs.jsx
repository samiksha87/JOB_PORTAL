import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import CompaniesTable from "./CompaniesTable";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0EDE5" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit border-2"
            style={{
              borderColor: "#004643",
              backgroundColor: "#F0EDE5",
              color: "#004643",
            }}
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            style={{
              backgroundColor: "#004643",
              color: "#F0EDE5",
              fontWeight: "600",
            }}
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Jobs
          </Button>
        </div>

        <div
          className="rounded-xl p-5 shadow-md"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
