"use client";

import { useRouter } from "next/navigation";
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
import { Toaster, toast } from "sonner";

export default function Signin() {
  const [visible, { open, close }] = useDisclosure(false);

  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      agreement: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  async function submitForm(values: { email: string; password: string }) {
    open();
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const cdata = await res.json();
        if (cdata.error === "Email not verified") {
          toast.error("Email not verified, check your email", {
            duration: 4000,
          });
        }
        if (cdata.message === "admin") {
          router.push("/admin");
        } else if (cdata.value) {
          router.push(`/dashboard`);
        } else if (cdata.error) {
          close();
          toast.error(cdata.error);
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
            <p>
              <span className="font-medium">Email: </span>
              {process.env.NEXT_PUBLIC_EMAIL}
            </p>
            <p>
              <span className="font-medium">Password: </span>
              {process.env.NEXT_PUBLIC_PASSWORD}
            </p>
            <Title order={2} className="text-left" mb="lg">
              Login
            </Title>
            <TextInput
              withAsterisk
              autoComplete="off"
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
              placeholder="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <Checkbox
              mt="lg"
              label="Keep me signed in"
              key={form.key("agreement")}
              {...form.getInputProps("agreement", { type: "checkbox" })}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </Group>

            <p className="text-sm mt-4 text-center">
              Dont have an account? <Anchor href="/signup">Sign up</Anchor>
            </p>
          </Card>
        </form>
      </Box>
    </div>
  );
}
