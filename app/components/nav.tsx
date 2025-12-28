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
  IconLogout,
} from "@tabler/icons-react";
import { NavLink } from "@mantine/core";

async function handleLogout() {
  try {
    await fetch("/api/logout");
    window.location.href = "/";
  } catch (error: any) {
    console.log(error.message);
  }
}

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
        <div className="ml-6 hidden lg:inline-block size-12 mb-8 text-[60px]">
          💴
        </div>

        <div className="px-5 py-2 space-y-4 text-black">
          {dashboardLinks.map((link) => (
            <Links
              key={link.path}
              path={link.path}
              svg={link.svg}
              linkname={link.linkname}
            />
          ))}
          <div onClick={handleLogout}>
            <Links
              key={""}
              path={""}
              svg={<IconLogout stroke={1.6} />}
              linkname={"Logout"}
            />
          </div>
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
