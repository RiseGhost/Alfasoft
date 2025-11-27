import axios from "axios";

export const api = axios.create({
    baseURL: "https://josesantos-nodejs.recruitment.alfasoft.pt",
    timeout: 2000
})

export default api