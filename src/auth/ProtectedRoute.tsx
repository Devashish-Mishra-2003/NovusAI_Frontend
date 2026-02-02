import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Center, Loader } from "@mantine/core";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { status } = useAuth();
  const location = useLocation();

  // 1. Initial loading state
  if (status === "loading") {
    return (
      <Center style={{ height: "100vh", width: "100vw" }}>
        <Loader color="blue" size="xl" type="dots" />
      </Center>
    );
  }

  // 2. If authenticated, allow access
  if (status === "authenticated") {
    return children;
  }

  // 3. If status is 'pending' or 'unauthenticated', redirect to login
  // We use state to remember where they were trying to go
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;