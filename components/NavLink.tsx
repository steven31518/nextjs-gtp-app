import Link from "next/link";
const links = [
  { href: "/chat", label: "助手諮詢" },
  { href: "/tours", label: "旅行紀錄" },
  { href: "/tours/new-tour", label: "新的旅程" },
  { href: "/profile", label: "個人檔案" },
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
