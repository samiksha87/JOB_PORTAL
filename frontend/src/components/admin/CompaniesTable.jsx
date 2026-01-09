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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  //local state for filtered company
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div className="p-5 rounded-xl shadow-md bg-[#FFFFFF]">
      <Table>
        <TableCaption className="text-[#004643] font-semibold">
          A list of your recent registered companies
        </TableCaption>

        <TableHeader>
          <TableRow style={{ backgroundColor: "#004643" }}>
            <TableHead className="text-[#F0EDE5]">Logo</TableHead>
            <TableHead className="text-[#F0EDE5]">Name</TableHead>
            <TableHead className="text-[#F0EDE5]">Date</TableHead>
            <TableHead className="text-right text-[#F0EDE5]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.map((company) => (
            <tr
              key={company._id}
              className="hover:bg-[#F0EDE5] transition-colors"
              style={{ color: "#004643" }}
            >
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
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
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer hover:underline"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
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

export default CompaniesTable;
