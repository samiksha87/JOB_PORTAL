import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div className="min-h-screen bg-[#F0EDE5]">
      <Navbar className="bg-[#004643] text-[#F0EDE5]" />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="font-bold text-2xl mb-5 text-[#004643]">
          Applicants {applicants?.applications?.length}
        </h1>

        <div className="p-5 rounded-xl shadow-md bg-[#FFFFFF]">
          <ApplicantsTable
            className="text-[#004643]"
            headerBg="#004643"
            headerText="#F0EDE5"
            rowHoverBg="#F0EDE5"
            popoverBg="#F0EDE5"
            popoverText="#004643"
          />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
