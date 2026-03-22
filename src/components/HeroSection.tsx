import React, { useState, useEffect } from "react";
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
  useMantineTheme,
  useMantineColorScheme,
  Button,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useAuth } from "../auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const mockAreaData = [
  { value: 40 },
  { value: 45 },
  { value: 55 },
  { value: 48 },
  { value: 65 },
  { value: 80 },
  { value: 95 },
  { value: 90 },
  { value: 110 },
  { value: 125 },
];

const mockPieData = [
  { name: "Phase 1", value: 400 },
  { name: "Phase 2", value: 300 },
  { name: "Phase 3", value: 150 },
  { name: "Approved", value: 100 },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { status } = useAuth();

  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { hovered, ref } = useHover();
  const isDark = colorScheme === "dark";

  const glowColor = isDark ? theme.colors.blue[8] : theme.colors.blue[4];

  const words = [
    "drug repurposing",
    "target discovery",
    "trial matching",
    "IP landscaping",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length]);

  const handleClick = () => {
    if (status === "authenticated") {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  const VIZ_COLORS = [
    theme.colors.blue[6],
    theme.colors.cyan[5],
    theme.colors.indigo[4],
    theme.colors.violet[5],
  ];

  return (
    <Box
      pt={{ base: 40, md: 40 }}
      pb={{ base: 80, md: 100 }}
      style={{
        position: "relative",
        overflow: "hidden",
        background: isDark
          ? `linear-gradient(180deg, ${theme.colors.dark[9]} 0%, ${theme.colors.dark[8]} 100%)`
          : `linear-gradient(180deg, ${theme.white} 0%, ${theme.colors.gray[0]} 100%)`,
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
          background: `radial-gradient(circle, ${
            isDark ? theme.colors.blue[9] : theme.colors.blue[0]
          } 0%, transparent 70%)`,
          filter: "blur(140px)",
          opacity: isDark ? 0.3 : 0.4,
          zIndex: 0,
        }}
      />

      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        <Grid align="center" gutter={60}>
          {/* LEFT — TEXT */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Box>
                <Badge
                  variant="filled"
                  size="md"
                  radius="sm"
                  color="blue"
                  mb="md"
                  style={{ textTransform: "none", letterSpacing: 1 }}
                >
                  NovusAI v1.0
                </Badge>

                <Title
                  order={1}
                  fw={900}
                  lh={1.2}
                  style={{ fontSize: "clamp(38px, 4.5vw, 54px)", letterSpacing: 1 }}
                >
                  AI copilot for <br />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{ display: "inline-block" }}
                    >
                      <Text
                        component="span"
                        variant="gradient"
                        gradient={{ from: "blue", to: "cyan" }}
                        inherit
                      >
                        {words[index]}.
                      </Text>
                    </motion.span>
                  </AnimatePresence>
                </Title>
              </Box>

              <Stack gap="sm">
                <Text c={isDark ? "gray.4" : "gray.7"} size="xl" lh={1.5} fw={600}>
                  The discovery engine that orchestrates global biomedical intelligence
                  to find your next breakthrough indication.
                </Text>

                <Text size="md" c="dimmed" lh={1.5} fw={500}>
                  Start from a simple question. Run structured evidence scans across 
                  literature, trials, and patents, and export decision-ready reports 
                  with full citation trails.
                </Text>
              </Stack>

              <Group pt="sm">
                <Button
                  ref={ref}
                  size="xl"
                  radius="xl"
                  px={40}
                  onClick={handleClick}
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    transition: "transform 250ms ease, box-shadow 250ms ease",
                    transform: hovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hovered
                      ? `0 15px 30px -5px rgba(0, 0, 0, 0.3), 0 0 20px ${glowColor}`
                      : isDark ? "0 8px 20px rgba(0,0,0,0.5)" : theme.shadows.md,
                  }}
                >
                  Start Discovery
                </Button>
              </Group>

              {/* Data Sources Trust Banner */}
              <Stack gap="xs" mt={15}>
                <Text
                  size="xs"
                  fw={800}
                  c="dimmed"
                  style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
                >
                  Synthesizing intelligence from
                </Text>
                <Group gap={10} align="center" style={{ opacity: 0.85 }}>
                  <Badge variant="default" radius="xl" size="lg" fw={600} style={{ textTransform: 'none', letterSpacing: 0.5 }}>
                    PubMed
                  </Badge>
                  <Badge variant="default" radius="xl" size="lg" fw={600} style={{ textTransform: 'none', letterSpacing: 0.5 }}>
                    ClinicalTrials.gov
                  </Badge>
                  <Badge variant="default" radius="xl" size="lg" fw={600} style={{ textTransform: 'none', letterSpacing: 0.5 }}>
                    EPO
                  </Badge>
                  <Badge variant="default" radius="xl" size="lg" fw={600} style={{ textTransform: 'none', letterSpacing: 0.5 }}>
                    DuckDuckGo
                  </Badge>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* RIGHT — HIGH-FIDELITY MOCKUP */}
          <Grid.Col span={{ base: 12, md: 6 }} visibleFrom="md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Paper
                radius="xl"
                p="lg"
                withBorder
                style={{
                  animation: "floating 8s ease-in-out infinite",
                  background: isDark
                    ? "rgba(26, 27, 30, 0.6)"
                    : "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(24px)",
                  boxShadow: isDark
                    ? "0 30px 60px -15px rgba(0,0,0,0.8), 0 0 40px rgba(34, 139, 230, 0.15)"
                    : "0 30px 60px -15px rgba(0,112,243,0.2)",
                }}
              >
                {/* Browser Controls */}
                <Group gap={8} mb="xl">
                  <Box w={12} h={12} bg="red.5" style={{ borderRadius: "50%" }} />
                  <Box w={12} h={12} bg="yellow.5" style={{ borderRadius: "50%" }} />
                  <Box w={12} h={12} bg="green.5" style={{ borderRadius: "50%" }} />
                </Group>

                {/* Dashboard Replica */}
                <Stack gap="md">
                  <Paper
                    p="md"
                    radius="lg"
                    withBorder
                    bg={isDark ? "rgba(0,0,0,0.2)" : "gray.0"}
                  >
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" fw={800}>
                        Evidence Trajectory Projection
                      </Text>
                      <Badge size="xs" color="blue" variant="dot">
                        Live Sync
                      </Badge>
                    </Group>
                    <Box h={120}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockAreaData}>
                          <defs>
                            <linearGradient
                              id="mockHeroGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor={theme.colors.blue[6]}
                                stopOpacity={0.5}
                              />
                              <stop
                                offset="95%"
                                stopColor={theme.colors.blue[6]}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={theme.colors.blue[6]}
                            strokeWidth={3}
                            fill="url(#mockHeroGradient)"
                            animationDuration={2000}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>

                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Paper
                        p="md"
                        radius="lg"
                        withBorder
                        bg={isDark ? "rgba(0,0,0,0.2)" : "gray.0"}
                        h="100%"
                      >
                        <Text size="xs" fw={800} c="dimmed" mb="sm">
                          CLINICAL PHASES
                        </Text>
                        <Box h={90} style={{ position: "relative" }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={mockPieData}
                                innerRadius={25}
                                outerRadius={40}
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                                animationDuration={1500}
                              >
                                {mockPieData.map((_, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={
                                      VIZ_COLORS[index % VIZ_COLORS.length]
                                    }
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </Box>
                      </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Paper
                        p="md"
                        radius="lg"
                        withBorder
                        bg={isDark ? "rgba(0,0,0,0.2)" : "gray.0"}
                        h="100%"
                      >
                        <Text size="xs" fw={800} c="dimmed" mb="xs">
                          TRIAL TARGET
                        </Text>
                        <Text fw={900} size="xl" c="blue.5">
                          Semaglutide
                        </Text>
                        <Text size="xs" mt="md" fw={600}>
                          Identified 12 independent trials supporting off-label
                          metabolic shifts.
                        </Text>
                      </Paper>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Paper>
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>

      <style>{`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;