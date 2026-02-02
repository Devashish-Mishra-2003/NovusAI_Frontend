import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Paper,
  Text,
  Button,
  Group,
  Stack,
  Loader,
  Center,
  ThemeIcon,
  Box,
  useMantineTheme,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { 
  IconUserCheck, 
  IconMail, 
  IconInbox, 
  IconShieldCheck, 
  IconRefresh 
} from "@tabler/icons-react";
import { getPendingUsers, approveUser } from "../api/admin";
import type { PendingUser } from "../api/admin";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

const AdminApprovalsPage: React.FC = () => {
  const { status, user } = useAuth();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [pending, setPending] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  const loadPending = async () => {
    setLoading(true);
    try {
      const data = await getPendingUsers();
      setPending(data || []);
    } catch {
      notifications.show({
        color: "red",
        title: "Failed to load requests",
        message: "Could not fetch pending approvals.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleApprove = async (userId: number) => {
    try {
      await approveUser(userId);
      notifications.show({
        color: "green",
        title: "User approved",
        message: "Employee has been granted access.",
      });
      setPending((prev) => prev.filter((u) => u.id !== userId));
    } catch {
      notifications.show({
        color: "red",
        title: "Approval failed",
        message: "Please try again.",
      });
    }
  };

  if (status !== "authenticated") return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/chat" replace />;

  return (
    <Box 
      py={80} 
      style={{ 
        minHeight: '100vh',
        backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[0],
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Dynamic Background Glow */}
      <Box
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '100%',
          background: `radial-gradient(circle, ${isDark ? theme.colors.blue[9] : theme.colors.blue[1]} 0%, transparent 70%)`,
          filter: 'blur(100px)',
          opacity: 0.5,
          zIndex: 0
        }}
      />

      <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        {/* Simplified Glassmorphism Header */}
        <Paper 
          p="xl" 
          radius="xl" 
          mb={30}
          withBorder
          style={{
            background: isDark 
              ? 'rgba(26, 27, 30, 0.6)' 
              : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Group justify="space-between">
            <Stack gap={4}>
              <Group gap="xs">
                <ThemeIcon variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} radius="sm" size="sm">
                  <IconShieldCheck size={14} />
                </ThemeIcon>
                <Text fw={800} size="xs" c="blue.5" style={{ letterSpacing: 1, textTransform: 'uppercase' }}>
                  Admin Panel
                </Text>
              </Group>
              <Title order={2} fw={900} style={{ letterSpacing: -0.5 }}>
                Pending <span style={{ color: theme.colors.blue[6] }}>Approvals</span>
              </Title>
            </Stack>
            
            <ActionIcon 
                variant="light" 
                size="xl" 
                radius="xl" 
                onClick={loadPending} 
                loading={loading}
                color="blue"
            >
              <IconRefresh size={20} />
            </ActionIcon>
          </Group>
        </Paper>

        {loading ? (
          <Center py={100}>
            <Loader color="blue" size="xl" type="dots" />
          </Center>
        ) : pending.length === 0 ? (
          <Paper 
            withBorder 
            p={60} 
            radius="xl" 
            style={{ 
              textAlign: 'center',
              backgroundColor: isDark ? 'transparent' : theme.white,
              borderStyle: 'dashed',
            }}
          >
            <Stack align="center" gap="md">
              <ThemeIcon size={70} radius="xl" variant="light" color="gray">
                <IconInbox size={35} stroke={1.5} />
              </ThemeIcon>
              <Box>
                <Text fw={800} size="lg">No pending requests</Text>
                <Text size="sm" c="dimmed">Your team is fully verified.</Text>
              </Box>
            </Stack>
          </Paper>
        ) : (
          <Stack gap="md">
            {pending.map((u) => (
              <Paper 
                key={u.id} 
                withBorder 
                p="lg" 
                radius="xl"
                style={{
                  backgroundColor: isDark ? theme.colors.dark[8] : theme.white,
                  transition: 'all 0.2s ease',
                  boxShadow: theme.shadows.xs
                }}
                className="approval-card"
              >
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="md">
                    <ThemeIcon 
                        size={52} 
                        radius="xl" 
                        variant="gradient" 
                        gradient={{ from: 'blue.7', to: 'cyan.5' }}
                    >
                      <Text fw={900} size="lg">{u.name.charAt(0).toUpperCase()}</Text>
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text fw={800} size="md">{u.name}</Text>
                      <Group gap={4}>
                        <IconMail size={12} color={theme.colors.blue[5]} />
                        <Text size="xs" c="dimmed" fw={600}>{u.email}</Text>
                      </Group>
                    </Stack>
                  </Group>

                  <Button
                    variant="gradient"
                    gradient={{ from: 'blue.6', to: 'cyan.6' }}
                    radius="xl"
                    size="sm"
                    leftSection={<IconUserCheck size={16} />}
                    onClick={() => handleApprove(u.id)}
                    style={{ fontWeight: 700 }}
                  >
                    Approve
                  </Button>
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
      </Container>

      <style>{`
        .approval-card:hover {
          transform: translateY(-3px);
          box-shadow: ${theme.shadows.md} !important;
          border-color: ${theme.colors.blue[isDark ? 8 : 2]} !important;
        }
      `}</style>
    </Box>
  );
};

export default AdminApprovalsPage;