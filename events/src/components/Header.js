// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Autocomplete,
//   Box,
//   Tab,
//   Tabs,
//   TextField,
//   Toolbar,
// } from "@mui/material";
// import EventIcon from '@mui/icons-material/Event';

// import {  Link,  useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { adminActions, userActions } from "../store";
// import { getAllEvents } from "../api-helpers/api-helpers";

// const Header = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
//     const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
//     // const [selectedEvent,setSelectedEvent] = useState();
//     const [events,setEvents] = useState([])
//     const [value, setValue] = useState();
//     useEffect(()=>{
//         getAllEvents().then((data)=>setEvents(data.events))
//         .catch((err) => console.log(err))
//     },[]);

//     const logout = (isAdmin) => {
//         dispatch(isAdmin ? adminActions.logout() : userActions.logout());
//       };

//       const handleChange = (e, val) => {
//         const event = events.find((m) => m.title === val);
//         console.log(event);
//         if (isUserLoggedIn) {
//           navigate(`/booking/${event._id}`);
//         }
//       };
//   return (
//     <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
//       <Toolbar>
//         <Box width="20%">
//           <Link to="/" style={{ color: "white" }}>
//           <EventIcon />
//           </Link>
//         </Box>
//         <Box width="50%" marginRight={"auto"} marginLeft="auto">
//           <Autocomplete
//           onChange={handleChange}
//             freeSolo
//             options={events && events.map((option) => option.title)}
//             renderInput={(params) => (
//                 <TextField
//                 variant="standard"
//                 {...params}
               
//                   sx={{
//                     borderRadius: 2,
//                     input: { color: "white" },
//                     bgcolor: "#2b2d42",
//                     padding: "6px",
//                   }}
                
//                   placeholder="Search Events"
                
//                   InputProps={{
//                     ...params.InputProps,
//                     type: "search",
//                   }}
//                 />
//               )}
//             />
//         </Box>
//         <Box display="flex">
//           <Tabs
//             onChange={(e, val) => setValue(val)}
//             value={value}
//             textColor="inherit"
//           >

//             <Tab LinkComponent={Link} label="Events"></Tab>
//             {!isAdminLoggedIn && !isUserLoggedIn && (
//               <>
//                 <Tab label="Admin" LinkComponent={Link} to="/admin" />
//                 <Tab label="Login" LinkComponent={Link} to="/auth" />
//               </>
//             )}
//             {isUserLoggedIn && (
//               <>
//                 <Tab label="Profile" LinkComponent={Link} to="/user" />
//                 <Tab
//                   onClick={() => logout(false)}
//                   label="Logout"
//                   LinkComponent={Link}
//                   to="/"
//                 />
//               </>
//             )}
//             {isAdminLoggedIn && (
//               <>
//                 <Tab label="Add Event" LinkComponent={Link} to="/add" />
//                 <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
//                 <Tab
//                   onClick={() => logout(true)}
//                   label="Logout"
//                   LinkComponent={Link}
//                   to="/"S
//                 />
//               </>
//             )}
//              </Tabs>
//           </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import { getAllEvents } from "../api-helpers/api-helpers";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [events, setEvents] = useState([]);
    const [value, setValue] = useState(0); // Initialize value state with a valid index

    useEffect(() => {
        getAllEvents()
            .then((data) => setEvents(data.events))
            .catch((err) => console.log(err));
    }, []);

    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    };

    const handleChange = (e, val) => {
        const event = events.find((m) => m.title === val);
        if (isUserLoggedIn) {
            navigate(`/booking/${event._id}`);
        }
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
            <Toolbar>
                <Box width="20%">
                    <Link to="/" style={{ color: "white" }}>
                        <EventIcon />
                    </Link>
                </Box>
                <Box width="50%" marginRight={"auto"} marginLeft="auto">
                    <Autocomplete
                        onChange={handleChange}
                        freeSolo
                        options={events.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                variant="standard"
                                {...params}
                                sx={{
                                    borderRadius: 2,
                                    input: { color: "white" },
                                    bgcolor: "#2b2d42",
                                    padding: "6px",
                                }}
                                placeholder="Search Events"
                                InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                }}
                            />
                        )}
                    />
                </Box>
                <Box display="flex">
                    <Tabs
                        onChange={(e, val) => setValue(val)}
                        value={value >= 0 && value <= 2 ? value : 0} // Ensure value is within the valid range
                        textColor="inherit"
                    >
                        <Tab component={Link} label="Events" to="/" />
                        {!isAdminLoggedIn && !isUserLoggedIn ? (
                            [
                                <Tab key="admin" label="Admin" component={Link} to="/admin" />,
                                <Tab key="login" label="Login" component={Link} to="/auth" />
                            ]
                        ) : isUserLoggedIn ? (
                            [
                                <Tab key="profile" label="Profile" component={Link} to="/user" />,
                                <Tab
                                    key="logout"
                                    onClick={() => logout(false)}
                                    label="Logout"
                                    component={Link}
                                    to="/"
                                />
                            ]
                        ) : (
                            [
                                <Tab key="add-event" label="Add Event" component={Link} to="/add" />,
                                <Tab key="admin-profile" label="Profile" component={Link} to="/user-admin" />,
                                <Tab
                                    key="admin-logout"
                                    onClick={() => logout(true)}
                                    label="Logout"
                                    component={Link}
                                    to="/"
                                />
                            ]
                        )}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
