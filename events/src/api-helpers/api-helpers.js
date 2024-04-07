import axios from "axios"
export const getAllEvents = async () => {
  const res = await axios.get("/event").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {


  const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getEventDetails = async (id) => {
  const res = await axios.get(`/event/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

// export const newBooking = async (data) => {
//   const res = await axios
//     .post("/booking", {
//       movie: data.movie,
//       seatNumber: data.seatNumber,
//       date: data.date,
//       user: localStorage.getItem("userId"),
//     })
//     .catch((err) => console.log(err));

//   if (res.status !== 201) {
//     return console.log("Unexpected Error");
//   }
//   const resData = await res.data;
//   return resData;
// };
export const newBooking = async (data) => {
  try {
    const res = await axios.post("/booking", {
      event: data.event,
      bookingNumber: data.bookingNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    });

    if (res.status === 201) {
      const resData = await res.data;
      return resData;
    } else {
      console.log("Unexpected Error");
      return null; // or throw an error if appropriate
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null; // or throw an error if appropriate
  }
};


export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addEvent = async (data) => {
  const res = await axios.post(
      "/event",
      {
        title: data.title,
        description: data.description,
        posterURL: data.posterURL,
        featured: data.featured,
        date: data.date,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};