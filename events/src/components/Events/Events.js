import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import EventItem from './EventItem';
import { getAllEvents } from '../../api-helpers/api-helpers';


const Events = () => {
    const [events, setEvents] = useState();
    useEffect(() => {
      getAllEvents()
        .then((data) => setEvents(data.events))
        .catch((err) => console.log(err));
    }, []);
    return (
      <Box margin={"auto"} marginTop={4}>
        <Typography
          margin={"auto"}
          variant="h4"
          padding={2}
          width="40%"
          bgcolor={"#900C3F"}
          color="white"
          textAlign={"center"}
        >
          All Events
        </Typography>
        <Box
          width={"100%"}
          margin="auto"
          marginTop={5}
          display={"flex"}
          justifyContent="flex-start"
          flexWrap={"wrap"}
        >
          {events &&
            events.map((event, index) => (
              <EventItem
                key={index}
                id={event._id}
                posterURL={event.posterURL}
                date={event.date}
                title={event.title}
              />
            ))}
        </Box>
      </Box>
    );
}

export default Events