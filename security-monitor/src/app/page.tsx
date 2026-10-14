"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";

// Define SecurityEvent type
type SecurityEvent = {
  timestamp: string;
  feature: string;
  event: string;
  outcome: string;
  severity: string;
  ip_address?: string; // Optional field for IP address
};


//store security event
const events: SecurityEvent[] = [];

// Function to add a new security event
export default function Home() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  // Fetch security events from the API every second
  useEffect(() => {
    const fetchEvents = () => {
      fetch("http://127.0.0.1:5001/api/security-events")
        .then((response) => response.json())
        .then((data) => {
          setEvents(data);
        })
        .catch((error) => {
          console.error("Failed to fetch security events:", error);
        });
    };


    //Fetch when the monitor opens
    fetchEvents();

    // fetch again every second
    const interval = setInterval(fetchEvents, 1000);

    // Stop interval when the page closes
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        paddingTop: 4,
        paddingBottom: 4
      }}
    >

      <Container maxWidth="xl">

        {/* Header */}
        <Paper
          elevation={2}
          sx={{
            padding: 3,
            marginBottom: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2
            }}
          >
            <img src="/ai4care_logo_lightmode.svg" alt="AI4CARE Icon" width={80} height={80} style={{marginBottom: "12px"}} />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                  marginLeft: 1 
                }}
            />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  marginLeft: 1
                }}
              >

              Security Monitor
              </Typography>


            </Box>

          </Box>

          <Chip
            label="LIVE"
            color="success"
            variant="outlined"
          />
        </Paper>

        {/* Security Event Log */}
        <Paper
          elevation={2}
          sx={{
            padding: 3,
            minHeight: 575
          }}
        >

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            Security Event Log
          </Typography>

          <TableContainer 
            sx={{ 
              marginTop: 2, 
              maxHeight: 500,
              overflowY: "auto"
            }}>
            <Table stickyHeader>

              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Timestamp</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Security Feature</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Event</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Outcome</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Severity</strong>
                  </TableCell>
                  <TableCell>
                    <strong>IP Address</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {events.map((securityEvent, index) => (
                  <TableRow key={index}>
                    
                    <TableCell>
                      {securityEvent.timestamp}
                    </TableCell>

                    <TableCell>
                      {securityEvent.feature}
                    </TableCell>

                    <TableCell>
                      {securityEvent.event}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={securityEvent.outcome}
                        color={
                          securityEvent.outcome === "SUCCESS" ? "success" : "error"
                        }
                        size="small"
                      />
                      
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={securityEvent.severity}
                        color={
                          securityEvent.severity === "HIGH" ? "error" : "info"
                        }
                        size="small"
                        variant="outlined"
                      />

                    </TableCell>

                    <TableCell>
                      {securityEvent.ip_address || "N/A"}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </Paper>

      </Container>
    </Box>
  );
}