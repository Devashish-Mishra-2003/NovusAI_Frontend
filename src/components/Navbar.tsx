import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Group,
  Title,
  Button,
  ActionIcon,
  Box,
  useMantineColorScheme,
  useMantineTheme,
  UnstyledButton,
  Badge,
} from "@mantine/core";
import {
  IconSun,
  IconMoonStars,
  IconLogout,
} from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api/client";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { hovered, ref } = useHover();

  const { status, user, logout } = useAuth();

  const isDark = colorScheme === "dark";
  const isAuthenticated = status === "authenticated";
  const isAdmin = isAuthenticated && user?.role === "admin";

  const [pendingCount, setPendingCount] = useState<number>(0);

  // Fetch pending approvals count (admin only)
  useEffect(() => {
    if (!isAdmin) return;

    api
      .get("/auth/admin/pending")
      .then((res) => {
        setPendingCount(res.data.length);
      })
      .catch(() => {
        setPendingCount(0);
      });
  }, [isAdmin]);

  const handlePrimaryClick = () => {
    if (isAuthenticated) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Nav Link with underline animation
  const NavLink = ({ label, path }: { label: string; path: string }) => {
    const isActive = location.pathname === path;
    return (
      <UnstyledButton
        onClick={() => navigate(path)}
        style={{
          position: "relative",
          fontSize: 14,
          fontWeight: 600,
          color: isActive
            ? isDark
              ? theme.white
              : theme.black
            : theme.colors.gray[6],
          padding: "8px 4px",
          transition: "color 0.2s ease",
        }}
        className="nav-link-item"
      >
        {label}
        <Box
          className="underline"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: isActive ? "100%" : "0%",
            height: 2,
            backgroundColor: theme.colors.blue[6],
            transition: "width 0.3s ease",
          }}
        />
      </UnstyledButton>
    );
  };

  return (
    <Box
      component="nav"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 100,
        backgroundColor: isDark
          ? "rgba(26, 27, 30, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      <Container size="lg" h={80}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          {/* Logo */}
          <Box
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Title
              order={2}
              fw={900}
              style={{
                letterSpacing: -1,
                fontSize: 28,
                lineHeight: 1,
              }}
            >
              Novus
              <span style={{ color: theme.colors.blue[6], marginLeft: 2 }}>
                AI
              </span>
            </Title>
          </Box>

          {/* Right side */}
          <Group gap="xl">
            {/* Authenticated links */}
            {isAuthenticated && (
              <Group gap="lg">
                {isAdmin && (
                  <Group gap={6}>
                    <NavLink
                      label="Approvals"
                      path="/admin/approvals"
                    />
                    {pendingCount > 0 && (
                      <Badge
                        size="xs"
                        color="red"
                        variant="filled"
                        radius="xl"
                      >
                        {pendingCount}
                      </Badge>
                    )}
                  </Group>
                )}

                <NavLink label="Profile" path="/profile" />
              </Group>
            )}

            <Group gap="md">
              {/* Primary CTA */}
              <Button
                ref={ref}
                radius="xl"
                size="md"
                onClick={handlePrimaryClick}
                style={{
                  transition:
                    "transform 200ms ease, box-shadow 200ms ease",
                  transform: hovered
                    ? "translateY(-2px)"
                    : "translateY(0)",
                  boxShadow: hovered
                    ? theme.shadows.md
                    : "none",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "0 24px",
                }}
              >
                {isAuthenticated ? "Go to Chat" : "Try NovusAI"}
              </Button>

              {/* Logout */}
              {isAuthenticated && (
                <ActionIcon
                  variant="light"
                  color="red"
                  size="lg"
                  radius="xl"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <IconLogout size={20} />
                </ActionIcon>
              )}

              {/* Theme toggle */}
              <ActionIcon
                variant="subtle"
                color={isDark ? "yellow" : "blue"}
                size="lg"
                radius="xl"
                onClick={toggleColorScheme}
                aria-label="Toggle color scheme"
                styles={{
                  root: {
                    transition: "transform 200ms ease",
                    "&:hover": {
                      transform: "rotate(15deg) scale(1.1)",
                    },
                  },
                }}
              >
                {isDark ? (
                  <IconSun size={24} stroke={1.5} />
                ) : (
                  <IconMoonStars size={24} stroke={1.5} />
                )}
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </Container>

      <style>{`
        .nav-link-item:hover .underline {
          width: 100% !important;
        }
        .nav-link-item:hover {
          color: ${
            isDark ? theme.white : theme.black
          } !important;
        }
      `}</style>
    </Box>
  );
};

export default Navbar;
