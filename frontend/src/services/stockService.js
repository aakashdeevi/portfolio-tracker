import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with backend API base URL

export const getStocks = () => axios.get(`${BASE_URL}/stocks`);
export const getStockById = (id) => axios.get(`${BASE_URL}/stocks/${id}`);
export const addStock = (stock) => axios.post(`${BASE_URL}/stocks`, stock);
export const updateStock = (id, stock) => axios.put(`${BASE_URL}/stocks/${id}`, stock);
export const deleteStock = (id) => axios.delete(`${BASE_URL}/stocks/${id}`);
export const getDashboardMetrics = () => axios.get(`${BASE_URL}/dashboard`);
