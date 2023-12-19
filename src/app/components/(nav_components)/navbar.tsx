'use client';
import { MdHome } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import clsx from "clsx";

const IconTitle = [
  {
    icon: <MdHome style={{ fontSize: "34px", margin: '0.5rem 0.5rem' }} />,
    name: "Home",
    route: "/dashboard"
  },
  {
    icon: <SiSimpleanalytics style={{ fontSize: "24px", margin: '0.5rem 0.5rem' }} />,
    name: "Analytics",
    route: "/Analytics"
  }
];

export default function NavBar() {
  const pathname = "/";
  return (
    <div className={"bg-[#1b373b] h-screen flex flex-col justify-start py-4 items-center"}>
      {IconTitle.map((IconTitle, index) => (
        <div className="flex justify-center items-center gap-2 w-full" key={index.toString()}>
          <a href={IconTitle.route}>
            <div className={clsx("w-full inline-flex justify-center items-center max-h-12 aspect-square", {
              "bg-[#618385]": (pathname === IconTitle.route),
              "text-white": (pathname === IconTitle.route),
              "text-[#a5a6a8]": (pathname !== IconTitle.route),
            })}>
              {IconTitle.icon}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
