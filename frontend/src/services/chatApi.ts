import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchMessages = async () => {
  const res = await axios.get(`${API_BASE}/api/messages`);
  return res.data;
};

export const postMessage = async (content: string) => {
  await axios.post(`${API_BASE}/api/messages`, { content });
};

export const deleteMessages = async () => {
  await axios.delete(`${API_BASE}/api/messages`);
};
