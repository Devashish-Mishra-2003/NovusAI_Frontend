import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Box,
  useMantineTheme,
  useMantineColorScheme,
  Transition,
  Center,
  ThemeIcon,
} from "@mantine/core";
import { IconAlertCircle, IconShieldLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useHover } from "@mantine/hooks";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { hovered, ref } = useHover();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Stylish status state
  const [status, setStatus] = useState<{title: string, msg: string, type: 'error' | 'info'} | null>(null);

  const [emailPlaceholder, setEmailPlaceholder] = useState("");
  const [passPlaceholder, setPassPlaceholder] = useState("");
  const fullEmail = "researcher@biotech.com";
  const fullPass = "Your secure password";

  useEffect(() => {
    let emailIdx = 0;
    let passIdx = 0;
    const emailInterval = setInterval(() => {
      if (emailIdx <= fullEmail.length) {
        setEmailPlaceholder(fullEmail.substring(0, emailIdx));
        emailIdx++;
      } else clearInterval(emailInterval);
    }, 50);

    const passTimeout = setTimeout(() => {
      const passInterval = setInterval(() => {
        if (passIdx <= fullPass.length) {
          setPassPlaceholder(fullPass.substring(0, passIdx));
          passIdx++;
        } else clearInterval(passInterval);
      }, 50);
    }, 1000);

    return () => { clearInterval(emailInterval); clearTimeout(passTimeout); };
  }, []);

  const isDark = colorScheme === "dark";
  const glowColor = isDark ? theme.colors.blue[8] : theme.colors.blue[4];

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null); 
    try {
      await login(email, password);
      navigate("/chat");
    } catch (err: any) {
      const code = err?.response?.status;
      
      if (code === 403) {
        setStatus({
          title: "APPROVAL PENDING",
          msg: "Your account is awaiting administrator approval.",
          type: "info"
        });
      } else if (code === 401) {
        setStatus({
          title: "LOGIN FAILED",
          msg: "Invalid email or password.",
          type: "error"
        });
      } else {
        setStatus({
          title: "SERVICE ERROR",
          msg: "Unable to connect. Please try again later.",
          type: "error"
        });
      }
      setTimeout(() => setStatus(null), 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflowX: "hidden",
        background: isDark ? theme.colors.dark[9] : theme.colors.gray[0],
      }}
      py={40}
    >
      <Box
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "75%",
          height: "45%",
          background: `radial-gradient(circle, ${isDark ? theme.colors.blue[9] : theme.colors.blue[0]} 0%, transparent 70%)`,
          filter: "blur(120px)",
          opacity: isDark ? 0.2 : 0.35,
          zIndex: 0,
        }}
      />

      <Container size={440} style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Transition mounted transition="pop" duration={500} timingFunction="ease">
          {(styles) => (
            <Paper
              withBorder
              radius="xl"
              p={40}
              style={{
                ...styles,
                background: isDark ? "rgba(26, 27, 30, 0.85)" : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(16px)",
                boxShadow: theme.shadows.xl,
                border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[2]}`,
              }}
            >
              <Stack gap={25}>
                <Box ta="center">
                  <Title order={1} fw={900} size={32} style={{ letterSpacing: -1.2 }}>
                    Novus<span style={{ color: theme.colors.blue[6] }}>AI</span>
                  </Title>
                  <Text c="dimmed" size="xs" mt={4} fw={700} style={{ letterSpacing: 1, textTransform: "uppercase" }}>
                    Drug Repurposing Workspace
                  </Text>
                </Box>

                <Stack gap="md">
                  <TextInput
                    label="Email"
                    placeholder={emailPlaceholder}
                    size="sm"
                    radius="md"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                    styles={{ label: { marginBottom: 6, fontWeight: 700, fontSize: 13 } }}
                  />

                  <PasswordInput
                    label="Password"
                    placeholder={passPlaceholder}
                    size="sm"
                    radius="md"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                    styles={{ label: { marginBottom: 6, fontWeight: 700, fontSize: 13 } }}
                  />
                </Stack>

                {/* Animated Stylish Status Tag */}
                <Box style={{ minHeight: status ? 'auto' : 0, overflow: 'hidden', transition: 'all 0.3s ease' }}>
                  {status && (
                    <Transition mounted transition="slide-down" duration={400}>
                      {(styles) => (
                        <Paper
                          withBorder
                          p="xs"
                          radius="md"
                          style={{
                            ...styles,
                            background: status.type === 'error' 
                              ? 'rgba(250, 82, 82, 0.1)' 
                              : 'rgba(34, 139, 230, 0.1)',
                            borderColor: status.type === 'error' ? theme.colors.red[8] : theme.colors.blue[8],
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            animation: 'pulse-glow 2s infinite ease-in-out'
                          }}
                        >
                          <ThemeIcon 
                            variant="light" 
                            color={status.type === 'error' ? 'red' : 'blue'} 
                            radius="xl"
                          >
                            {status.type === 'error' ? <IconAlertCircle size={16}/> : <IconShieldLock size={16}/>}
                          </ThemeIcon>
                          <Box>
                            <Text size="10px" fw={900} style={{ letterSpacing: 0.5 }}>{status.title}</Text>
                            <Text size="xs" c="dimmed" fw={500}>{status.msg}</Text>
                          </Box>
                        </Paper>
                      )}
                    </Transition>
                  )}
                </Box>

                <Button
                  ref={ref}
                  loading={loading}
                  onClick={handleSubmit}
                  fullWidth
                  size="md"
                  radius="xl"
                  style={{
                    height: 48,
                    fontSize: 16,
                    fontWeight: 700,
                    transition: "all 300ms ease",
                    transform: hovered && !loading ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hovered && !loading ? `0 10px 20px -5px ${glowColor}` : theme.shadows.md,
                  }}
                >
                  Log in
                </Button>

                <Center>
                  <Text size="xs" c="dimmed" fw={500}>
                    Don’t have an account?{" "}
                    <Text
                      span
                      c="blue.6"
                      fw={800}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </Text>
                  </Text>
                </Center>
              </Stack>
            </Paper>
          )}
        </Transition>
      </Container>

      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0px rgba(34, 139, 230, 0); }
          50% { box-shadow: 0 0 10px rgba(34, 139, 230, 0.2); }
          100% { box-shadow: 0 0 0px rgba(34, 139, 230, 0); }
        }
      `}</style>
    </Box>
  );
};

export default LoginPage;