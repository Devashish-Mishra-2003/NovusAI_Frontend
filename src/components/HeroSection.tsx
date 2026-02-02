import React from "react";
import { useNavigate } from "react-router-dom"; 
import {
  Container,
  Grid,
  Title,
  Text,
  Box,
  Badge,
  Paper,
  Stack,
  Group,
  Transition,
  useMantineTheme,
  useMantineColorScheme,
  Button,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useAuth } from "../auth/AuthContext"; 

const HeroSection: React.FC = () => {
  const navigate = useNavigate(); 
  const { status } = useAuth();   

  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { hovered, ref } = useHover();
  const isDark = colorScheme === "dark";

  const glowColor = isDark ? theme.colors.blue[8] : theme.colors.blue[4];

  const handleClick = () => {
    if (status === "authenticated") {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box 
      py={100} 
      style={{ 
        position: "relative",
        overflow: "hidden",
        background: isDark 
          ? `linear-gradient(180deg, ${theme.colors.dark[9]} 0%, ${theme.colors.dark[8]} 100%)` 
          : `linear-gradient(180deg, ${theme.white} 0%, ${theme.colors.gray[0]} 100%)`
      }}
    >
      {/* Background Glow */}
      <Box
        style={{
          position: "absolute",
          top: "5%",
          right: "2%",
          width: "40%",
          height: "60%",
          background: `radial-gradient(circle, ${isDark ? theme.colors.blue[9] : theme.colors.blue[0]} 0%, transparent 70%)`,
          filter: "blur(140px)",
          opacity: isDark ? 0.2 : 0.3,
          zIndex: 0,
        }}
      />

      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        <Grid align="center" gutter={50}>
          {/* LEFT — TEXT */}
          <Grid.Col span={{ base: 12, md: 6.5 }}>
            <Stack gap="lg">
              <Box>
                <Badge 
                  variant="filled" 
                  size="md" 
                  radius="sm" 
                  color="blue"
                  mb="xs"
                  style={{ textTransform: "none", letterSpacing: 0.5 }}
                >
                  Multi-agent drug repurposing intelligence
                </Badge>

                <Title 
                  order={1} 
                  fw={900} 
                  lh={1.2} 
                  size={46} 
                  style={{ letterSpacing: -1 }}
                >
                  AI copilot for
                  <Text component="span" variant="gradient" gradient={{ from: "blue", to: "cyan" }} inherit>
                    {" "}drug repurposing
                  </Text>
                </Title>
              </Box>

              <Stack gap="xs">
                <Text c={isDark ? "gray.4" : "gray.7"} size="lg" lh={1.5}>
                  NovusAI discovery engine orchestrates literature, clinical trials, and 
                  internal knowledge to find your next breakthrough indication.
                </Text>

                <Text size="sm" c="dimmed" lh={1.5}>
                  Start from a simple question. Run structured Repurposing Scans 
                  and export decision-ready reports with full evidence trails.
                </Text>
              </Stack>

              <Group pt="md">
                <Button 
                  ref={ref}
                  size="lg" 
                  radius="xl" 
                  px={40} 
                  onClick={handleClick}
                  style={{ 
                    fontSize: 16,
                    transition: "transform 250ms ease, box-shadow 250ms ease",
                    transform: hovered ? "translateY(-5px)" : "translateY(0)",
                    boxShadow: hovered 
                      ? `0 10px 20px -5px rgba(0, 0, 0, 0.2), 0 0 15px ${glowColor}`
                      : theme.shadows.md,
                  }}
                >
                  Get Started
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          {/* RIGHT — CHAT MOCK */}
          <Grid.Col span={{ base: 12, md: 5.5 }}>
            <Transition mounted transition="slide-up" duration={1000} timingFunction="ease">
              {(styles) => (
                <Paper
                  style={{
                    ...styles,
                    animation: "floating 6s ease-in-out infinite",
                    background: isDark ? "rgba(26, 27, 30, 0.7)" : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(12px)",
                  }}
                  radius="xl"
                  shadow="xl"
                  p="lg"
                  withBorder
                >
                  <Stack gap="md">
                    <Group justify="space-between">
                      <Badge variant="dot" size="xs" color="green">
                        Live reasoning preview
                      </Badge>
                      <Group gap={4}>
                        <Box w={6} h={6} style={{ borderRadius: "50%", background: theme.colors.gray[4] }} />
                        <Box w={6} h={6} style={{ borderRadius: "50%", background: theme.colors.gray[4] }} />
                        <Box w={6} h={6} style={{ borderRadius: "50%", background: theme.colors.gray[4] }} />
                      </Group>
                    </Group>

                    <Box style={{ alignSelf: "flex-start", maxWidth: "90%" }}>
                      <Paper radius="lg" p="sm" bg={isDark ? "dark.5" : "gray.1"} style={{ borderBottomLeftRadius: 4 }}>
                        <Text size="xs" fw={500}>
                          We are revisiting Molecule X. Are there promising
                          non-oncology indications?
                        </Text>
                      </Paper>
                    </Box>

                    <Box style={{ alignSelf: "flex-end", maxWidth: "90%" }}>
                      <Paper
                        radius="lg"
                        p="sm"
                        bg="blue.6"
                        c="white"
                        style={{ borderBottomRightRadius: 4, boxShadow: `0 8px 16px -4px ${theme.colors.blue[7]}` }}
                      >
                        <Stack gap={6}>
                          <Text size="xs" fw={600}>
                            Analyzing literature, clinical trials, and internal data...
                          </Text>
                          <Box h={1.5} bg="blue.4" style={{ opacity: 0.4, borderRadius: 2 }} />
                          <Text size="xs" style={{ opacity: 0.9, lineHeight: 1.4 }}>
                            I've identified candidates in neuro-degenerative pathways 
                            with evidence from recent literature and market signals.
                          </Text>
                        </Stack>
                      </Paper>
                    </Box>
                  </Stack>
                </Paper>
              )}
            </Transition>
          </Grid.Col>
        </Grid>
      </Container>

      <style>{`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;