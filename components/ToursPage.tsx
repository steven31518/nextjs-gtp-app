"use client";
import { useState } from "react";
import { getAllTours } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";

import ToursList from "./ToursList";

export default function ToursPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["tours", searchValue],
    queryFn: () => getAllTours(searchValue),
  });
  return (
    <>
      <h1 className="mb-4">您的旅遊紀錄</h1>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="enter city or country here..."
            className="input input-bordered join-item w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            className="btn btn-secondary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "please wait..." : "Reset"}
          </button>
        </div>
      </form>
      {isPending && <span className="loading"></span>}
      {isSuccess && <ToursList data={data} />}
    </>
  );
}
