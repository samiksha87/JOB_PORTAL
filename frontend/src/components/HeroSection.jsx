import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div
      className="text-center w-full py-20"
      style={{
        backgroundColor: "#F0EDE5", // Sand Dune – main background
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Badge */}
        <span
          className="mx-auto px-5 py-2 rounded-full font-medium shadow-sm"
          style={{
            backgroundColor: "#004643", // Cyprus
            color: "#F0EDE5",
          }}
        >
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1
          className="text-5xl font-extrabold leading-tight"
          style={{ color: "#004643" }} // Primary dark color
        >
          Search, Apply & <br />
          Get Your <span style={{ color: "#007C74" }}>Dream Job</span>
        </h1>

        {/* Subtext */}
        <p
          className="max-w-xl mx-auto text-lg"
          style={{ color: "#002F2C" }} // subtle secondary dark
        >
          Explore thousands of job openings and move one step closer to the
          career you dream of.
        </p>

        {/* Search Bar */}
        <div
          className="flex w-[45%] mx-auto px-4 py-3 rounded-full items-center gap-3 shadow-xl"
          style={{
            backgroundColor: "#FFF",
            border: "2px solid #004643", // subtle border matching Cyprus
          }}
        >
          <input
            type="text"
            placeholder="Find your dream job..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-lg"
            style={{
              color: "#002F2C",
              background: "transparent",
            }}
          />

          <Button
            onClick={searchJobHandler}
            className="rounded-full px-5 py-2 text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #004643, #002F2C)",
            }}
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
