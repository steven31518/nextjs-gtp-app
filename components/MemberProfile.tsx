import { UserButton, auth, currentUser } from "@clerk/nextjs";

export default async function MemberProfile() {
  const user = await currentUser();
  // const { userId } = auth();
  return (
    <div className="px-4 flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <p>{user?.emailAddresses[0].emailAddress}</p>
    </div>
  );
}
