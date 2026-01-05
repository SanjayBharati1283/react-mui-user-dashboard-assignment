
// App.jsx
import { useMemo, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import TaskList from "./components/TaskList";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  IconButton,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import getAppTheme from "./theme";

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
}));

export default function App() {
  const [dark, setDark] = useState(true);

  const theme = useMemo(
    () => getAppTheme(dark ? "dark" : "light"),
    [dark]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="sticky" elevation={1} color="default">
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            User Dashboard
          </Typography>
          <IconButton
            aria-label="Toggle dark mode"
            onClick={() => setDark((d) => !d)}
            edge="end"
          >
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <SectionPaper elevation={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Profile
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ProfileCard />
            </SectionPaper>
          </Grid>

          {/* Tasks Section */}
          <Grid item xs={12} md={8}>
            <SectionPaper elevation={1}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Tasks
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <TaskList />
            </SectionPaper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
