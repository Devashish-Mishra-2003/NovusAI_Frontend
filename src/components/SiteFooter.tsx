import React from "react";
import {
  Container,
  Group,
  Text,
  Title,
  Button,
  Stack,
  Box,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useHover } from "@mantine/hooks";
import { useAuth } from "../auth/AuthContext"; // ✅ ADDED

const FooterSection: React.FC = () => {
  const navigate = useNavigate();
  const { status } = useAuth(); // ✅ ADDED
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { hovered, ref } = useHover();
  
  const isDark = colorScheme === "dark";
  const glowColor = isDark ? theme.colors.blue[8] : theme.colors.blue[4];

  // ✅ ADDED — ONLY LOGIC
  const handleClick = () => {
    if (status === "authenticated") {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      component="footer"
      py={40}
      style={{
        borderTop: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
        background: isDark 
          ? theme.colors.dark[9] 
          : `linear-gradient(180deg, ${theme.colors.gray[0]} 0%, ${theme.white} 100%)`,
      }}
    >
      <Container size="lg">
        <Group justify="space-between" align="center">
          {/* Brand Column */}
          <Stack gap={4}>
            <Title order={3} fw={900} style={{ letterSpacing: -0.5 }}>
              Novus<span style={{ color: theme.colors.blue[6] }}>AI</span>
            </Title>
            <Text size="xs" c="dimmed" fw={500}>
              AI copilot for evidence-backed drug repurposing.
            </Text>
          </Stack>

          {/* Action Column */}
          <Group gap="xl" align="center">
            {/* Contact & Copyright Info */}
            <Stack gap={2} align="flex-end">
              <Text size="xs" c="dimmed" fw={600} style={{ cursor: "pointer" }}>
                founders@novusai.example
              </Text>
              <Text size="xs" c="dimmed" style={{ opacity: 0.7 }}>
                © {new Date().getFullYear()} NovusAI
              </Text>
            </Stack>

            <Button
              ref={ref}
              size="md"
              radius="xl"
              onClick={handleClick} // ✅ WIRED
              style={{
                transition: "all 300ms ease",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered 
                  ? `0 10px 20px -5px rgba(0, 0, 0, 0.2), 0 0 15px ${glowColor}`
                  : theme.shadows.sm,
                animation: hovered ? "none" : "pulse-glow 3s infinite",
              }}
            >
              Try NovusAI
            </Button>
          </Group>
        </Group>
      </Container>

      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0px ${isDark ? 'rgba(24, 100, 242, 0.2)' : 'rgba(24, 100, 242, 0.1)'}; }
          70% { box-shadow: 0 0 0 10px rgba(24, 100, 242, 0); }
          100% { box-shadow: 0 0 0 0px rgba(24, 100, 242, 0); }
        }
      `}</style>
    </Box>
  );
};

export default FooterSection;
