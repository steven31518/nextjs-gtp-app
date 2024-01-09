import Link from "next/link";
const links = [
  { href: "/chat", label: "chat" },
  { href: "/tours", label: "tours" },
  { href: "/profile", label: "profile" },
];

export default function NavLink() {
  return (
    <ul className="menu text-base-content">
      {links.map(({ href, label }) => {
        return (
          <li key={`${href}`}>
            <Link href={href} className="capitalize">
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
