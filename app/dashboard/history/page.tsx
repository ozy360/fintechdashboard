"use client";

import useData from "@/app/components/useData";
import { useState } from "react";
import GridContainer from "@/app/components/gridContainer";
import SectionContainer from "@/app/components/sectionContainer";
import { Text, Select, Button, Loader } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { CSVLink } from "react-csv";

export default function History() {
  const { data, error, dataLoading } = useData();

  const options: string[] = ["All Types", "Sent", "Received", "Exchanged"];
  const [selectedType, setSelectedType] = useState<string | null>(options[0]);

  const transactions: any = data?.transactions;
  let transact;

  if (selectedType === options[0]) {
    transact = transactions;
  } else if (selectedType === options[1]) {
    transact = transactions.filter((tx: any) => tx.withdraw === true);
  } else if (selectedType === options[2]) {
    transact = transactions.filter((tx: any) => tx.deposit === true);
  } else if (selectedType === options[3]) {
    transact = transactions.filter(
      (tx: any) => tx.deposit === true && tx.withdraw === true
    );
  }

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
          <CSVLink
            filename={`${data?.username}_transaction _history.csv`}
            data={transact}
          >
            <Button className="mr-2" leftSection={<IconDownload size={14} />}>
              Export
            </Button>
          </CSVLink>
          <Select
            data={options}
            value={selectedType}
            onChange={setSelectedType}
            placeholder="Select type"
          />
        </div>
        <div className="border-gray-200 border-t mt-6">
          {!transact.length ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span>No transaction yet...</span>
            </div>
          ) : (
            <>
              {transact
                ?.map((x: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`flex ${
                        index === transact.length - 1
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
