import TourInfo from "@/components/TourInfo";
import { getTourById } from "@/utils/action";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SingleTourPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const tour = await getTourById(id);
  if (!tour) {
    redirect("/tours");
  }

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>

      <TourInfo tour={tour} />
    </div>
  );
}
