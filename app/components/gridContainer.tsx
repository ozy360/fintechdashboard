"use client";

import React from "react";
import MobileLayout from "./mobileLayout";
import Nav from "./nav";
import { Loader } from "@mantine/core";

export default function GridContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  <div className="flex flex-col items-center justify-center min-h-screen">
    <Loader size={30} />
  </div>;

  return (
    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-5 lg:overflow-hidden">
      <MobileLayout />

      {/* Sidebar Navigation */}
      <div className="col-span-1 border-r border-[#dee2e6] bg-gray-50 hidden pt-10 lg:inline-block">
        <Nav />
      </div>

      {/* Main Content */}
      <div className="col-span-1 block min-h-screen overflow-y-auto lg:col-span-4 lg:min-h-0">
        <div className="my-20 px-5 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
