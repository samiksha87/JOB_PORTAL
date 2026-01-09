import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div className="min-h-screen bg-[#F0EDE5]">
      <Navbar className="bg-[#004643] text-[#F0EDE5]" />

      <div className="max-w-6xl mx-auto my-10 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between my-5 gap-4">
          <Input
            className="w-full md:w-1/3 border border-[#004643] text-[#004643] placeholder:text-[#004643] rounded-lg p-2"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-[#004643] text-[#F0EDE5] hover:bg-[#003333] transition-colors rounded-lg px-4 py-2"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>

        <div className="p-5 rounded-xl shadow-md bg-[#FFFFFF]">
          <CompaniesTable
            headerBg="#004643"
            headerText="#F0EDE5"
            rowHoverBg="#F0EDE5"
            textColor="#004643"
            popoverBg="#F0EDE5"
            popoverText="#004643"
          />
        </div>
      </div>
    </div>
  );
};

export default Companies;
