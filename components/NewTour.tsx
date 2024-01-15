"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
  fetchUserTokenById,
  subtractTokens,
} from "@/utils/action";
import type { destination_req } from "@/utils/action";
import TourInfo from "./TourInfo";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

export default function NewTour() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination: destination_req) => {
      const existingTour = await getExistingTour(destination); //find exist tour

      if (existingTour) return existingTour;

      const currentToken = await fetchUserTokenById(userId as string);
       //check token
      if (currentToken && currentToken < 300) {
        toast.error("You don't have enough token");
        return;
      }
      const newTour = await generateTourResponse(destination); //generate
      if (!newTour) {
        toast.error("No matching city found");
        return null;
      }

      await createNewTour(newTour.tour); //create
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      const newTokens = await subtractTokens(
        userId as string,
        newTour.tokens as number
      );
      toast.success(`Tour generated! You have ${newTokens} tokens left`);
      return newTour.tour;
    },
    //if you put just one function and logic in server action , this will cause timeout exceed limit of 10s (when deloy in vercel), so I put logic in client side and sperate those function.
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
