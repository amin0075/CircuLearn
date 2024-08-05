import axios from "axios";

const getHelpers = async () => {
  let url = "/helpers";
  if (typeof window === "undefined") {
    url = `${process.env.NEXT_PUBLIC_DOMAIN_API_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_API}/helpers`;
  }
  return await axios
    .get(url, {
      params: {
        "populate[1]": "jobType",
        "populate[2]": "profileImage",
      },
      headers: {
        // 'Accept-Encoding': 'gzip,deflate,compress',
      },
    })
    .then((res) => res.data)
    .catch((error) => error);
};

const getSingleHelper = async (id: string) => {
  let url = `/helpers/${id}`;
  if (typeof window === "undefined") {
    url = `${process.env.NEXT_PUBLIC_DOMAIN_API_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_API}/helpers/${id}`;
  }
  return await axios
    .get(url, {
      params: {
        "populate[1]": "jobType",
        "populate[2]": "profileImage",
      },
      headers: {
        // 'Accept-Encoding': 'gzip,deflate,compress',
      },
    })
    .then((res) => res.data)
    .catch((error) => error);
};

export { getHelpers, getSingleHelper };
