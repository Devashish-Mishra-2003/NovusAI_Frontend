import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Box,
  Group,
  Paper,
  Stack,
  Grid,
  useMantineTheme,
  useMantineColorScheme,
  Transition,
} from "@mantine/core";

const steps = [
  {
    title: "Ask a scientific question",
    description: "Start with a natural-language question about a molecule, indication, or repurposing hypothesis.",
    color: "blue",
  },
  {
    title: "Ground with internal context",
    description: "Attach internal documents or unpublished notes so the system reasons within your proprietary context.",
    color: "cyan",
  },
  {
    title: "Run multi-agent intelligence",
    description: "Specialized agents analyze literature, clinical trials, and patents using structured workflows.",
    color: "indigo",
  },
  {
    title: "Review ranked opportunities",
    description: "Receive ranked repurposing candidates with rationale, evidence trails, and commercial signals.",
    color: "teal",
  },
];

const FlowSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const progressWidth = (active / (steps.length - 1)) * 100;

  return (
    <Box 
      py={140} 
      pos="relative"
      // Removed background gradients, using solid theme colors
      bg={isDark ? "dark.9" : "gray.0"}
      style={{ borderTop: `1px solid ${isDark ? theme.colors.dark[7] : theme.colors.gray[2]}` }}
    >
      <Container size="lg">
        <Stack align="center" mb={80}>
          <Text
            fw={800}
            size="sm"
            c="blue.6"
            style={{ letterSpacing: 3, textTransform: "uppercase" }}
          >
            Scientific Workflow
          </Text>
          <Title order={2} fw={900} ta="center" size={42} style={{ letterSpacing: -1 }}>
            How NovusAI Works
          </Title>
          <Text c="dimmed" ta="center" maw={550} size="lg">
            A high-fidelity, explainable journey from complex hypothesis to validated discovery.
          </Text>
        </Stack>

        {/* Dynamic Progress Track */}
        <Box mb={70} pos="relative" px={30}>
          <Box
            pos="absolute"
            top="50%"
            left={30}
            right={30}
            h={2} // Thinner line for a more "precise" look
            style={{
              backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[3],
              zIndex: 0,
              transform: "translateY(-50%)",
            }}
          />

          <Box
            pos="absolute"
            top="50%"
            left={30}
            h={2}
            style={{
              width: `calc(${progressWidth}% - 10px)`,
              backgroundColor: theme.colors.blue[6],
              zIndex: 1,
              transform: "translateY(-50%)",
              transition: "width 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: `0 0 10px ${theme.colors.blue[5]}`,
            }}
          />

          <Group justify="space-between" align="center" pos="relative" style={{ zIndex: 2 }}>
            {steps.map((step, index) => {
              const isPastOrCurrent = index <= active;
              const isCurrent = index === active;

              return (
                <Box
                  key={index}
                  w={20}
                  h={20}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: isPastOrCurrent ? theme.colors[step.color as any][6] : (isDark ? theme.colors.dark[4] : theme.colors.gray[4]),
                    // DECREASED size of white part (border) from 6px to 2px
                    border: `2px solid ${isDark ? theme.colors.dark[9] : theme.white}`,
                    boxShadow: isCurrent 
                      ? `0 0 0 4px ${isDark ? 'rgba(34, 139, 230, 0.2)' : 'rgba(34, 139, 230, 0.1)'}, 0 0 15px ${theme.colors.blue[6]}` 
                      : "none",
                    transition: "all 600ms ease",
                    transform: isCurrent ? "scale(1.2)" : "scale(1)",
                  }}
                />
              );
            })}
          </Group>
        </Box>

        <Grid gutter={30}>
          {steps.map((step, index) => {
            const isActive = index === active;
            return (
              <Grid.Col key={step.title} span={{ base: 12, sm: 6, md: 3 }}>
                <Transition mounted={true} transition="fade" duration={1000} timingFunction="ease">
                  {(transitionStyles) => (
                    <Paper
                      withBorder
                      radius="xl"
                      p="xl"
                      style={{
                        ...transitionStyles,
                        height: "100%",
                        backgroundColor: isActive 
                            ? (isDark ? theme.colors.dark[8] : theme.white) 
                            : "transparent",
                        borderColor: isActive ? theme.colors[step.color as any][5] : (isDark ? "transparent" : theme.colors.gray[2]),
                        transform: isActive ? "translateY(-15px)" : "translateY(0)",
                        boxShadow: isActive
                          ? `0 20px 25px -5px rgba(0, 0, 0, 0.1)`
                          : "none",
                        opacity: isActive ? 1 : 0.5,
                        transition: "all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    >
                      <Stack gap="md">
                        <Box
                          w={36}
                          h={36}
                          style={{
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isActive ? theme.colors[step.color as any][isDark ? 9 : 0] : (isDark ? theme.colors.dark[6] : theme.colors.gray[1]),
                            color: isActive ? theme.colors[step.color as any][6] : theme.colors.gray[5],
                            fontWeight: 900,
                            fontSize: 16,
                            transition: "all 400ms ease",
                            transform: isActive ? "rotate(10deg)" : "none",
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Title order={5} size="lg" fw={800} c={isActive ? (isDark ? "white" : "dark") : "dimmed"}>
                          {step.title}
                        </Title>
                        <Text size="sm" c="dimmed" lh={1.7} fw={500}>
                          {step.description}
                        </Text>
                      </Stack>
                    </Paper>
                  )}
                </Transition>
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FlowSection;