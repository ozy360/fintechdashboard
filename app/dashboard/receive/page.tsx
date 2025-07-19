"use client";

import { useState } from "react";
import GridContainer from "@/app/components/gridContainer";
import SectionContainer from "@/app/components/sectionContainer";
import ExchangeMain from "@/app/components/exchange";
import { Card, Text, Button } from "@mantine/core";
import { IconBuildingBank, IconExchange, IconCopy } from "@tabler/icons-react";
import { toast, Toaster } from "sonner";

export default function Receive() {
  const [via, setVia] = useState<number>(1);
  const receiveOptions = [
    {
      id: 1,
      icon: <IconBuildingBank stroke={1.6} />,
      text: "Add via bank transfer",
      subtext: "Fund your account by sending money to your unique NG bank",
    },
    {
      id: 2,
      icon: <IconExchange stroke={1.6} />,
      text: "Add via exchange",
      subtext: "Convert funds from one wallet to another",
    },
  ];

  const details = [
    { label: "Account Holder", value: "Holder's Name" },
    { label: "Account Number", value: "1234567890" },
    { label: "Bank", value: "Bank Name" },
  ];

  function handleRecieve(value: number) {
    if (value === 1) {
      setVia(1);
    }

    if (value === 2) {
      setVia(2);
    }
  }

  function copyText(value: string) {
    if (value) navigator.clipboard.writeText(value);
    toast.success("Copied!");
  }

  return (
    <GridContainer>
      <Toaster position="top-center" richColors />
      <SectionContainer
        heading="Receive Money"
        subheading="Receive funds via bank transfer or exchange"
      >
        <div className="mt-6">
          <div className="grid grid-cols-2 grid-cols-2 gap-x-4">
            {receiveOptions.map((x, index) => (
              <Card
                key={index}
                padding="lg"
                radius="sm"
                withBorder
                className={`!p-4 min-h-[100px] cursor-pointer ${
                  via === x.id
                    ? "!bg-[#e7f5ff] !text-[#339af0] !font-medium !border !border-2 !border-[#339af0]"
                    : ""
                }`}
                onClick={() => handleRecieve(x.id)}
              >
                <Button variant="light" className="!w-max !px-2">
                  {x.icon}
                </Button>
                <div className="mt-4">
                  <Text fw={600} ta="left" size="md">
                    {x.text}
                  </Text>

                  <Text c="dimmed" size="sm">
                    {x.subtext}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
          {via === 1 && (
            <Card
              padding="lg"
              radius="md"
              className="space-y-4 !bg-gray-50 mt-6 "
              withBorder
            >
              {details.map((item) => (
                <div
                  className="flex items-center justify-between"
                  key={item.label}
                >
                  <span className="font-medium">{item.label}:</span>
                  <div className="flex gap-x-4 items-center">
                    <Text c="dimmed">{item.value}</Text>
                    <IconCopy
                      stroke={1.6}
                      size={14}
                      className="cursor-pointer"
                      onClick={() => copyText(item.value)}
                    />
                  </div>
                </div>
              ))}
            </Card>
          )}

          {via === 2 && <ExchangeMain />}
        </div>
      </SectionContainer>
    </GridContainer>
  );
}
