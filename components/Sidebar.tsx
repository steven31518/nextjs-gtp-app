import SidebarHeader from "./SidebarHeader";
import NavLink from "./NavLink";
import MemberProfile from "./MemberProfile";

export default function Sidebar() {
  return (
    <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]">
      {/* first row */}
      <SidebarHeader />
      {/* second row */}
      <NavLink />
      {/* third row */}
      <MemberProfile />
    </div>
  );
}
