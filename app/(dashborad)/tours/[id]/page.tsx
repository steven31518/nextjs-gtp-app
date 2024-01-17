import TourInfo from "@/components/TourInfo";
import { getTourById } from "@/utils/action";
import Image from "next/image";
import { generateTourImage } from "@/utils/action";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
import TourMap from "@/components/TourMap";
import TourDirections from "@/components/TourDirections";
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
  const stopsData = JSON.parse(JSON.stringify(tour.stops)) as string[];
  const ImageData = await Promise.all(
    (tour.stops as string[]).map(async (item) => {
      const { data } = await axios.get(`${url}${item}}`);
      return data?.results[0]?.urls?.raw;
    })
  );

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>
      <TourInfo tour={tour} />

      <TourDirections
        stops={stopsData}
        city={tour.city}
        country={tour.country}
      />
      <div className="collapse collapse-arrow bg-base-100 ">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Stops Map</div>
        <div className="collapse-content">
          <TourMap stops={stopsData} city={tour.city} country={tour.country} />
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Tour Images</div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
            {ImageData.length > 0
              ? ImageData.map((item) => {
                  return (
                    <div key={item}>
                      <Image
                        src={item}
                        width={300}
                        height={300}
                        className="rounded-xl shadow-xl mb-16 object-cover w-full aspect-[3/4]"
                        alt={tour.title}
                        priority
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
