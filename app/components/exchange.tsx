"use client";

import { usePathname, useRouter } from "next/navigation";
import { Select, Button, NumberInput, Text, Card, Loader } from "@mantine/core";
import { IconExchange } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import useData from "./useData";
import { toast, Toaster } from "sonner";

export default function ExchangeMain() {
  const route = useRouter();
  const pathname = usePathname();
  const [currData, setCurrData] = useState<any>();
  const [amount, setAmount] = useState<number>();
  const { data, error, dataLoading } = useData();

  useEffect(() => {
    const fetchData = async () => {
      const storedData = sessionStorage.getItem("currencyData");
      if (storedData && storedData !== "undefined") {
        try {
          setCurrData(JSON.parse(storedData));
          return;
        } catch (error) {
          console.error("Error parsing stored currency data:", error);
          sessionStorage.removeItem("currencyData");
        }
      } else if (storedData === "undefined") {
        // The stored data is "undefined", which is invalid. Remove it.
        sessionStorage.removeItem("currencyData");
      }

      try {
        const res = await fetch(`/api/currency`, {
          method: "GET",
        });
        if (res.ok) {
          const cdata = await res.json();
          setCurrData(cdata.quotes);
          if (cdata.quotes) {
            // Store data in sessionStorage
            sessionStorage.setItem(
              "currencyData",
              JSON.stringify(cdata.quotes)
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

  const currencyData = [
    {
      currency: "NGN",
      symbol: "₦",
      amount: Number(nairatotal).toFixed(2) || 0.0,
      rate: currData?.USDNGN,
    },
    {
      currency: "USD",
      symbol: "$",
      amount: Number(dollartotal).toFixed(2) || 0.0,
      rate: 1,
    },
    {
      currency: "GBP",
      symbol: "£",
      amount: Number(poundtotal).toFixed(2) || 0.0,
      rate: currData?.USDGBP,
    },
    {
      currency: "EUR",
      symbol: "€",
      amount: Number(eurototal).toFixed(2) || 0.0,
      rate: currData?.USDEUR,
    },
  ];

  const currencyOptions = currencyData.map((item) => ({
    symbol: item.symbol,
    value: item.currency,
    label: `${item.currency} - ${item.symbol}${item.amount}`,
  }));

  const [from, setFrom] = useState(currencyData[1].currency);
  const [to, setTo] = useState(currencyData[0].currency);

  // Filter out the selected "to" currency in "from" options
  const fromOptions = currencyOptions.filter((opt) => opt.value !== to);

  // Filter out the selected "from" currency in "to" options
  const toOptions = currencyOptions.filter((opt) => opt.value !== from);

  const fromIcon = currencyData.find((opt) => opt.currency === from)?.symbol;
  const toIcon = currencyData.find((opt) => opt.currency === to)?.symbol;

  const fromCurrency = currencyData.find(
    (opt) => opt.currency === from
  )?.currency;

  const toCurrency = currencyData.find((opt) => opt.currency === to)?.currency;

  const fromAmount = currencyData.find((opt) => opt.currency === from)?.amount;

  let toRate = Number(
    currencyData.find((opt) => opt.currency === to)?.rate
  ).toFixed(6);

  if (fromCurrency === "USD" && toCurrency === "NGN") {
    toRate = Number(currData?.USDNGN / 1).toFixed(2);
  } else if (fromCurrency === "GBP" && toCurrency === "NGN") {
    toRate = Number(currData?.USDNGN / currData?.USDGBP).toFixed(6);
  } else if (fromCurrency === "EUR" && toCurrency === "NGN") {
    toRate = Number(currData?.USDNGN / currData?.USDEUR).toFixed(6);
  }

  if (fromCurrency === "NGN" && toCurrency === "USD") {
    toRate = Number(1 / currData?.USDNGN).toFixed(6);
  } else if (fromCurrency === "GBP" && toCurrency === "USD") {
    toRate = Number(1 / currData?.USDGBP).toFixed(6);
  } else if (fromCurrency === "EUR" && toCurrency === "USD") {
    toRate = Number(1 / currData?.USDEUR).toFixed(6);
  }

  if (fromCurrency === "NGN" && toCurrency === "GBP") {
    toRate = Number(currData?.USDGBP / currData?.USDNGN).toFixed(6);
  } else if (fromCurrency === "USD" && toCurrency === "GBP") {
    toRate = Number(currData?.USDGBP / 1).toFixed(6);
  } else if (fromCurrency === "EUR" && toCurrency === "GBP") {
    toRate = Number(currData?.USDGBP / currData?.USDEUR).toFixed(6);
  }

  if (fromCurrency === "NGN" && toCurrency === "EUR") {
    toRate = Number(currData?.USDEUR / currData?.USDNGN).toFixed(6);
  } else if (fromCurrency === "USD" && toCurrency === "EUR") {
    toRate = Number(currData?.USDEUR / 1).toFixed(6);
  } else if (fromCurrency === "GBP" && toCurrency === "EUR") {
    toRate = Number(currData?.USDEUR / currData?.USDGBP).toFixed(6);
  }

  // const fromRate = currencyData.find((opt) => opt.currency === from)?.rate;

  const exchangeDetails = [
    { label: "You pay", value: `${fromIcon}${amount}` },
    {
      label: "Exchange rate",
      value: `1 ${fromCurrency} = ${toRate} ${toCurrency}`,
    },
    // { label: "Bank", value: "Opay" },
  ];

  if (dataLoading || !currData)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader color="blue" />
      </div>
    );

  if (error) return (window.location.href = "/");

  function handleExchange() {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount to exchange.");
      return;
    }
    if (Number(amount) > Number(fromAmount)) {
      toast.error("Amount is greater than available balance");
      return;
    } else {
      route.push("/dashboard/");
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      {pathname === "/dashboard/exchange" && (
        <Card
          padding="lg"
          radius="md"
          className="space-y-4 !bg-gray-50 mt-4"
          withBorder
        >
          <Text c="dimmed" size="sm">
            Current Exchange Rate
          </Text>
          <p className="font-medium text-xl">
            1 {fromCurrency} = {toRate} {toCurrency}
          </p>
        </Card>
      )}
      <div className="mt-4 space-y-4">
        <Select
          label="From Wallet"
          data={fromOptions}
          value={from}
          onChange={(value) => setFrom(value || currencyData[1].currency)}
        />
        <div className="flex justify-center">
          <Button
            className="!rounded-full !p-0 !size-10"
            variant="default"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
          >
            <IconExchange stroke={1.6} />
          </Button>
        </div>
        <Select
          label="To Wallet"
          data={toOptions}
          value={to}
          onChange={(value) => setTo(value || currencyData[0].currency)}
        />
        <div>
          <NumberInput
            leftSection={fromIcon}
            label="Amount"
            placeholder="0.00"
            min={0}
            max={200}
            value={amount}
            onChange={(value) => setAmount(Number(value))}
          />
          <Text c="dimmed" size="sm">
            Available balance - {fromIcon}
            {fromAmount}
          </Text>
        </div>
        {Boolean(amount) && (
          <Card
            padding="lg"
            radius="md"
            className="space-y-4 !bg-gray-50 my-4"
            withBorder
          >
            <Text size="md" mb="md">
              Exchange preview
            </Text>
            {exchangeDetails.map((item) => (
              <div
                className="flex items-center justify-between"
                key={item.label}
              >
                <span className="font-medium">{item.label}:</span>
                <div className="flex gap-x-4 items-center">
                  <Text c="dimmed">{item.value}</Text>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="font-medium">You Recieve:</span>
              <div className="flex gap-x-4 items-center">
                <span className="text-green-600 font-semibold">
                  {toIcon}
                  {(Number(amount) * Number(toRate)).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        )}

        <Button fullWidth onClick={handleExchange}>
          Exchange Currency
        </Button>
      </div>
    </>
  );
}
