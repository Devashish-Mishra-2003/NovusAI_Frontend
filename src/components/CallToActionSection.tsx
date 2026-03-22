import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Box,
  Transition,
  useMantineTheme,
  useMantineColorScheme,
  Text,
  Stack,
  Title,
  Badge,
  Paper,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";
import { useAuth } from "../auth/AuthContext";

const CallToActionSection: React.FC = () => {
  const navigate = useNavigate();
  const { status } = useAuth();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { hovered, ref } = useHover();

  const isDark = colorScheme === "dark";
  const glowColor = isDark ? "rgba(34, 139, 230, 0.4)" : "rgba(34, 139, 230, 0.3)";

  const handleClick = () => {
    if (status === "authenticated") {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      py={{ base: 60, md: 100 }}
      style={{
        background: isDark ? theme.colors.dark[9] : theme.colors.gray[0],
      }}
    >
      <Container size="lg">
        <Paper
          radius="xl"
          p={{ base: "xl", md: 60 }}
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: isDark ? theme.colors.dark[8] : theme.white,
            border: `1px solid ${
              isDark ? theme.colors.dark[5] : theme.colors.gray[3]
            }`,
            boxShadow: isDark 
              ? "0 30px 60px -12px rgba(0,0,0,0.5), 0 0 40px rgba(34, 139, 230, 0.05)" 
              : "0 30px 60px -12px rgba(34, 139, 230, 0.15)",
          }}
        >
          <Stack align="center" gap="xl" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Badge variant="light" color="blue" size="lg" radius="xl" style={{ letterSpacing: 1.5, textTransform: "uppercase" }}>
              Start for Free
            </Badge>

            <Title
              order={2}
              fw={900}
              size={48}
              style={{ letterSpacing: -1.5, lineHeight: 1.1 }}
            >
              Ready to revolutionize{" "}
              <Box component="span" style={{ display: "inline-block" }}>
                <Text component="span" c="blue.5" inherit>
                  discovery?
                </Text>
              </Box>
            </Title>

            <Text size="xl" c="dimmed" maw={600} fw={500}>
              Join leading researchers and analysts evaluating hypotheses 50x faster. Set up your first extraction pipeline in seconds.
            </Text>

            <Box mt="lg">
              <Transition mounted transition="pop" duration={600} timingFunction="ease">
                {(styles) => (
                  <Button
                    ref={ref}
                    size="xl"
                    radius="xl"
                    color="blue.6"
                    rightSection={<IconArrowRight size={20} />}
                    onClick={handleClick}
                    style={{
                      ...styles,
                      transform: hovered ? "translateY(-6px)" : "translateY(0)",
                      boxShadow: hovered
                        ? `0 15px 25px -5px rgba(0, 0, 0, 0.2), 0 0 25px ${glowColor}`
                        : "0 8px 15px -5px rgba(0,0,0,0.1)",
                      transition: "all 300ms cubic-bezier(0.25, 0.8, 0.25, 1)",
                      paddingLeft: 40,
                      paddingRight: 40,
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    Try NovusAI Now
                  </Button>
                )}
              </Transition>
            </Box>

            <Text size="sm" c="dimmed" fw={600} mt="md" style={{ letterSpacing: 0.5 }}>
              No credit card required. Up to 5 free scans per day.
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CallToActionSection;
