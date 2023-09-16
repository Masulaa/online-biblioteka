import axios from "axios";
import { LocalStorage } from "../utility/localStorage";

const HTTP_UNAUTHORIZED = 401;
const HTTP_OK = 200;

const STATIC_LOGIN_TOKEN = "b3Rvcmlub2xhcmluZ29sb2dpamE=";

const client = axios.create({
  baseURL: "https://tim5.petardev.live/api/",
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
      LocalStorage.remove("BearerToken");

      window.location.href = "/LogIn";
    }
    return Promise.reject(error);
  }
);

client.interceptors.request.use(
  async (config) => {
    const token = LocalStorage.get("BearerToken");

    console.log("Token is", token);

    // console.log(`Is there Auth header alraedy ${config.headers.Authorization}`);

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
    try {
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
        console.log(
          `Setting local token ${response.data.data.token}`,
          response.data
        );
        LocalStorage.set("BearerToken", response.data.data.token);
        return true;
      }
    } catch (error) {
      console.error("Error while logging in");
      return false;
    }
  },
};

export const BookService = {
  ListBooks() {
    return client.get("books");
  },
  CreateBookInfo() {
    return client.get("books/create");
  },
  CreateBook(newBookData) {
    return client.post("books/store", newBookData);
  },
  DeleteBooks(bookIds) {
    return client.delete(`books/${bookIds}/destroy`, {
      ids: bookIds,
    });
  },
  GetBook(bookId) {
    return client.get(`books/${bookId}`);
  },
  BulkDeleteBooks(bookIds) {
    return client.delete("books/bulkdelete", {
      data: {
        ids: bookIds,
      },
    });
  },
  ReserveBook(reserveBookData, id) {
    return client.post(`books/${id}/reserve`, reserveBookData);
  },
  IzdajBook(izdajKnjiguData, id) {
    return client.post(`books/${id}/izdaj`, izdajKnjiguData);
  },
};

export const UserService = {
  CreateUser(newUserData) {
    return client.post("users/store", newUserData);
  },
  LogOut(confirmData) {
    return client.post("logout", confirmData);
  },
  ListUsers() {
    return client.get("users");
  },
  DeleteUsers(userIds) {
    return client.delete(`users/${userIds}`);
  },
  GetMeInfo() {
    return client.post("users/me");
  },
  UpdateMeInfo() {
    return client.put("users/me");
  },
  ShowSingleUser(userIds) {
    return client.get(`users/${userIds}`);
  },
};

export const AuthorService = {
  ListAuthors() {
    return client.get("authors");
  },
  DeleteAuthors(authorIds) {
    return client.delete(`authors/${authorIds}`);
  },
  ShowAuthor(authorId) {
    return client.get(`authors/${authorId}`);
  },
  CreateAuthor(authorData) {
    return client.post("authors/store", authorData);
  },
};
