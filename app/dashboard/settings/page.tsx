"use client";

import bcrypt from "bcryptjs";
import useData from "@/app/components/useData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GridContainer from "@/app/components/gridContainer";
import SectionContainer from "@/app/components/sectionContainer";
import {
  Tabs,
  TextInput,
  NumberInput,
  PasswordInput,
  Text,
  Checkbox,
  Button,
  Select,
  Textarea,
  Loader,
} from "@mantine/core";
import { IconUserCircle, IconTools } from "@tabler/icons-react";
import { Toaster, toast } from "sonner";

export default function Settings() {
  const router = useRouter();
  const { data, error, dataLoading } = useData();
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>();
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

  const [entry, setEntry] = useState({
    username: "",
    firstname: "",
    lastname: "",
    mobile: 0,
    country: "",
    state: "",
    zip: "",
    city: "",
    address: "",
  });

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "British Indian Ocean Territory",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos Islands",
    "Colombia",
    "Comoros",
    "Cook Islands",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curacao",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "North Korea",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of the Congo",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Barthelemy",
    "Saint Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "U.S. Virgin Islands",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican",
    "Venezuela",
    "Vietnam",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  async function handleProfile() {
    const hasAtLeastOneValue = Object.values(entry).some(
      (value) => value !== "" && value !== 0
    );

    if (hasAtLeastOneValue) {
      const formData = new FormData();
      formData.append("profile", JSON.stringify(entry));

      try {
        const res = await fetch(`/api/settings`, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const cdata = await res.json();
          if (cdata.error) {
          } else {
            window.location.reload();
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred");
        }

        toast.error("Invalid login details", {
          duration: 4000,
        });
      }
    }
  }

  async function handlePassword() {
    const isPasswordValid = await bcrypt.compare(
      String(oldPassword),
      data?.password as string
    );
    if (isPasswordValid) {
      toast.error("Invalid old password");
    }

    if (newPassword === confirmNewPassword) {
      const formData = new FormData();
      formData.append("password", String(newPassword));

      //   try {
      //     const res = await fetch(`/api/settings/pass`, {
      //       method: "POST",
      //       body: formData,
      //     });

      //     if (res.ok) {
      //       const cdata = await res.json();
      //       if (cdata.error) {
      //       } else {
      //         router.push("/");
      //       }
      //     }
      //   } catch (error: unknown) {
      //     if (error instanceof Error) {
      //       console.error(error.message);
      //     } else {
      //       console.error("An unknown error occurred");
      //     }

      //     toast.error("An unknown error occurred", {
      //       duration: 4000,
      //     });
      //   }
      // } else {
      toast.error("Passwords do not match");
    }
  }

  async function handleDelete() {
    if (deleteAccount) {
      try {
        const res = await fetch(`/api/settings/delete`, {
          method: "POST",
        });

        if (res.ok) {
          const cdata = await res.json();
          if (cdata.error) {
          } else {
            router.push("/");
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred");
        }
      }
    }
  }

  if (dataLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader color="blue" />
      </div>
    );

  if (error) return (window.location.href = "/");

  return (
    <>
      <Toaster position="top-center" richColors />
      <GridContainer>
        <SectionContainer
          heading="Settings"
          subheading="Make changes to profile and account"
        >
          <div className="mt-6">
            <Tabs defaultValue="profile">
              <Tabs.List>
                <Tabs.Tab
                  value="profile"
                  leftSection={<IconUserCircle size={14} />}
                >
                  Profile
                </Tabs.Tab>
                <Tabs.Tab value="account" leftSection={<IconTools size={14} />}>
                  Account
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="profile">
                <div className="mt-4 space-y-4">
                  <Text fw={700} ta="left" size="lg">
                    Edit profile
                  </Text>
                  <p></p>
                  <TextInput
                    label="Username"
                    defaultValue={data?.username || ""}
                    placeholder="Enter your username"
                    onChange={(e) =>
                      setEntry((prevEntry) => ({
                        ...prevEntry,
                        username: e.target.value,
                      }))
                    }
                  />

                  <div className="flex flex-col md:flex-row gap-4">
                    <TextInput
                      label="First Name"
                      defaultValue={data?.firstname || ""}
                      placeholder="Enter your first name"
                      className="w-full"
                      autoComplete="off"
                      onChange={(e) =>
                        setEntry((prevEntry) => ({
                          ...prevEntry,
                          firstname: e.target.value,
                        }))
                      }
                    />
                    <TextInput
                      label="Last Name"
                      defaultValue={data?.lastname || ""}
                      placeholder="Enter your last name"
                      className="w-full"
                      autoComplete="off"
                      onChange={(e) =>
                        setEntry((prevEntry) => ({
                          ...prevEntry,
                          lastname: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <NumberInput
                    label="Mobile Number"
                    defaultValue={data?.mobile || ""}
                    placeholder="Enter your mobile number"
                    className="w-full"
                    autoComplete="off"
                    onChange={(value) =>
                      setEntry((prevEntry) => ({
                        ...prevEntry,
                        mobile: Number(value) || 0,
                      }))
                    }
                  />

                  <div className="flex flex-col md:flex-row gap-4">
                    <Select
                      label="Country"
                      defaultValue={data?.country || ""}
                      placeholder="Select your country"
                      data={countries}
                      className="w-full"
                      autoComplete="off"
                      onChange={(value) =>
                        setEntry((prevEntry) => ({
                          ...prevEntry,
                          country: String(value) || "",
                        }))
                      }
                    />

                    <TextInput
                      label="State"
                      defaultValue={data?.state || ""}
                      placeholder="Enter your state"
                      className="w-full"
                      autoComplete="off"
                      onChange={(e) =>
                        setEntry((prevEntry) => ({
                          ...prevEntry,
                          state: e.target.value,
                        }))
                      }
                    />

                    <TextInput
                      label="ZIP Code"
                      defaultValue={data?.zip || ""}
                      placeholder="Enter your ZIP code"
                      className="w-full"
                      autoComplete="off"
                      onChange={(e) =>
                        setEntry((prevEntry) => ({
                          ...prevEntry,
                          zip: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <TextInput
                    label="City"
                    defaultValue={data?.city || ""}
                    placeholder="Enter your city"
                    onChange={(e) =>
                      setEntry((prevEntry) => ({
                        ...prevEntry,
                        city: e.target.value,
                      }))
                    }
                  />

                  <Textarea
                    label="Address"
                    defaultValue={data?.address || ""}
                    placeholder="Enter your full address"
                    className="w-full"
                    autoComplete="off"
                    onChange={(e) =>
                      setEntry((prevEntry) => ({
                        ...prevEntry,
                        address: e.target.value,
                      }))
                    }
                  />

                  <Button onClick={handleProfile}>Save Changes</Button>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="account">
                <div className="mt-4 space-y-4">
                  <div>
                    <Text fw={700} ta="left" size="lg">
                      Password Change
                    </Text>

                    <Text c="dimmed" size="sm">
                      Change or create a new password
                    </Text>
                  </div>

                  <PasswordInput
                    label="Old Password"
                    placeholder="Enter your old password"
                    autoComplete="off"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <PasswordInput
                    label="New Password"
                    placeholder="Enter your new password"
                    autoComplete="off"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <PasswordInput
                    label="Confirm New Password"
                    placeholder="Re-enter your new password"
                    autoComplete="off"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />

                  <Button onClick={handlePassword}>Change Password</Button>

                  <div className="mt-6"></div>
                  <Text fw={700} ta="left" size="lg">
                    Delete Account
                  </Text>

                  <Text c="dimmed" size="sm">
                    Deleting your account will permanently remove all associated
                    content
                  </Text>

                  <div className="mb-4 mt-2 flex items-center gap-x-2">
                    <div className="mt-2 flex items-center gap-2">
                      <Checkbox
                        checked={deleteAccount}
                        onChange={() => setDeleteAccount(!deleteAccount)}
                        label="Confirm account deletion"
                      />
                    </div>
                  </div>

                  <Button color="red" onClick={handleDelete}>
                    Delete Account
                  </Button>
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </SectionContainer>
      </GridContainer>
    </>
  );
}
