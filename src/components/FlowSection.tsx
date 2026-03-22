import React, { useRef, useState, useEffect } from "react";
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
  Badge,
  Code,
  ThemeIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  IconBrain,
  IconDatabase,
  IconRobot,
  IconChartBar,
  IconSearch,
  IconArrowDown,
  IconCheck,
} from "@tabler/icons-react";

const steps = [
  {
    title: "Formulate Hypothesis",
    description: "Start with a natural-language query specifying the indication or molecule.",
    icon: IconBrain,
  },
  {
    title: "Ground in Reality",
    description: "Upload internal trial data or proprietary notes so the model reasons safely.",
    icon: IconDatabase,
  },
  {
    title: "Multi-Agent Extraction",
    description: "NLP agents scan millions of papers in parallel, transforming text to structured data.",
    icon: IconRobot,
  },
  {
    title: "Ranked Validations",
    description: "Review a curated, ranked list of repurposing candidates with detailed rationale.",
    icon: IconChartBar,
  },
];

const StepVisualizer: React.FC<{ activeIndex: number; isDark: boolean; isMobile?: boolean }> = ({
  activeIndex,
  isDark,
  isMobile,
}) => {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        width: "100%",
        height: "auto",
        minHeight: isMobile ? 180 : 420,
        borderRadius: theme.radius.xl,
        border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        backgroundColor: isDark ? "rgba(26, 27, 30, 0.6)" : "rgba(248, 249, 250, 0.7)",
        backdropFilter: "blur(20px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? theme.spacing.sm : theme.spacing.xl,
        boxShadow: isDark
          ? "inset 0 0 60px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.4)"
          : "inset 0 0 60px rgba(255,255,255,1), 0 20px 40px rgba(0,0,0,0.05)",
      }}
    >
      <AnimatePresence mode="wait">
        {activeIndex === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            style={{ width: "100%" }}
          >
            <Paper p={isMobile ? "md" : "xl"} radius="lg" withBorder shadow="md" bg={isDark ? "dark.8" : "white"}>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="xs" fw={800} c="blue.5" style={{ letterSpacing: 1 }}>
                    COPILOT QUERY
                  </Text>
                  <Badge size="xs" variant="dot" color="green">Ready</Badge>
                </Group>
                
                <Group
                  p="sm"
                  style={{
                    backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[0],
                    borderRadius: theme.radius.md,
                    border: `1px solid ${isDark ? theme.colors.dark[6] : theme.colors.gray[3]}`,
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
                  }}
                  wrap="nowrap"
                >
                  <IconSearch size={18} color={theme.colors.blue[6]} />
                  <Text fw={600} size={isMobile ? "sm" : "md"} c={isDark ? "gray.3" : "dark.8"} style={{ flex: 1 }}>
                    Identify alternative indications...
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
                      style={{ color: theme.colors.blue[6], marginLeft: 2 }}
                    >
                      |
                    </motion.span>
                  </Text>
                </Group>

                <Group gap="xs" mt="xs">
                  <Badge variant="light" color="gray" size="sm" style={{ cursor: 'pointer' }}>+ semaglutide</Badge>
                  <Badge variant="light" color="gray" size="sm" style={{ cursor: 'pointer' }}>+ glp-1</Badge>
                  <Badge variant="light" color="gray" size="sm" style={{ cursor: 'pointer' }}>+ metabolic</Badge>
                </Group>
              </Stack>
            </Paper>
          </motion.div>
        )}

        {activeIndex === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: "100%" }}
          >
            <Stack align="center" gap="lg">
              <Box pos="relative" w="100%">
                {/* Decorative background stacked files */}
                <Paper
                  radius="lg"
                  withBorder
                  style={{ position: 'absolute', top: -10, left: 10, right: -10, bottom: 10, opacity: 0.4, transform: 'rotate(2deg)', zIndex: 0 }}
                  bg={isDark ? "dark.6" : "gray.2"}
                />
                <Paper
                  radius="lg"
                  withBorder
                  style={{ position: 'absolute', top: -5, left: 5, right: -5, bottom: 5, opacity: 0.7, transform: 'rotate(1deg)', zIndex: 1 }}
                  bg={isDark ? "dark.7" : "gray.1"}
                />
                
                {/* Main File */}
                <Paper
                  p="lg"
                  radius="lg"
                  withBorder
                  style={{ position: 'relative', zIndex: 2, borderStyle: "solid", borderColor: theme.colors.blue[5], borderWidth: 2 }}
                  bg={isDark ? "dark.8" : "white"}
                  shadow="lg"
                  w="100%"
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Group wrap="nowrap">
                      <ThemeIcon size={isMobile ? 40 : 54} radius="md" variant="light" color="blue">
                        <IconDatabase size={isMobile ? 24 : 32} stroke={1.5} />
                      </ThemeIcon>
                      <Stack gap={4}>
                        <Text fw={800} size={isMobile ? "sm" : "md"}>Proprietary_Clinical_Notes.pdf</Text>
                        <Text size="xs" c="dimmed" fw={600}>
                          14,029 pages • Secure Vault
                        </Text>
                      </Stack>
                    </Group>
                    <ThemeIcon color="teal" radius="xl" variant="filled" size={isMobile ? "md" : "lg"} style={{ boxShadow: `0 0 15px ${theme.colors.teal[6]}` }}>
                      <IconCheck size={isMobile ? 14 : 18} stroke={3} />
                    </ThemeIcon>
                  </Group>
                </Paper>
              </Box>
            </Stack>
          </motion.div>
        )}

        {activeIndex === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            style={{ width: "100%" }}
          >
            <Stack align="center" gap="md">
              <Paper p="md" radius="md" withBorder w="100%" bg={isDark ? "dark.7" : "white"} shadow="sm">
                <Group gap={8} mb="xs">
                  <Badge size="xs" color="indigo" variant="filled">Input Source</Badge>
                </Group>
                <Text size={isMobile ? "xs" : "sm"} c={isDark ? "gray.4" : "dark.4"} style={{ fontStyle: "italic", lineHeight: 1.5 }}>
                  "Cohort exhibited profoundly <Text component="span" c="red" fw={800}>decreased</Text> <Text component="span" c="blue" fw={800}>inflammation</Text> following <Text component="span" c="teal" fw={800}>GLP-1 administration</Text>..."
                </Text>
              </Paper>
              
              <Box>
                <IconArrowDown size={24} color={theme.colors.cyan[6]} />
              </Box>

              <Paper
                p={0}
                radius="md"
                withBorder
                w="100%"
                bg={isDark ? "dark.9" : "gray.9"}
                style={{ overflow: 'hidden', borderColor: theme.colors.cyan[8], boxShadow: `0 0 20px rgba(11, 114, 133, 0.4)` }}
              >
                <Group bg="rgba(0,0,0,0.3)" px="md" py="xs" style={{ borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
                  <Group gap={6}>
                    <Box w={10} h={10} bg="red.5" style={{ borderRadius: "50%" }} />
                    <Box w={10} h={10} bg="yellow.5" style={{ borderRadius: "50%" }} />
                    <Box w={10} h={10} bg="green.5" style={{ borderRadius: "50%" }} />
                  </Group>
                  <Text size="xs" c="gray.5" fw={600} style={{ flex: 1, textAlign: 'center' }}>Extraction_Agent.json</Text>
                </Group>
                <Box p="sm">
                  <Code block color="cyan" bg="transparent" c="cyan.3" style={{ fontSize: isMobile ? 12 : 14 }}>
                    {`{
  "entity": "inflammation",
  "trend": "decreased",
  "confidence": 0.94
}`}
                  </Code>
                </Box>
              </Paper>
            </Stack>
          </motion.div>
        )}

        {activeIndex === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: "100%" }}
          >
            <Stack gap="md">
              <Text size="xs" fw={800} c="dimmed" style={{ letterSpacing: 1 }}>RANKED TARGETS</Text>
              {[
                { target: "Cardiovascular Risk", score: 98 },
                { target: "NASH / Fibrosis", score: 85 },
                { target: "Cognitive Decline", score: 62 },
              ].map((item, idx) => (
                <Paper
                  key={idx}
                  p={isMobile ? 6 : "md"}
                  radius="lg"
                  withBorder
                  bg={isDark ? "dark.8" : "white"}
                  mb={isMobile ? 2 : 0}
                  style={{
                    borderColor: idx === 0 ? theme.colors.blue[6] : undefined,
                    boxShadow: idx === 0 ? `0 0 20px rgba(34,139,230,0.15)` : "none",
                    transform: idx === 0 ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.2s ease"
                  }}
                >
                  <Group justify="space-between" wrap="nowrap" mb={isMobile ? 4 : "xs"}>
                    <Text fw={800} size={isMobile ? "xs" : "md"} c={isDark ? "white" : "dark.9"} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.target}</Text>
                    <Badge size={isMobile ? "xs" : "md"} variant={idx === 0 ? "filled" : "light"} color={item.score > 90 ? "blue" : item.score > 80 ? "teal" : "gray"}>
                      {item.score}% Match
                    </Badge>
                  </Group>
                  
                  {/* Visual Progress Bar */}
                  <Box w="100%" h={isMobile ? 4 : 6} bg={isDark ? "dark.6" : "gray.2"} style={{ borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      style={{ height: '100%', backgroundColor: theme.colors[item.score > 90 ? "blue" : item.score > 80 ? "teal" : "gray"][5] }}
                    />
                  </Box>
                </Paper>
              ))}
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const FlowSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isMobile = useMediaQuery("(max-width: 768px)");

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track continuous scroll progress mapped across the heights
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return; // Disabled scroll tracking explicitly on mobile
    let step = Math.floor(latest * steps.length);
    if (step >= steps.length) step = steps.length - 1;
    if (step < 0) step = 0;
    
    // Only trigger re-render if it actually changed
    if (step !== active) {
      setActive(step);
    }
  });

  // Mobile fallback auto-cycle
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(id);
  }, [isMobile]);

  if (isMobile) {
    const progressWidth = (active / (steps.length - 1)) * 100;

    return (
      <Box 
        py={60} 
        bg={isDark ? "dark.9" : "gray.0"} 
        style={{ borderTop: `1px solid ${isDark ? theme.colors.dark[7] : theme.colors.gray[2]}` }}
      >
        <Container size="md">
          {/* Header */}
          <Stack align="center" mb={50}>
            <Text fw={800} size="xs" c="blue.6" style={{ letterSpacing: 2, textTransform: "uppercase" }}>
              The Novus Engine
            </Text>
            <Title order={2} fw={900} ta="center" size={26} style={{ letterSpacing: -1, lineHeight: 1.1 }}>
              A Complete Scientific Workflow
            </Title>
            <Text c="dimmed" ta="center" size="sm" fw={600}>
              Discover our proprietary data extraction pipeline designed for extreme validation.
            </Text>
          </Stack>

          {/* Dynamic Progress Track */}
          <Box mb={40} pos="relative" px={20}>
            <Box
              pos="absolute"
              top="50%"
              left={20}
              right={20}
              h={2}
              style={{
                backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[3],
                zIndex: 0,
                transform: "translateY(-50%)",
              }}
            />
            <Box
              pos="absolute"
              top="50%"
              left={20}
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
              {steps.map((_, index) => {
                const isPastOrCurrent = index <= active;
                const isCurrent = index === active;
                return (
                  <Box
                    key={index}
                    w={16}
                    h={16}
                    onClick={() => setActive(index)}
                    style={{
                      borderRadius: "50%",
                      backgroundColor: isPastOrCurrent ? theme.colors.blue[6] : (isDark ? theme.colors.dark[4] : theme.colors.gray[4]),
                      border: `2px solid ${isDark ? theme.colors.dark[9] : theme.white}`,
                      boxShadow: isCurrent 
                        ? `0 0 0 4px ${isDark ? 'rgba(34, 139, 230, 0.2)' : 'rgba(34, 139, 230, 0.1)'}, 0 0 15px ${theme.colors.blue[6]}` 
                        : "none",
                      transition: "all 600ms ease",
                      transform: isCurrent ? "scale(1.2)" : "scale(1)",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </Group>
          </Box>

          <Grid gutter={20}>
            {steps.map((step, index) => {
              const isActive = index === active;
              const Icon = step.icon;
              return (
                <Grid.Col key={index} span={12}>
                  <Paper
                    withBorder
                    radius="xl"
                    p="lg"
                    style={{
                      backgroundColor: isActive ? (isDark ? theme.colors.dark[8] : theme.white) : "transparent",
                      borderColor: isActive ? theme.colors.blue[5] : (isDark ? "transparent" : theme.colors.gray[2]),
                      transform: isActive ? "translateY(-5px)" : "translateY(0)",
                      boxShadow: isActive ? `0 20px 25px -5px rgba(0, 0, 0, 0.1)` : "none",
                      opacity: isActive ? 1 : 0.5,
                      transition: "all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <Stack gap="sm">
                      <Group wrap="nowrap" align="center">
                        <ThemeIcon 
                          size={40} 
                          radius="md" 
                          variant={isActive ? "filled" : "light"} 
                          color="blue"
                          style={{
                            transition: "all 400ms ease",
                            transform: isActive ? "rotate(10deg)" : "none",
                          }}
                        >
                          <Icon size={20} stroke={1.5} />
                        </ThemeIcon>
                        <Title order={5} size="md" fw={800} c={isActive ? (isDark ? "white" : "dark.9") : "dimmed"}>
                          {step.title}
                        </Title>
                      </Group>
                      <Text size="sm" c="dimmed" lh={1.5} fw={500}>
                        {step.description}
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box ref={containerRef} style={{ height: "400vh", position: "relative" }}>
      <Box
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden", 
          backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[0],
          borderTop: `1px solid ${isDark ? theme.colors.dark[7] : theme.colors.gray[2]}`,
          borderBottom: `1px solid ${isDark ? theme.colors.dark[7] : theme.colors.gray[2]}`,
        }}
      >
        <Container size="lg" w="100%">
          {/* Header */}
          <Stack align="center" mb={50}>
            <Text
              fw={800}
              size="xs"
              c="blue.6"
              style={{ letterSpacing: 2, textTransform: "uppercase" }}
            >
              The Novus Engine
            </Text>
            <Title order={2} fw={900} ta="center" size={40} style={{ letterSpacing: -1, lineHeight: 1.1 }}>
              A Complete Scientific Workflow
            </Title>
            <Text c="dimmed" ta="center" fw={500} size="md">
              Keep scrolling to progress through our proprietary data extraction pipeline designed for extreme validation.
            </Text>
          </Stack>

          <Grid gutter={50} align="center">
            {/* LEFT SIDE: Vertical Text Steps */}
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Stack gap={50} pr={{ md: 40 }}>
                {steps.map((step, index) => {
                  const isActive = index === active;
                  const Icon = step.icon;

                  return (
                    <Box
                      key={index}
                      style={{
                        position: "relative",
                        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                        opacity: isActive ? 1 : 0.4,
                        transform: isActive ? "translateX(10px)" : "none",
                      }}
                    >
                      <Group wrap="nowrap" align="flex-start">
                        <ThemeIcon
                          size={32}
                          mt={4}
                          radius="md"
                          variant={isActive ? "gradient" : "light"}
                          gradient={isActive ? { from: "blue", to: "cyan" } : undefined}
                          color={isActive ? undefined : "gray"}
                        >
                          <Icon size={18} stroke={1.5} />
                        </ThemeIcon>

                        <Box pt={0}>
                          <Title
                            order={4}
                            fw={800}
                            c={isDark ? "white" : "dark.9"}
                            style={{ letterSpacing: -0.5, fontSize: 22 }}
                          >
                            {step.title}
                          </Title>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                              >
                                <Text mt={4} size="md" c="dimmed" lh={1.5} fw={500}>
                                  {step.description}
                                </Text>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Box>
                      </Group>
                    </Box>
                  );
                })}
              </Stack>
            </Grid.Col>

            {/* RIGHT SIDE: Mockup Visual (Desktop Only) */}
            <Grid.Col span={{ base: 12, md: 7 }} visibleFrom="md">
              <StepVisualizer activeIndex={active} isDark={isDark} />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default FlowSection;