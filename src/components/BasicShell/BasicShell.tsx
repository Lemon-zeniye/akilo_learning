import { AppShell, Burger, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function BasicAppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  const groceries = [
    {
      emoji: "🍎",
      value: "Apples",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      emoji: "🍌",
      value: "Bananas",
      description:
        "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
    },
    {
      emoji: "🥦",
      value: "Broccoli",
      description:
        "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <div>
          Navbar
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </div>
        {Array(25)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={38} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
