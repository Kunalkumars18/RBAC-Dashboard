import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// User APIs
export const fetchUsers = () => API.get("/users");
export const addUser = (userData) => API.post("/users", userData);
export const updateUser = (id, updatedData) => API.put(`/users/${id}`, updatedData);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Role APIs
export const fetchRoles = () => API.get("/roles");
export const addRole = (roleData) => API.post("/roles", roleData);
export const updateRole = (id, updatedData) => API.put(`/roles/${id}`, updatedData);
export const deleteRole = (id) => API.delete(`/roles/${id}`);
