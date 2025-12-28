"use client";

import { useRouter } from "next/navigation";
import useData from "../components/useData";
import {
  IconCurrencyNaira,
  IconCurrencyDollar,
  IconCurrencyPound,
  IconCurrencyEuro,
  IconCircleArrowUpRight,
  IconCircleArrowDownRight,
  IconHistory,
  IconExchange,
  IconUserCheck,
  IconCreditCard,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import GridContainer from "../components/gridContainer";
import { Card, Text, Button, Loader } from "@mantine/core";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { data, error, dataLoading } = useData();
  const [hideAmount, setHideAmount] = useState<boolean>(false);
  const transactions: any = data?.transactions;

  if (dataLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader color="blue" />
      </div>
    );

  if (error) return (window.location.href = "/");

  const nairatotal: number =
    data?.transactions?.reduce((x, y) => {
      if (y?.currency === "NGN" && (y?.approved || y?.pending)) {
        return (
          x +
          (y?.deposit ? y.amount || 0 : 0) -
          (y?.withdraw ? y.amount || 0 : 0)
        );
      }
      return x;
    }, 0) || 0;
  const dollartotal: number =
    data?.transactions?.reduce((x, y) => {
      if (y?.currency === "USD" && (y?.approved || y?.pending)) {
        return (
          x +
          (y?.deposit ? y.amount || 0 : 0) -
          (y?.withdraw ? y.amount || 0 : 0)
        );
      }
      return x;
    }, 0) || 0;

  const poundtotal: number =
    data?.transactions?.reduce((x, y) => {
      if (y?.currency === "GBP" && (y?.approved || y?.pending)) {
        return (
          x +
          (y?.deposit ? y.amount || 0 : 0) -
          (y?.withdraw ? y.amount || 0 : 0)
        );
      }
      return x;
    }, 0) || 0;

  const eurototal: number =
    data?.transactions?.reduce((x, y) => {
      if (y?.currency === "EUR" && (y?.approved || y?.pending)) {
        return (
          x +
          (y?.deposit ? y.amount || 0 : 0) -
          (y?.withdraw ? y.amount || 0 : 0)
        );
      }
      return x;
    }, 0) || 0;

  const wallets = [
    {
      color: "teal",
      currency: "NGN",
      symbol: "₦",
      logo: <IconCurrencyNaira stroke={1.6} />,
      amount: Number(nairatotal).toFixed(2) || 0.0,
    },
    {
      color: "orange",
      currency: "USD",
      symbol: "$",
      logo: <IconCurrencyDollar stroke={1.6} />,
      amount: Number(dollartotal).toFixed(2) || 0.0,
    },
    {
      color: "green",
      currency: "GBP",
      symbol: "£",
      logo: <IconCurrencyPound stroke={1.6} />,
      amount: Number(poundtotal).toFixed(2) || 0.0,
    },
    {
      color: "red",
      currency: "EUR",
      symbol: "€",
      logo: <IconCurrencyEuro stroke={1.6} />,
      amount: Number(eurototal).toFixed(2) || 0.0,
    },
  ];

  const actions = [
    {
      icon: <IconCircleArrowUpRight stroke={1.6} />,
      link: "/dashboard/send",
      maintext: "Send Money",
      subtext: "Transfer to another user",
    },
    {
      icon: <IconCircleArrowDownRight stroke={1.6} />,
      link: "/dashboard/receive",
      maintext: "Receive",
      subtext: "Via bank or exchange",
    },
    {
      icon: <IconExchange stroke={1.6} />,
      link: "/dashboard/exchnage",
      maintext: "Exchange",
      subtext: "Convert currencies",
    },
    {
      icon: <IconHistory stroke={1.6} />,
      link: "/dashboard/history",
      maintext: "History",
      subtext: "View all transactions",
    },
    {
      icon: <IconUserCheck stroke={1.6} />,
      link: "/dashboard/kyc",
      maintext: "KYC",
      subtext: "Verify your identity",
    },
    {
      icon: <IconCreditCard stroke={1.6} />,
      link: "/dashboard/",
      maintext: "Cards",
      subtext: "Manage virtual cards",
    },
  ];

  return (
    <GridContainer>
      <div className="mb-8 text-2xl text-black">
        Welcome, {data?.username || null} ✋!
      </div>
      <div className="mb-4 flex justify-between items-center">
        {" "}
        <Text fw={800} ta="left" size="xl" c="black">
          Your wallets
        </Text>
        {hideAmount ? (
          <Button
            justify="center"
            leftSection={<IconEye size={16} />}
            variant="default"
            onClick={() => setHideAmount(false)}
          >
            Show Balance
          </Button>
        ) : (
          <Button
            justify="center"
            leftSection={<IconEyeOff size={16} />}
            variant="default"
            onClick={() => setHideAmount(true)}
          >
            Hide Balance
          </Button>
        )}
      </div>
      <div className="space-y-20">
        <>
          {/* <div className="mb-4 font-medium text-2xl">Your wallets</div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 lg:gap-y-0 md:gap-x-4">
            {wallets.map((x, index) => (
              <Card
                padding="lg"
                radius="md"
                key={index}
                className="gap-y-2 hover:cursor-pointer"
                withBorder
              >
                <div className="flex gap-x-4">
                  <Button
                    color={x.color}
                    variant="light"
                    className="!w-max !px-0 !px-1 !h-0 !h-9"
                  >
                    <span className="text-lg">{x.logo}</span>
                  </Button>
                  <div>
                    <Text c="dimmed" size="sm">
                      {x.currency} wallet
                    </Text>
                    {hideAmount ? (
                      <div className="text-xl font-semibold">******</div>
                    ) : (
                      <div className="text-xl font-semibold">
                        {" "}
                        {x.symbol}
                        {x.amount}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
        <>
          <div className="mb-4">
            <Text fw={800} ta="left" size="xl" c="black">
              Quick action
            </Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-y-4 xl:gap-y-0 md:gap-x-4">
            {actions.map((x, index) => (
              <Card
                padding="lg"
                radius="md"
                key={index}
                className="gap-y-2 hover:cursor-pointer "
                withBorder
                onClick={() => router.push(x.link)}
              >
                <Button
                  variant="light"
                  className="!w-max !px-0 !px-2 !h-0 !h-9"
                >
                  <span>{x.icon}</span>
                </Button>
                <div className="text-lg font-semibold">{x.maintext}</div>

                <Text c="dimmed" size="sm">
                  {x.subtext}{" "}
                </Text>
              </Card>
            ))}
          </div>
        </>
        <>
          <div>
            <div className="mb-4">
              <Text fw={800} ta="left" size="xl" c="black">
                Transactions
              </Text>
            </div>
            <Card
              padding="lg"
              radius="md"
              className="gap-y-2 hover:cursor-pointer"
              withBorder
            >
              <div>
                {transactions
                  ?.map((x: any, index: number) => (
                    <div key={index}>
                      <div
                        className={`flex ${
                          index === transactions?.length - 1
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
              </div>
            </Card>
          </div>
        </>
      </div>
    </GridContainer>
  );
}
