import Link from "next/link";
import type { tour_props } from "./ToursList";
import { MdTravelExplore } from "react-icons/md";

export default function TourCard({ tour }: { tour: tour_props }) {
  const { id, city, country, title, description, image, stops } = tour;
  return (
    <Link
      href={`/tours/${id}`}
      className="card card-compact rounded-xl bg-base-100"
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center">
          <MdTravelExplore /> {city}, {country}
        </h2>
        <small className="card-side">{title}</small>
      </div>
    </Link>
  );
}
