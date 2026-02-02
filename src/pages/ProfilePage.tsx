import React from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Divider,
  Button,
  Box,
  Badge,
  Avatar,
  ThemeIcon,
  useMantineTheme,
  useMantineColorScheme,
  ActionIcon,
  SimpleGrid,
  Paper,
} from "@mantine/core";
import { 
  IconBuildingSkyscraper, 
  IconMail, 
  IconCloudUpload, 
  IconArrowLeft,
  IconLock,
  IconLogout,
  IconCircleCheck
} from "@tabler/icons-react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import DocumentUpload from "../components/DocumentUpload";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  if (!user) return null;

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? theme.colors.dark[9] : "#ffffff",
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* System Header */}
      <Box 
        component="header" 
        px="xl" 
        py="md" 
        style={{ 
          borderBottom: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[2]}`,
          backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0] 
        }}
      >
        <Container size="lg">
          <Group justify="space-between">
            <Group>
              <ActionIcon 
                variant="light" 
                color="blue" 
                onClick={() => navigate(-1)} 
                radius="xl"
                size="lg"
                className="back-btn"
              >
                <IconArrowLeft size={20} />
              </ActionIcon>
              <Divider orientation="vertical" />
              <Text fw={800} size="xs" style={{ letterSpacing: 1.5 }}>USER IDENTITY & VAULT</Text>
            </Group>
            
            <Button
              variant="filled"
              color="blue"
              radius="xl"
              size="sm"
              onClick={() => navigate("/chat")}
              className="pill-btn"
            >
              Open Discovery Engine
            </Button>
          </Group>
        </Container>
      </Box>

      {/* Main Content */}
      <Box style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Container size="lg" py={40} style={{ width: '100%' }}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={50} style={{ alignItems: 'stretch' }}>
            
            {/* Left Column */}
            <Paper 
              withBorder 
              p={40} 
              radius="xl" 
              style={{ 
                backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Stack gap="xl">
                <Box>
                  <Avatar 
                    size={100} 
                    radius="xl" 
                    variant="gradient" 
                    gradient={{ from: 'blue.6', to: 'cyan.4' }}
                    mb="md"
                  >
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                  <Title order={2} fw={900} style={{ letterSpacing: -1 }}>
                    {user.name}
                  </Title>
                  <Group gap={8} mt={5}>
                    <Badge variant="dot" color="blue" size="sm">
                      ID: {user.user_id.toString().padStart(5, "0")}
                    </Badge>
                    <Badge variant="light" color="green" leftSection={<IconCircleCheck size={10}/>} size="sm">
                      Active
                    </Badge>
                  </Group>
                </Box>

                <Stack gap="sm">
                  <Divider label="Identity Attributes" labelPosition="left" />
                  <Group wrap="nowrap" gap="sm">
                    <ThemeIcon variant="transparent" color="blue" size="sm">
                      <IconMail size={16} />
                    </ThemeIcon>
                    <Text size="sm" fw={500} truncate>
                      {user.email}
                    </Text>
                  </Group>
                  <Group wrap="nowrap" gap="sm">
                    <ThemeIcon variant="transparent" color="blue" size="sm">
                      <IconBuildingSkyscraper size={16} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>
                      {user.company_name || "Independent Researcher"}
                    </Text>
                  </Group>
                  <Group wrap="nowrap" gap="sm">
                    <ThemeIcon variant="transparent" color="blue" size="sm">
                      <IconLock size={16} />
                    </ThemeIcon>
                    <Badge color="blue" variant="outline" radius="sm" size="xs">
                      {(user.role || "user").toUpperCase()}
                    </Badge>
                  </Group>
                </Stack>
              </Stack>

              <Button
                color="red"
                variant="light"
                radius="xl"
                fullWidth
                mt={30}
                leftSection={<IconLogout size={18} />}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="signout-pill"
              >
                Sign Out
              </Button>
            </Paper>

            {/* Right Column */}
            <Box style={{ gridColumn: 'span 2' }}>
              <Paper
                p={40}
                radius="xl"
                withBorder
                style={{
                  height: '100%',
                  borderStyle: 'dashed',
                  borderColor: theme.colors.blue[isDark ? 8 : 2],
                  background: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  transition: 'all 0.3s ease',
                }}
                className="vault-zone"
              >
                <ThemeIcon size={80} radius="xl" variant="light" color="blue">
                  <IconCloudUpload size={40} stroke={1.5} />
                </ThemeIcon>
                
                <Stack align="center" gap={8} ta="center" maw={500}>
                  <Text fw={900} size="xl">Knowledge Base Integration</Text>
                  <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                    Upload private research, PDFs, and clinical trial datasets. 
                    These assets will be indexed into your private discovery environment.
                  </Text>
                </Stack>

                {user.role === "admin" ? (
                  <DocumentUpload />
                ) : (
                  <Text size="sm" c="dimmed">
                    Only administrators can upload documents to the knowledge vault.
                  </Text>
                )}
              </Paper>
            </Box>

          </SimpleGrid>
        </Container>
      </Box>

      <style>{`
        .back-btn:hover {
          transform: translateX(-4px);
        }
        .pill-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 15px -5px rgba(34, 139, 230, 0.4);
        }
        .signout-pill {
          transition: all 0.2s ease;
        }
        .signout-pill:hover {
          background-color: ${theme.colors.red[6]} !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(250, 82, 82, 0.3);
        }
        .vault-zone:hover {
          border-color: ${theme.colors.blue[5]} !important;
          background-color: ${isDark ? theme.colors.dark[7] : theme.white} !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -10px rgba(0, 112, 243, 0.1);
        }
      `}</style>
    </Box>
  );
};

export default ProfilePage;