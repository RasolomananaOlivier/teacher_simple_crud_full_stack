import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Box, Container } from "@mantine/core";

export default function RootPage() {
  return (
    <Box>
      <Header />

      <Outlet />
    </Box>
  );
}
