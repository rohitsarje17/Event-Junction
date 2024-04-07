import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EventItem from "./Events/EventItem"
import { Link } from "react-router-dom";
import { getAllEvents } from "../api-helpers/api-helpers";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data.events))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"60vh"} padding={2}>
        <img
          src="https://img.etimg.com/thumb/width-640,height-480,imgsize-100092,resizemode-75,msid-104632583/news/international/us/ed-sheeran-2024-mathematics-asia-tour-tickets-dates-venues-and-more.jpg"
          alt="Ed Sheeran Concert"
          width={"100%"}
          height={"100%"}
  
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Events
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
      {events &&
          events
            .slice(0, 4)
            .map((event, index) => (
              <EventItem
                id={event.id}
                title={event.title}
                posterURL={event.posterURL}
                date={event.date}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/events"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Events
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;