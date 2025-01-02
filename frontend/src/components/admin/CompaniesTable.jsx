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
import { useDarkMode } from "../context/DarkMode";
import Footer from "../shared/Footer";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  // console.log(companies);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  //for real time updation of search
  useEffect(()=>{
    const filteredCompany = companies.length >=0 && companies.filter((company) =>{
      // If searchCompanyByText is empty string then i have to just return true
      if(!searchCompanyByText){
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
       
    });
    setFilterCompany(filteredCompany)
  
  

  }, [companies, searchCompanyByText])

  const {isDarkMode} = useDarkMode()
  return (
   
    <div className="flex flex-col min-h-screen">
    <div className="flex-grow">
    <Table className="w-full max-w-7xl mx-auto mb-4 ">
      <TableCaption>A List Of Your Recent Registered Companies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2 text-left">Logo</TableHead>
          <TableHead className="px-4 py-2 text-left">Company Name</TableHead>
          <TableHead className="px-4 py-2 text-left">Date</TableHead>
          <TableHead className="px-4 py-2 text-left">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterCompany.map((company) => (
          <TableRow key={company._id} className={`border-b-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} transition-colors duration-200`}>
            <TableCell className="px-4 py-2">
              <Avatar className="w-20 h-20 rounded-none">
                <AvatarImage src={company.logo} alt="profile" />
              </Avatar>
            </TableCell>
            <TableCell className="px-4 py-2">{company.name}</TableCell>
            <TableCell className="px-4 py-2">{company.createdAt.split("T")[0]}</TableCell>
            <TableCell className="px-4 py-2">
              <Popover>
                {/* Inside Popover for edit functionality */}
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-24">
                  <div
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
 
  </div>
  <Footer className="mt-auto" />
  </div>


  

  );
};

export default CompaniesTable;
