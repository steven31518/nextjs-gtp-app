"use client";

export default function TourMap({
  stops,
  city,
  country,
}: {
  stops: string[];
  city: string;
  country: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stops.map((stop) => {
        return (
          <iframe
            key={stop}
            width="450"
            height="250"
            src={`https://www.google.com/maps/embed/v1/place
            ?key=${process.env.GOOGLE_MAP_API_KEY}
            &q=${stop},${city}+${country}`}
          ></iframe>
        );
      })}
    </div>
  );
}
