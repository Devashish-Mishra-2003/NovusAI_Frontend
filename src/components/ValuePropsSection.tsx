import React from "react";
import {
  Container,
  Grid,
  Title,
  Text,
  Box,
  Card,
  Group,
  Stack,
  ThemeIcon,
  Transition,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconCurrencyDollar,
  IconClock,
  IconLayoutGrid,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";

type CardConfig = {
  id: string;
  label: string;
  title: string;
  body: string;
  before: string;
  after: string;
  icon: React.ReactNode;
};

const cards: CardConfig[] = [
  { id: "01", label: "Cost", title: "Reduce early diligence cost", body: "Replace consultant-heavy first passes with repeatable AI scans.", before: "$60K", after: "$240", icon: <IconCurrencyDollar size={20} /> },
  { id: "02", label: "Time", title: "Compress timelines dramatically", body: "Move from months of research to evidence-backed views in one session.", before: "90d", after: "2h", icon: <IconClock size={20} /> },
  { id: "03", label: "Throughput", title: "Evaluate more molecules", body: "Standardized scans allow teams to review 50x more hypotheses yearly.", before: "4/yr", after: "200+/yr", icon: <IconLayoutGrid size={20} /> },
  { id: "04", label: "Success rate", title: "Increase downstream hit rate", body: "Better filtering upfront means more viable ideas reach formal review.", before: "10%", after: "30%", icon: <IconTrendingUp size={20} /> },
];

const ValueCard = ({ card, index, isDark }: { card: CardConfig; index: number; isDark: boolean }) => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();

  return (
    <Transition
      mounted={true}
      transition="slide-up"
      duration={800}
      timingFunction="ease-out"
    >
      {(transitionStyles) => (
        <Card
          ref={ref}
          withBorder
          // Changed radius to xl to match FlowSection Paper components
          radius="xl"
          p="xl"
          style={{
            ...transitionStyles,
            transitionDelay: `${index * 150}ms`,
            transform: `${transitionStyles.transform} ${hovered ? "translateY(-12px)" : "translateY(0)"}`,
            transition: "transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 400ms ease, border-color 400ms ease",
            backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
            boxShadow: hovered ? theme.shadows.xl : theme.shadows.sm,
            borderColor: hovered ? theme.colors.blue[5] : (isDark ? theme.colors.dark[5] : theme.colors.gray[3]),
            zIndex: hovered ? 10 : 1,
          }}
        >
          <Group justify="space-between" align="center" wrap="nowrap">
            <Stack gap="xs" style={{ flex: 1 }}>
              <Group gap="xs">
                <ThemeIcon variant="light" size="sm" radius="md" color="blue">
                  {card.icon}
                </ThemeIcon>
                <Text size="xs" tt="uppercase" fw={700} c="blue.6">
                  {card.label}
                </Text>
              </Group>
              <Title order={5} size="md" lh={1.2}>
                {card.title}
              </Title>
              <Text size="xs" c="dimmed" lh={1.4} maw={260}>
                {card.body}
              </Text>
            </Stack>

            <Group gap="md" wrap="nowrap">
              <Stack gap={0} align="center" w={65}>
                <Text fw={700} size="sm" c="red.6" style={{ opacity: 0.8 }}>{card.before}</Text>
                <Text size="9px" tt="uppercase" fw={800} c="dimmed">Legacy</Text>
              </Stack>
              
              <Stack 
                gap={0} 
                align="center" 
                w={90} 
                py={8}
                style={{ 
                  backgroundColor: isDark ? 'rgba(43, 138, 62, 0.2)' : theme.colors.green[0],
                  border: `1px solid ${isDark ? theme.colors.green[8] : theme.colors.green[2]}`,
                  borderRadius: theme.radius.sm,
                  animation: "green-attention 3s infinite ease-in-out"
                }}
              >
                <Text fw={900} size="sm" c={isDark ? "green.4" : "green.8"}>{card.after}</Text>
                <Text size="9px" tt="uppercase" fw={800} c={isDark ? "green.2" : "green.9"}>NovusAI</Text>
              </Stack>
            </Group>
          </Group>
        </Card>
      )}
    </Transition>
  );
};

const ValuePropsSection: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Box py={100} bg={isDark ? "dark.8" : "gray.0"}>
      <Container size="lg">
        <Stack align="center" mb={60}>
          <Text fw={800} size="sm" c="blue.6" style={{ letterSpacing: 2, textTransform: "uppercase" }}>
            ROI & Efficiency
          </Text>
          <Title order={2} fw={800} ta="center" size="h1">
            Higher-confidence repurposing
          </Title>
        </Stack>

        <Grid gutter="lg">
          {cards.map((card, index) => (
            <Grid.Col key={card.id} span={{ base: 12, md: 6 }}>
              <ValueCard card={card} index={index} isDark={isDark} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <style>{`
        @keyframes green-attention {
          0%, 100% { 
            filter: brightness(1);
            box-shadow: 0 0 0px rgba(64, 192, 87, 0);
          }
          50% { 
            filter: brightness(1.15);
            box-shadow: 0 0 12px ${isDark ? 'rgba(64, 192, 87, 0.2)' : 'rgba(64, 192, 87, 0.3)'};
          }
        }
      `}</style>
    </Box>
  );
};

export default ValuePropsSection;