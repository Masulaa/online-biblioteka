import axios from "axios";
import { LocalStorage } from "../utility/localStorage";

const HTTP_UNAUTHORIZED = 401;
const HTTP_OK = 200;

const STATIC_LOGIN_TOKEN = "b3Rvcmlub2xhcmluZ29sb2dpamE=";

const client = axios.create({
  baseURL: "https://petardev.live/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === HTTP_UNAUTHORIZED) {
      // FIXME: If we are receiving Unauthorized we can't visit this page, best is to show error to user and ask him to reauthenticate
      // for the moment i will only redirect to login page
      console.log(`Received ${HTTP_UNAUTHORIZED} status code`);

      window.location.href = "/LogIn";
    }
    return Promise.reject(error);
  }
);

client.interceptors.request.use(
  async (config) => {
    const token = LocalStorage.get("BearerToken");

    console.log(`Is there Auth header alraedy ${config.headers.Authorization}`);
    console.log(`Token in the LocalStorage ${token}`);

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Later, when we start accessing protected endpoints with User session we will need token that we received
// through Registration or Login call to be present as Bearer tokein inside Authorization header

//client.defaults.headers.common['Authorization'] = `Bearer ${TokenService.getToken()}`

export const AuthService = {
  register(userData) {
    return client.post("register", userData);
  },
  async signup(userData) {
    const response = await client.post("login", userData, {
      // FIXME: For Login api we don't have token yet, but we need to inject one as per API specification
      // so we will override default setting here and inject static token only for this reuqest
      headers: {
        Authorization: `Bearer ${STATIC_LOGIN_TOKEN}`,
      },
    });
    if (response.status === HTTP_OK) {
      // if we received OK status code, that means we successfully logged in, and we should take Token from response and use it later
      // for all subsequent requests. We will save this Token inside LocalStorage (browser local storage)
      // and use it later in axios request interceptor to set our token for all the api requests, to avoid setting it for each individiaul request
      console.log(`Setting local token ${response.data.data.token}`, response.data);
      LocalStorage.set("BearerToken", response.data.data.token);
    }
  },
};

export const BookService = {
  ListBooks() {
    return client.get("books");
  },
};
