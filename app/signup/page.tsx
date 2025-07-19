"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  TextInput,
  PasswordInput,
  Card,
  Title,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

export default function Signup() {
  const [visible, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      username: (value) =>
        value.trim().length < 3
          ? "Username must be at least 3 characters"
          : null,

      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",

      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,

      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,

      termsOfService: (value) =>
        value ? null : "You must accept the terms of service",
    },
  });

  async function submitForm(values: {
    username: string;
    email: string;
    password: string;
  }) {
    open();
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const cdata = await res.json();
        if (cdata.error) {
          close();
          toast.error(cdata.error, {
            duration: 8000,
          });
        } else {
          sessionStorage.setItem(
            "newlogin",
            "Registration successful. Please login"
          );
          router.push("/");
        }
      }
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      toast.error("Invalid login details", { duration: 4000 });
      close();
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <Toaster position="top-center" richColors />
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form
          className="flex flex-col justify-center h-screen"
          onSubmit={form.onSubmit((values) => submitForm(values))}
        >
          <Card shadow="md" padding="lg" radius="md" withBorder>
            <Title order={2} ta="left" mb="md">
              Signup
            </Title>

            <TextInput
              withAsterisk
              autoComplete="off"
              label="Username"
              placeholder="username"
              key={form.key("username")}
              {...form.getInputProps("username")}
            />

            <TextInput
              withAsterisk
              autoComplete="off"
              mt="md"
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              withAsterisk
              autoComplete="off"
              mt="md"
              label="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <PasswordInput
              withAsterisk
              autoComplete="off"
              mt="md"
              label="Confirm Password"
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
            />

            <Checkbox
              mt="lg"
              label="Agree to terms of service"
              key={form.key("termsOfService")}
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </Group>

            <p className="text-xs mt-4 text-center">
              Already have an account? <Anchor href="/">Sign in</Anchor>
            </p>
          </Card>
        </form>
      </Box>
    </div>
  );
}
