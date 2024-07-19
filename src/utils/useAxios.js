import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import {
   ACCESS_TOKEN,
   REFRESH_TOKEN,
   useLocalStorage,
} from "./useLocalStorage";
import { useDispatch } from "react-redux";
import { removeUserData, setReduxUserData } from "../redux/action/action_user";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BE_URL;

const useAxios = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {
      setItem: saveAcessToken,
      getItem: getAcessToken,
      removeItem: removeAccessToken,
   } = useLocalStorage(ACCESS_TOKEN);
   const {
      setItem: saveRefreshToken,
      getItem: getRefreshToken,
      removeItem: removeRefreshToken,
   } = useLocalStorage(REFRESH_TOKEN);

   const accessToken = getAcessToken();
   const refreshToken = getRefreshToken();

   let headers = {};
   if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
   }

   const axiosInstance = axios.create({
      baseURL,
      headers,
   });

   axiosInstance.interceptors.request.use(async (req) => {
      if (accessToken && typeof accessToken === "string") {
         const user = jwtDecode(accessToken);
         const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

         if (!isExpired) return req;
      }

      const response = await axios.post(`${baseURL}/user/api/token/refresh/`, {
         refresh: refreshToken,
      });

      const access = response.data.access;

      saveAcessToken(access);
      saveRefreshToken(response.data.refresh);

      console.log("this is token: ", access, "data: ", jwtDecode(access));
      dispatch(setReduxUserData(jwtDecode(access)));

      req.headers.Authorization = `Bearer ${access}`;
      return req;
   });

   return axiosInstance;
};

export default useAxios;
