"use client";

import useData from "@/app/components/useData";
import { useState } from "react";
import {
  Button,
  Card,
  Text,
  TextInput,
  NumberInput,
  Divider,
  Select,
  Loader,
} from "@mantine/core";
import GridContainer from "@/app/components/gridContainer";
import SectionContainer from "@/app/components/sectionContainer";
import { IconUser, IconBuildingBank, IconSend } from "@tabler/icons-react";

export default function Send() {
  const { data, error, dataLoading } = useData();
  const [user, setUser] = useState({
    email: "",
    phone: "",
  });
  const [bank, setBank] = useState({
    Country: "",
    Bank: "",
    Acct_Name: "",
    Acct_Number: "",
  });
  const [selectedWallet, setSelectedWallet] = useState("");

  const [amount, setAmount] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [step, setStep] = useState<number>(1);
  const [send, setSend] = useState<number>(1);

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

  const recepientData = [
    {
      id: 1,
      icon: <IconUser stroke={1.6} />,
      text: "Send to User",
      subtext: "Transfer to another user using email or phone",
    },
    {
      id: 2,
      icon: <IconBuildingBank stroke={1.6} />,
      text: "Send to Bank",
      subtext: "Transfer to external bank",
    },
  ];

  const details = [
    { label: "From", value: selectedWallet },
    { label: "To", value: user.email || user.phone || bank.Acct_Name },
    {
      label: "Amount",
      value: `${selectedWallet.slice(6, 7)}${Number(amount).toFixed(2)}`,
    },
  ];

  const next = () => {
    if (step === 1) {
      const isBankEmpty = Object.values(bank).every((value) => value !== "");
      if (isBankEmpty) return setStep((prev) => Math.min(prev + 1, 4));
      if (user.email || user.phone)
        return setStep((prev) => Math.min(prev + 1, 4));
    }
  };
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  function handleRecipient(value: number) {
    if (value === 1) {
      setSend(value);
    }
    if (value === 2) {
      setSend(value);
    }
  }

  const getAvailableBalance = (value: string): string => {
    if (!value) return "";

    // Extract the balance part after the currency symbol
    const balanceMatch = value.match(/[₦$£€]([\d,]+\.?\d*)/);
    return balanceMatch ? balanceMatch[0] : "";
  };

  if (dataLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader color="blue" />
      </div>
    );

  if (error) return (window.location.href = "/");

  return (
    <GridContainer>
      <SectionContainer
        heading="Send Money"
        subheading="Transfer funds to another user or bank account"
      >
        <div className="space-y-4 mt-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 grid-cols-2 gap-x-4">
                {recepientData.map((x, index) => (
                  <Card
                    key={index}
                    padding="lg"
                    radius="sm"
                    withBorder
                    className={`!p-4 min-h-[100px] cursor-pointer ${
                      send === x.id
                        ? "!bg-[#e7f5ff] !text-[#339af0] !font-medium !border !border-2 !border-[#339af0]"
                        : ""
                    }`}
                    onClick={() => handleRecipient(x.id)}
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
              {send === 1 && (
                <>
                  <div>
                    <TextInput
                      label="Recipient Email"
                      placeholder="recepient@example.com"
                      onChange={(e) =>
                        setUser((user) => ({
                          ...user,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <Divider my="md" label="or" labelPosition="center" />
                  <div>
                    <TextInput
                      label="Recipient Phone"
                      placeholder="+1234567890"
                      onChange={(e) =>
                        setUser((user) => ({
                          ...user,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button onClick={next} fullWidth>
                    Next
                  </Button>
                </>
              )}
              {send === 2 && (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-0 md:gap-x-4 space-y-4 md:space-y-0">
                      <Select
                        label="Country"
                        placeholder="Select a country"
                        data={[
                          "Nigeria",
                          "United States",
                          "United Kingdom",
                          "European Union",
                        ]}
                        onChange={(value) =>
                          setBank((bank) => ({
                            ...bank,
                            Country: String(value) || "",
                          }))
                        }
                      />

                      <TextInput
                        label="Bank Name"
                        placeholder="Bank Name"
                        onChange={(e) =>
                          setBank((bank) => ({
                            ...bank,
                            Bank: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <TextInput
                        label="Account Name"
                        placeholder="Account holder name"
                        onChange={(e) =>
                          setBank((bank) => ({
                            ...bank,
                            Acct_Name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <NumberInput
                        label="Account Number"
                        placeholder="Account holder number"
                        onChange={(value) =>
                          setBank((bank) => ({
                            ...bank,
                            Acct_Number: String(value),
                          }))
                        }
                      />
                    </div>
                    <Button onClick={next} fullWidth>
                      Next
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Select
                  label="From wallet"
                  placeholder="Select wallet"
                  data={[
                    `NGN - ₦${Number(nairatotal).toFixed(2)}`,
                    `USD - $${Number(dollartotal).toFixed(2)}`,
                    `GBP - £${Number(poundtotal).toFixed(2)}`,
                    `EUR - €${Number(eurototal).toFixed(2)}`,
                  ]}
                  value={selectedWallet}
                  onChange={(value) => setSelectedWallet(String(value))}
                />
              </div>

              <div>
                <NumberInput
                  label="Amount"
                  placeholder="0.00"
                  min={0}
                  max={200}
                  value={amount}
                  onChange={(value) => setAmount(Number(value))}
                />
                {selectedWallet && (
                  <Text c="dimmed" size="sm">
                    Available balance - {getAvailableBalance(selectedWallet)}
                  </Text>
                )}
              </div>

              <div>
                <TextInput
                  label="Description (optional)"
                  placeholder="What this is for?"
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </div>

              <div>
                <Button onClick={back} variant="default">
                  Back
                </Button>
                <Button onClick={next} className="ml-2">
                  Review
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Card
                padding="lg"
                radius="md"
                className="space-y-4 !bg-gray-50"
                withBorder
              >
                {details.map((item) => (
                  <div
                    className="flex items-center justify-between"
                    key={item.label}
                  >
                    <span className="font-medium">{item.label}:</span>
                    <Text c="dimmed">{item.value}</Text>
                  </div>
                ))}
                {description && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Description:</span>
                    <Text c="dimmed">{description}</Text>
                  </div>
                )}
              </Card>

              <div>
                <Button onClick={back} variant="default">
                  Back
                </Button>
                <Button
                  onClick={next}
                  className="ml-2"
                  leftSection={<IconSend size={14} />}
                >
                  Send Money
                </Button>
              </div>
            </div>
          )}
        </div>
      </SectionContainer>
    </GridContainer>
  );
}
