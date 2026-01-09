import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-[#F0EDE5]">
      <Navbar className="bg-[#004643] text-[#F0EDE5]" />

      <div className="max-w-xl mx-auto my-10 p-6 bg-[#FFFFFF] rounded-xl shadow-md">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-4">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 border border-[#004643] text-[#004643] font-semibold hover:bg-[#004643] hover:text-[#F0EDE5] transition-colors rounded-lg px-3 py-2"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl text-[#004643]">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#004643]">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="border border-[#004643] rounded-lg p-2 text-[#004643] placeholder:text-[#004643]"
              />
            </div>

            <div>
              <Label className="text-[#004643]">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="border border-[#004643] rounded-lg p-2 text-[#004643] placeholder:text-[#004643]"
              />
            </div>

            <div>
              <Label className="text-[#004643]">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="border border-[#004643] rounded-lg p-2 text-[#004643] placeholder:text-[#004643]"
              />
            </div>

            <div>
              <Label className="text-[#004643]">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="border border-[#004643] rounded-lg p-2 text-[#004643] placeholder:text-[#004643]"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-[#004643]">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="border border-[#004643] rounded-lg p-2"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4 bg-[#004643] text-[#F0EDE5] rounded-lg flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#004643] text-[#F0EDE5] hover:bg-[#003333] rounded-lg transition-colors"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
