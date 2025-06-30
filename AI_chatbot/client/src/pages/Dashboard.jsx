import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
  CircularProgress,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "History fetch failed");
      setHistory(data.history || []);
    } catch (err) {
      console.error("History Fetch Error:", err.message);
      setError("Could not fetch history.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchHistory();
    }
  }, []);

  const handleFeedback = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userInput: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Feedback failed");

      setFeedback(data.feedback?.feedback || data.feedback);
      setSelectedHistory({
        user_input: input,
        feedback: data.feedback?.feedback || data.feedback,
      });
      setInput("");
      fetchHistory();
    } catch (err) {
      console.error("Feedback Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box className="dashboard-wrapper">
      <AppBar position="static" className="dashboard-appbar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hello {user?.firstName} {user?.lastName}
          </Typography>
          <Button onClick={logout} variant="outlined" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className="dashboard-drawer">
          <Typography variant="h6" className="drawer-title">
            History
          </Typography>
          <List>
            {history.map((item, i) => (
              <ListItem
                key={i}
                button
                className={`history-item ${
                  selectedHistory?._id === item._id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedHistory(item);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText
                  primary={item.user_input.slice(0, 50)}
                  primaryTypographyProps={{ align: "center" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box className="dashboard-content">
        <Box className="chat-display">
          {error && <Alert severity="error">{error}</Alert>}

          {loading ? (
            <Box className="loading-container">
              <CircularProgress />
            </Box>
          ) : selectedHistory ? (
            <Box>
              <Typography variant="subtitle1" className="question-text">
                Q: {selectedHistory.user_input}
              </Typography>
              <Typography variant="body1" className="answer-text">
                A: {selectedHistory.feedback}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" className="placeholder-text">
              Ask a question or select from history to view response.
            </Typography>
          )}
        </Box>

        <Box className="input-box">
          <TextField
            label="Ask something..."
            fullWidth
            multiline
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleFeedback}
            disabled={loading || !input.trim()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
