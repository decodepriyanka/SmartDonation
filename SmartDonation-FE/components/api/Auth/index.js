import axios from "axios";
import constants from "../../constants";

const { BASE_URL } = constants;

const API = axios.create({ baseURL: BASE_URL });

// Login User
export const loginUser = async (values, mode) => {
  const url =
    mode === "Admin" || mode === "NGO"
      ? "/api/admin/login"
      : "/api/users/login";
  const response = await API({
    method: "POST",
    url: url,
    data: values,
  });

  return response.data;
};

// Register User

export const registerUser = async (values, mode) => {
  const url = mode === "Admin" || mode === "NGO" ? "/api/admin" : "/api/users";
  const response = await API({
    method: "POST",
    url: url,
    data: values,
  });

  return response.data;
};

export const getAllCategories = async () => {
  const url = "/api/category/getAllCat";
  const response = await API({
    method: "GET",
    url: url,
  });
  return response.data.data;
};

export const getNgoByCategoryId = async (catId) => {
  const url = `/api/ngo/getByCategory/${catId}`;
  const response = await API({
    method: "GET",
    url: url,
  });
  return response.data.data;
};

export const addNgo = async (value) => {
  const url = "/api/ngo/addNgos";
  const response = await API({
    method: "POST",
    url: url,
    data: value,
  });
  return response.data.data;
};

export const getNgoById = async (Id) => {
  const url = `/api/ngo/getById/${Id}`;
  const response = await API({
    method: "GET",
    url: url,
  });

  return response.data.data;
};

export const getAllDonationItems = async () => {
  const url = "/api/donation/getAllItems";
  const response = await API({
    method: "GET",
    url: url,
  });
  return response.data.data;
};

export const sendNotification = async (values) => {
  const url = "/api/notification";
  const response = await API({
    method: "POST",
    url: url,
    data: values,
  });

  return response.data.data;
};

export const sendEmail = async (values) => {
  const url = "/api/mail/send";
  const response = await API({
    method: "POST",
    url: url,
    data: values,
  });
  return response.data;
};

export const getNotification = async (recieverId) => {
  // const url = `/api/notification/${recieverId}`;
  const url = `/api/notification/64529a76d5790f8199dd6723`;
  const response = await API({
    method: "GET",
    url: url,
  });

  return response.data.data;
};

export const getDonationItemById = async (itemId) => {
  // const url = `/api/notification/${recieverId}`;
  const url = `/api/donation/getById/${itemId}`;
  const response = await API({
    method: "GET",
    url: url,
  });

  return response.data.data;
};
