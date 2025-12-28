"use client";

import { useRouter } from "next/navigation";
import GridContainer from "@/app/components/gridContainer";
import SectionContainer from "@/app/components/sectionContainer";
import { useState } from "react";
import { Button, Group, Card, Text, FileButton } from "@mantine/core";
import { IconPhotoScan, IconUpload, IconCamera } from "@tabler/icons-react";
import { toast, Toaster } from "sonner";

export default function Kyc() {
  const router = useRouter();
  const [documentfile, setDocumentfile] = useState<File | null>(null);
  const [selfiefile, setSelfiefile] = useState<File | null>(null);
  const [dname, setDname] = useState("Passport");
  const [step, setStep] = useState<number>(1);

  const next = () => {
    if (documentfile && selfiefile) setStep((prev) => Math.min(prev + 1, 4));
    else if (!documentfile) toast.error(`Upload your ${dname}`);
    else if (!selfiefile) toast.error(`Upload selfie`);
    else toast.error(`Upload images`);
  };

  // const back = () => setStep((prev) => Math.max(prev - 1, 1));

  const documentData = [
    {
      text: "Passport",
    },
    {
      text: "Driver's License",
    },
    {
      text: "National ID",
    },
  ];

  const details = [
    { label: "Document Type", value: dname },
    { label: "ID Document", value: documentfile ? "Uploaded" : "Not Uploaded" },
    {
      label: "Selfie",
      value: selfiefile ? "Uploaded" : "Not Uploaded",
    },
  ];

  return (
    <GridContainer>
      <Toaster position="top-center" richColors />
      <>
        {step === 1 && (
          <SectionContainer
            heading="KYC Verification"
            subheading="Verify your identity to unlock all features"
          >
            <>
              <div className="grid grid-cols-3 gap-x-4 mt-6">
                {documentData.map((x, index) => (
                  <Card
                    padding="lg"
                    radius="sm"
                    withBorder
                    className={`!p-4 cursor-pointer ${
                      dname === x.text
                        ? "!bg-[#e7f5ff] !text-[#339af0] !font-medium !border !border-2 !border-[#339af0]"
                        : ""
                    }`}
                    key={index}
                    onClick={() => setDname(x.text)}
                  >
                    <Button variant="light" className="!w-max !px-2">
                      <IconPhotoScan stroke={1.6} />
                    </Button>
                    <div className="mt-4">{x.text}</div>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-4 mt-6">
                <Card
                  padding="lg"
                  radius="sm"
                  withBorder
                  className="!p-4 flex flex-col justify-between min-h-[250px] md:min-h-[210px] !border-2 !border-dashed"
                >
                  <div className="space-y-5">
                    <Button variant="light" className="!w-max !px-2">
                      <IconUpload stroke={1.6} />
                    </Button>
                    <Text fw={600} ta="left" size="md">
                      Upload your {dname}
                    </Text>

                    <Text c="dimmed" size="sm">
                      PNG, JPG up to 10MB
                    </Text>
                  </div>
                  <>
                    <Group justify="center">
                      <FileButton
                        onChange={setDocumentfile}
                        accept="image/png,image/jpeg"
                      >
                        {(props) => (
                          <Button variant="light" {...props} fullWidth>
                            Upload image
                          </Button>
                        )}
                      </FileButton>
                    </Group>

                    {documentfile && (
                      <Text size="sm" ta="center" mt="sm">
                        {documentfile.name}
                      </Text>
                    )}
                  </>
                </Card>
                <Card
                  padding="lg"
                  radius="sm"
                  withBorder
                  className="!p-4 flex flex-col justify-between min-h-[250px] md:min-h-[210px] !border-2 !border-dashed"
                >
                  <div className="space-y-5">
                    <Button variant="light" className="!w-max !px-2">
                      <IconCamera stroke={1.6} />
                    </Button>

                    <Text fw={600} ta="left" size="md">
                      Upload a clear selfie
                    </Text>

                    <Text c="dimmed" size="sm">
                      Face clearly visible, PNG/JPG up to 10MB
                    </Text>
                  </div>
                  <>
                    <Group justify="center">
                      <FileButton
                        onChange={setSelfiefile}
                        accept="image/png,image/jpeg"
                      >
                        {(props) => (
                          <Button variant="light" {...props} fullWidth>
                            Upload image
                          </Button>
                        )}
                      </FileButton>
                    </Group>

                    {selfiefile && (
                      <Text size="sm" ta="center" mt="sm">
                        {selfiefile.name}
                      </Text>
                    )}
                  </>
                </Card>
              </div>
            </>
            <Group justify="left" mt="xl">
              <Button onClick={next} fullWidth>
                Submit
              </Button>
            </Group>
          </SectionContainer>
        )}

        {step === 2 && (
          <SectionContainer
            heading="Review in Progress"
            subheading="Your documents have been submitted and are being reviewed by our team"
          >
            <div className="!bg-gray-50 px-4 rounded-md mt-6">
              {details.map((item) => (
                <div
                  className="flex items-center justify-between space-y-2 py-2"
                  key={item.label}
                >
                  <span className="font-medium">{item.label}:</span>
                  <Text c="dimmed">{item.value}</Text>
                </div>
              ))}

              <div className="flex items-center justify-between space-y-2 py-2">
                <span className="font-medium">Status:</span>
                <span className="text-yellow-500">Under Review</span>
              </div>
            </div>
            <div className="!bg-[#e7f5ff] !text-[#339af0] !font-medium !border !border-2 !border-[#339af0] mt-4 rounded-md p-4">
              <div className="font-semibold text-lg">What happens next?</div>

              <div className="text-sm">
                • Our team will review your documents within 24-48 hours <br />•
                You&apos;ll receive an email notification with the results{" "}
                <br />• If approved, all platform features will be unlocked{" "}
                <br />• If additional information is needed, we&apos;ll contact
                you
              </div>
            </div>
            <Group justify="left" mt="xl">
              <Button fullWidth onClick={() => router.push("/dashboard")}>
                Go Home
              </Button>
            </Group>
          </SectionContainer>
        )}
      </>
    </GridContainer>
  );
}
