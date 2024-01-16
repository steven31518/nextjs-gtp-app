import TourInfo from "@/components/TourInfo";
import { getTourById } from "@/utils/action";
import Image from "next/image";
import { generateTourImage } from "@/utils/action";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;
export default async function SingleTourPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const tour = await getTourById(id);
  if (!tour) {
    redirect("/tours");
  }
  // const tourImage = await generateTourImage({
  //   city: tour.city,
  //   country: tour.country,
  // });
  const { data } = await axios.get(`${url}${tour.city}`);

  const ImageData = await Promise.all(
    (tour.stops as string[]).map(async (item) => {
      const { data } = await axios.get(`${url}${item}`);
      return data?.results[0]?.urls?.raw;
    })
  );

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>
      <TourInfo tour={tour} />
      <h2 className="text-2xl font-semibold mb-4">Tour Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ImageData.length > 0
          ? ImageData.map((item) => {
              return (
                <div key={item}>
                  <Image
                    src={item}
                    width={300}
                    height={300}
                    className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover aspect-[3/4]"
                    alt={tour.title}
                    priority
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
