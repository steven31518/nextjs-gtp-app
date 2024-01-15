import { UserProfile, auth } from "@clerk/nextjs";
import { fetchUserTokenById } from "@/utils/action";
import { MdGeneratingTokens } from "react-icons/md";
export default async function ProfilePage() {
  const { userId } = auth();

  const currentToken = await fetchUserTokenById(userId as string);

  return (
    <div>
      <h2 className="mb-8 ml-8 text-xl font-extrabold flex items-center">
        Your Token Amount: {currentToken}
        <MdGeneratingTokens className="text-yellow-300 text-2xl mx-2" />
      </h2>
      <UserProfile />
    </div>
  );
}
