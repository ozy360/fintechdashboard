"use client";

import { usePathname } from "next/navigation";
import {
  IconLayoutGrid,
  IconCircleArrowUpRight,
  IconCircleArrowDownRight,
  IconHistory,
  IconExchange,
  IconUserCheck,
  IconSettings,
} from "@tabler/icons-react";
import { NavLink } from "@mantine/core";
import Image from "next/image";

const Nav = () => {
  const dashboardLinks = [
    {
      path: "/dashboard",
      svg: <IconLayoutGrid stroke={1.6} />,
      linkname: "Dashboard",
    },
    {
      path: "/dashboard/send",
      svg: <IconCircleArrowUpRight stroke={1.6} />,
      linkname: "Send Money",
    },
    {
      path: "/dashboard/receive",
      svg: <IconCircleArrowDownRight stroke={1.6} />,
      linkname: "Receive Money",
    },
    {
      path: "/dashboard/history",
      svg: <IconHistory stroke={1.6} />,
      linkname: "Transaction History",
    },
    {
      path: "/dashboard/exchange",
      svg: <IconExchange stroke={1.6} />,
      linkname: "Exchange",
    },
    {
      path: "/dashboard/kyc",
      svg: <IconUserCheck stroke={1.6} />,
      linkname: "KYC",
    },
    {
      path: "/dashboard/settings",
      svg: <IconSettings stroke={1.6} />,
      linkname: "Settings",
    },
  ];
  return (
    <>
      <nav className="relative">
        <div className="ml-6 hidden lg:inline-block size-12 mb-4">
          <Image src={"/logo.png"} width={100} height={100} alt="logo" />
        </div>

        <div className="px-5 py-2 space-y-4">
          {dashboardLinks.map((link) => (
            <Links
              key={link.path}
              path={link.path}
              svg={link.svg}
              linkname={link.linkname}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

export default Nav;

function Links({
  path,
  svg,
  linkname,
}: {
  path: string;
  svg: React.ReactNode;
  linkname: string;
}) {
  const route = usePathname();
  return (
    <>
      <NavLink
        href={path}
        label={linkname}
        leftSection={svg}
        active={route === path}
      />
    </>
  );
}
