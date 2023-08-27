import axios from "axios";

//const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((response) => response.data);
//const fetcher = (url: string) => axios.get(url).then((response) => response.data);

const fetcher = (url) =>
  axios.get(url).then(async (response) => {
    // Add a fake delay to make waiting noticeable.
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    return response.data;
  });

export default fetcher;
