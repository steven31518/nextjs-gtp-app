type props = {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
};
console.log();
export default function TourInfo({ tour }: { tour: props }) {
  const { city, country, title, description, stops } = tour;
  return (
    <>
      <h1 className="text-3xl text-primary">Tour-Information</h1>
      <p>{city}</p>
      <p>{country}</p>
      <p>{title}</p>
      <p>{description}</p>
      <ul>
        {stops.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </ul>
    </>
  );
}
