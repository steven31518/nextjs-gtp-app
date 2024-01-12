type props = {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: stopItem[];
};
type stopItem = {
  location: {
    [key: string]: string;
  };
  name: string;
};
console.log();
export default function TourInfo({ tour }: { tour: props }) {
  const { city, country, title, description, stops } = tour;
  return (
    <div>
      <h1 className="text-3xl text-primary">Tour-Information</h1>
      <p>{city}</p>
      <p>{country}</p>
      <p>{title}</p>
      <p>{description}</p>
      <ul>
        {stops.map(({ name, location }, i) => {
          return (
            <ul key={name}>
              <li key={i}>{name}</li>
              <li key={i}>{location.latitude}</li>
              <li key={i}>{location.longitude}</li>
              <li>
                <iframe
                  width={"600"}
                  height={"450"}
                  src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3638.4662045371733!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDEzJzMxLjciTiAxMjDCsDM3JzQxLjciRQ!5e0!3m2!1szh-TW!2stw!4v1700208881655!5m2!1szh-TW!2stw`}
                ></iframe>
              </li>
            </ul>
          );
        })}
      </ul>
    </div>
  );
}

//https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3638.4662045371733!2d$120.6651!3d$24.1509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDEzJzMxLjciTiAxMjDCsDM3JzQxLjciRQ!5e0!3m2!1szh-TW!2stw!4v1700208881655!5m2!1szh-TW!2stw
