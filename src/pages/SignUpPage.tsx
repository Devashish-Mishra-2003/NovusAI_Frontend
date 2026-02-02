import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  SegmentedControl,
  Select,
  Box,
  Transition,
  useMantineTheme,
  useMantineColorScheme,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { signupCompany, signupEmployee } from "../api/auth";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api/client";
import { useHover } from "@mantine/hooks";

type Mode = "company" | "employee";

type Company = {
  id: number;
  name: string;
};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { hovered, ref } = useHover();

  const [mode, setMode] = useState<Mode>("company");
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDark = colorScheme === "dark";
  const glowColor = isDark ? theme.colors.blue[8] : theme.colors.blue[4];

  // --- Dynamic Placeholder Logic ---
  const [namePlaceholder, setNamePlaceholder] = useState("");
  const [emailPlaceholder, setEmailPlaceholder] = useState("");
  const fullName = mode === "company" ? "Alex Rivera (Admin)" : "Dr. Sarah Chen";
  const fullEmail = "researcher@biotech.com";

  useEffect(() => {
    let nIdx = 0;
    let eIdx = 0;
    const nTimer = setInterval(() => {
      if (nIdx <= fullName.length) {
        setNamePlaceholder(fullName.substring(0, nIdx));
        nIdx++;
      } else clearInterval(nTimer);
    }, 40);

    const eTimer = setTimeout(() => {
      const inner = setInterval(() => {
        if (eIdx <= fullEmail.length) {
          setEmailPlaceholder(fullEmail.substring(0, eIdx));
          eIdx++;
        } else clearInterval(inner);
      }, 30);
    }, 800);

    return () => { clearInterval(nTimer); clearTimeout(eTimer); };
  }, [mode]);

  useEffect(() => {
    if (mode !== "employee") return;
    setLoadingCompanies(true);
    api.get("/auth/companies")
      .then((res) => setCompanies(res.data))
      .catch(() => {
        notifications.show({ color: "red", title: "Failed to load companies", message: "Please try again later." });
      })
      .finally(() => setLoadingCompanies(false));
  }, [mode]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === "company") {
        const { access_token } = await signupCompany({ company_name: companyName, admin_name: name, email, password });
        sessionStorage.setItem("novus_token", access_token);
        await refresh();
        navigate("/chat");
      } else {
        await signupEmployee({ company_name: companyName, name, email, password });
        notifications.show({ color: "blue", title: "Signup successful", message: "Account created. Awaiting admin approval." });
        navigate("/login");
      }
    } catch {
      notifications.show({ color: "red", title: "Signup failed", message: "Please check your details." });
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
      py={40} // Added vertical padding to prevent touching screen edges
    >
      <Box
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "40%",
          background: `radial-gradient(circle, ${isDark ? theme.colors.blue[9] : theme.colors.blue[0]} 0%, transparent 70%)`,
          filter: "blur(120px)",
          opacity: isDark ? 0.2 : 0.35,
          zIndex: 0,
        }}
      />

      <Container size={480} style={{ position: "relative", zIndex: 1, width: '100%' }}>
        <Transition mounted transition="pop" duration={500} timingFunction="ease">
          {(styles) => (
            <Paper
              withBorder
              radius="xl"
              p={40} // Tightened padding from 50 to 40
              style={{
                ...styles,
                background: isDark ? "rgba(26, 27, 30, 0.85)" : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(16px)",
                boxShadow: theme.shadows.xl,
                border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[2]}`,
              }}
            >
              <Stack gap={25}> {/* Tightened gap from 30 to 25 */}
                <Box ta="center">
                  <Title order={1} fw={900} size={32} style={{ letterSpacing: -1.2 }}>
                    Novus<span style={{ color: theme.colors.blue[6] }}>AI</span>
                  </Title>
                  <Text c="dimmed" size="xs" mt={4} fw={700} style={{ letterSpacing: 1, textTransform: 'uppercase' }}>
                    Create Discovery Account
                  </Text>
                </Box>

                <SegmentedControl
                  value={mode}
                  onChange={(v) => { setMode(v as Mode); setCompanyName(""); }}
                  radius="xl"
                  size="sm"
                  data={[{ label: "Company admin", value: "company" }, { label: "Employee", value: "employee" }]}
                  fullWidth
                />

                <Stack gap="md">
                  {mode === "company" ? (
                    <TextInput
                      label="Company name"
                      placeholder="e.g. Novus Pharma"
                      size="sm"
                      radius="md"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.currentTarget.value)}
                      required
                      styles={{ label: { marginBottom: 4, fontWeight: 700, fontSize: 13 } }}
                    />
                  ) : (
                    <Select
                      label="Select Company"
                      size="sm"
                      radius="md"
                      placeholder={loadingCompanies ? "Loading..." : "Select organization"}
                      data={companies.map((c) => ({ value: c.name, label: c.name }))}
                      value={companyName}
                      onChange={(value) => setCompanyName(value ?? "")}
                      disabled={loadingCompanies}
                      required
                      styles={{ label: { marginBottom: 4, fontWeight: 700, fontSize: 13 } }}
                    />
                  )}

                  <TextInput
                    label={mode === "company" ? "Admin name" : "Your name"}
                    placeholder={namePlaceholder}
                    size="sm"
                    radius="md"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                    styles={{ label: { marginBottom: 4, fontWeight: 700, fontSize: 13 } }}
                  />

                  <TextInput
                    label="Email"
                    placeholder={emailPlaceholder}
                    size="sm"
                    radius="md"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                    styles={{ label: { marginBottom: 4, fontWeight: 700, fontSize: 13 } }}
                  />

                  <PasswordInput
                    label="Password"
                    placeholder="Min. 8 characters"
                    size="sm"
                    radius="md"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                    styles={{ label: { marginBottom: 4, fontWeight: 700, fontSize: 13 } }}
                  />
                </Stack>

                <Button
                  ref={ref}
                  loading={loading}
                  onClick={handleSubmit}
                  fullWidth
                  size="md"
                  radius="xl"
                  disabled={mode === "employee" && !companyName}
                  style={{
                    height: 48,
                    fontSize: 16,
                    fontWeight: 700,
                    transition: "all 300ms ease",
                    transform: hovered && !loading ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hovered && !loading ? `0 10px 20px -5px ${glowColor}` : theme.shadows.md,
                  }}
                >
                  {mode === "company" ? "Create company" : "Request access"}
                </Button>

                <Center>
                  <Text size="xs" c="dimmed" fw={500}>
                    Already have an account?{" "}
                    <Text span c="blue.6" fw={800} style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
                      Log in
                    </Text>
                  </Text>
                </Center>
              </Stack>
            </Paper>
          )}
        </Transition>
      </Container>
    </Box>
  );
};

export default SignupPage;