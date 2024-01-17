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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {stops.map((stop) => {
          return (
            <iframe
              className="aspect-square w-full"
              key={stop}
              width={"350"}
              height={"350"}
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?q=${stop},${country}+${city}&key=${process.env.GOOGLE_MAP_API_KEY}`}
            ></iframe>
          );
        })}
      </div>
    </>
  );
}
