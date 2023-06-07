import axios from "axios";

// Constant API KEY for calling Login/Registration endpoints
const API_KEY = 'Bearer b3Rvcmlub2xhcmluZ29sb2dpamE='

const client = axios.create({
  baseURL: "https://petardev.live/api/",
  headers: {
    Authorization: API_KEY
  }
});

// Later, when we start accessing protected endpoints with User session we will need token that we received
// through Registration or Login call to be present as Bearer tokein inside Authorization header

//client.defaults.headers.common['Authorization'] = `Bearer ${TokenService.getToken()}`

export const AuthService = {
    register(userData){
        return client.post('register', userData)
    },
  signup(userData){
      return client.post('login', userData)
  }
}
