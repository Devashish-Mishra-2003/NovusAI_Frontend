import React from "react";
import {
  Container,
  Grid,
  Paper,
  Text,
  Title,
  Group,
  Badge,
  List,
  ThemeIcon,
  Button,
  useMantineTheme,
  useMantineColorScheme,
  Stack,
  Box,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

const PricingSection: React.FC = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isStacked = useMediaQuery(`(max-width: 62em)`);

  const pricingTiers = [
    {
      title: "Free Preview",
      price: "$0",
      description: "Basic access to explore the NovusAI discovery engine.",
      features: [
        "Up to 5 literature scans/day",
        "Public trial analytics",
        "Basic interaction history",
        "Community support",
      ],
      buttonLabel: "Start Free",
      popular: false,
    },
    {
      title: "Pro Researcher",
      price: "$99",
      period: "/mo",
      description: "Full power access for individual researchers and analysts.",
      features: [
        "Unlimited literature extraction",
        "Deep clinical trial insights",
        "Advanced molecule tracking",
        "Export decision-ready reports",
        "Priority live reasoning speed",
      ],
      buttonLabel: "Upgrade to Pro",
      popular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Dedicated environments mapped to your private databases.",
      features: [
        "Private knowledge vault integration",
        "Custom LLM fine-tuning",
        "Team collaboration spaces",
        "SAML SSO & advanced security",
        "Dedicated success manager",
      ],
      buttonLabel: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <Box
      py={{ base: 60, md: 80 }}
      style={{
        backgroundColor: isDark ? theme.colors.dark[9] : theme.white,
        borderBottom: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      <Container size="lg">
        <Stack align="center" gap="sm" mb={40} ta="center">
          <Badge variant="light" color="blue" size="md">
            Flexible Plans
          </Badge>
          <Title order={2} fw={900} style={{ letterSpacing: -1 }}>
            Accelerate Discovery at Any Scale
          </Title>
          <Text c="dimmed" size="lg" maw={600}>
            Whether you're an independent researcher or an enterprise pipeline,
            we have a tier custom-built for your data needs.
          </Text>
        </Stack>

        <Grid gutter={{ base: "md", md: "lg" }} align="stretch">
          {pricingTiers.map((tier, index) => {
            const isPopular = tier.popular;

            return (
              <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                <Paper
                  p="xl"
                  radius="xl"
                  withBorder
                  h="100%"
                  style={{
                    position: "relative",
                    background: isDark
                      ? isPopular
                        ? `linear-gradient(145deg, ${theme.colors.dark[7]} 0%, ${theme.colors.dark[8]} 100%)`
                        : theme.colors.dark[8]
                      : theme.white,
                    borderColor: isPopular
                      ? theme.colors.blue[6]
                      : isDark
                      ? theme.colors.dark[4]
                      : theme.colors.gray[3],
                    transform: isPopular && !isStacked ? "translateY(-15px)" : "none",
                    boxShadow: isPopular
                      ? isDark
                        ? `0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px rgba(34, 139, 230, 0.1)`
                        : `0 20px 40px -10px rgba(34, 139, 230, 0.2)`
                      : theme.shadows.md,
                    zIndex: isPopular ? 10 : 1,
                  }}
                >
                  {isPopular && (
                    <Badge
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan" }}
                      size="sm"
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: "0 4px 10px rgba(34,139,230,0.3)",
                      }}
                    >
                      Most Popular
                    </Badge>
                  )}

                  <Stack gap="xl" h="100%">
                    <Box style={{ flexGrow: 1 }}>
                      <Text fw={700} size="xl" c={isDark ? "white" : "dark.9"}>
                        {tier.title}
                      </Text>
                      <Group gap={4} mt="md" align="baseline">
                        <Text fw={900} fz={42} lh={1}>
                          {tier.price}
                        </Text>
                        {tier.period && (
                          <Text size="md" fw={700} c="dimmed">
                            {tier.period}
                          </Text>
                        )}
                      </Group>
                      <Text size="sm" c="dimmed" mt="xs" style={{ minHeight: 40 }}>
                        {tier.description}
                      </Text>
                    </Box>

                    <Button
                      fullWidth
                      size="lg"
                      radius="xl"
                      variant={isPopular ? "gradient" : "default"}
                      gradient={isPopular ? { from: "blue", to: "cyan" } : undefined}
                      style={{
                        transition: "all 0.2s ease",
                      }}
                    >
                      {tier.buttonLabel}
                    </Button>

                    <List
                      spacing="sm"
                      size="sm"
                      style={{ marginTop: "auto" }}
                      icon={
                        <ThemeIcon color="blue" size={20} radius="xl" variant="light">
                          <IconCheck size={12} stroke={3} />
                        </ThemeIcon>
                      }
                    >
                      {tier.features.map((feature, i) => (
                        <List.Item key={i}>
                          <Text fw={600} size="sm">
                            {feature}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  </Stack>
                </Paper>
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingSection;
