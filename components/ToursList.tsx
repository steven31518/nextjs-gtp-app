import type { Prisma } from "@prisma/client";
import TourCard from "./TourCard";

export type tour_props = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  city: string;
  country: string;
  title: string;
  description: string;
  image: string | null;
  stops: Prisma.JsonValue;
};

export default function ToursList({ data }: { data: tour_props[] }) {
  if (data.length === 0) return <div>目前沒有旅遊紀錄</div>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((tour: tour_props) => {
        return <TourCard key={tour.id} tour={tour}></TourCard>;
      })}
    </div>
  );
}
