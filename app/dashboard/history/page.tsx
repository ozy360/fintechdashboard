"use client";

import useData from "@/app/components/useData";
import { useState } from "react";
import GridContainer from "@/app/components/gridContainer";
import SectionContainer from "@/app/components/sectionContainer";
import { Text, Select, Button, Loader } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export default function History() {
  const { data, error, dataLoading } = useData();

  const options: string[] = ["All Types", "Sent", "Received", "Exchanged"];
  const [selectedType, setSelectedType] = useState<string | null>(options[0]);

  if (dataLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader color="blue" />
      </div>
    );

  if (error) return (window.location.href = "/");

  return (
    <GridContainer>
      <SectionContainer heading="Transaction History" subheading="">
        <div className="flex mt-6">
          <Button className="mr-2" leftSection={<IconDownload size={14} />}>
            Export
          </Button>
          <Select
            data={options}
            value={selectedType}
            onChange={setSelectedType}
            placeholder="Select type"
          />
        </div>
        <div className="border-gray-200 border-t mt-6">
          {!data?.transactions?.length ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span>No transaction yet...</span>
            </div>
          ) : (
            <>
              {data?.transactions
                ?.map((x, index) => (
                  <div key={index}>
                    <div
                      className={`flex ${
                        index === data?.transactions?.length - 1
                          ? "border-gray-200 border-b"
                          : ""
                      } md:text-md items-center justify-between py-2 text-base`}
                    >
                      <div className="text-left">
                        <p className="font-medium">
                          {x.name + (x.pending ? " (Pending)" : "")}
                        </p>
                        <Text c="dimmed" size="sm">
                          {x.date}
                        </Text>
                      </div>
                      <div className="text-right">
                        <p
                          className={`${
                            x.deposit
                              ? "font-medium text-green-500"
                              : x.pending
                              ? "font-medium text-yellow-500"
                              : "font-medium text-red-500"
                          }`}
                        >
                          {x.deposit
                            ? "+" + x.amount.toFixed(2)
                            : x.pending
                            ? (x.deposit ? "+" : "-") + x.amount.toFixed(2)
                            : "-" + x.amount.toFixed(2)}
                        </p>

                        <Text c="dimmed" size="sm">
                          {x.amount.toFixed(2)} {x.currency}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))
                .reverse()}
            </>
          )}
        </div>
      </SectionContainer>
    </GridContainer>
  );
}
