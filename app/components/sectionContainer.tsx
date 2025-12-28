import { Card, Text } from "@mantine/core";

const SectionContainer = ({
  children,
  heading,
  subheading,
}: {
  children: React.ReactNode;
  heading: string;
  subheading: string;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6">
      <div className="hidden md:block col-span-1"></div>
      <div className="col-span-4">
        <Card padding="lg" radius="md" withBorder>
          <div className="flex flex-col space-y-1">
            <div>
              <Text fw={800} ta="left" size="xl">
                {heading}
              </Text>
            </div>

            <div>
              <Text c="dimmed" size="sm">
                {subheading}
              </Text>
            </div>
          </div>
          {children}
        </Card>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default SectionContainer;
