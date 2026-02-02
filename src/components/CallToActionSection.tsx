import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Center,
  Box,
  Transition,
  useMantineTheme,
  useMantineColorScheme,
  Text,
  Stack,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useAuth } from "../auth/AuthContext"; // ✅ added

const CallToActionSection: React.FC = () => {
  const navigate = useNavigate();
  const { status } = useAuth(); // ✅ added
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
      py={80}
      style={{
        background: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
        borderTop: `1px solid ${
          isDark ? theme.colors.dark[6] : theme.colors.gray[3]
        }`,
        borderBottom: `1px solid ${
          isDark ? theme.colors.dark[6] : theme.colors.gray[3]
        }`,
      }}
    >
      <Container size="md">
        <Stack align="center" gap="lg">
          <Stack align="center" gap={4}>
            <Text
              size="xl"
              fw={700}
              c={isDark ? "blue.4" : "blue.7"}
              style={{ letterSpacing: 0.5, textAlign: "center" }}
            >
              READY TO REVOLUTIONIZE DISCOVERY?
            </Text>
            <Text
              c={isDark ? "gray.5" : "gray.7"}
              size="lg"
              style={{ textAlign: "center" }}
            >
              Experience the future of drug repurposing with NovusAI.
            </Text>
          </Stack>

          <Center>
            <Transition mounted transition="pop" duration={600} timingFunction="ease">
              {(styles) => (
                <Button
                  ref={ref}
                  size="xl"
                  radius="xl"
                  onClick={handleClick} // ✅ wired
                  style={{
                    ...styles,
                    transform: `${styles.transform} ${
                      hovered ? "translateY(-8px)" : "translateY(0)"
                    }`,
                    boxShadow: hovered
                      ? `0 10px 20px -5px rgba(0, 0, 0, 0.2), 0 0 15px ${glowColor}`
                      : theme.shadows.md,
                    transition:
                      "transform 250ms ease, box-shadow 250ms ease, background-color 250ms ease",
                    paddingLeft: 40,
                    paddingRight: 40,
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  Try NovusAI now
                </Button>
              )}
            </Transition>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
};

export default CallToActionSection;
