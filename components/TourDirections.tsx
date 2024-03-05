export default function TourDirections({
  stops,
  city,
  country,
}: {
  stops: string[];
  city: string;
  country: string;
}) {
  return (
    <>
      <h2 className="collapse-title text-xl font-medium">路線導覽</h2>
      <iframe
        className="aspect-square w-full mb-2"
        width={"350"}
        height={"350"}
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/directions?origin=${stops[0]}+${country}
          &waypoints=${stops[1]}+${country}
          &destination=${stops[2]}+${country}
          &key=${process.env.GOOGLE_MAP_API_KEY}`}
      ></iframe>
    </>
  );
}
