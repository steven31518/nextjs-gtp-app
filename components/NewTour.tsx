"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
} from "@/utils/action";
import type { destination_req } from "@/utils/action";
import TourInfo from "./TourInfo";
import toast from "react-hot-toast";

export default function NewTour() {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination: destination_req) => {
      const existingTour = await getExistingTour(destination);
      
      console.log(existingTour);

      if (existingTour) return existingTour;

      const newTour = await generateTourResponse(destination); //generate
      if (newTour) {
        await createNewTour(newTour); //create
        queryClient.invalidateQueries({ queryKey: ["tours"] });
        return newTour;
      }
      toast.error("No matching city found");
      return null;
    },
  });
  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination as destination_req);
  }

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }
  return (
    <>
      <form onSubmit={handelSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="city"
            name="city"
            required
          />
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="country"
            name="country"
            required
          />
          <button className="btn btn-secondary join-item" type="submit">
            generate tour
          </button>
        </div>
      </form>
      <div>
        <div className="mt-16">{tour && <TourInfo tour={tour} />}</div>
      </div>
    </>
  );
}
