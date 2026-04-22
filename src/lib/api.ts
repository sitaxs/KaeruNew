import axios from 'axios';
import { Event, User } from '../types/types';

// Базове посилання вказує тільки на сам сервер (без слова /events)
const API_URL = 'http://localhost:3001';

export const eventApi = {
  getAll: async (search?: string) => {
    const url = search ? `${API_URL}/events?q=${search}` : `${API_URL}/events`;
    const { data } = await axios.get<Event[]>(url);
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get<Event>(`${API_URL}/events/${id}`);
    return data;
  },

  create: async (event: Omit<Event, 'id'>) => {
    const { data } = await axios.post<Event>(`${API_URL}/events`, event);
    return data;
  },

  // Get events by organizer for the Profile page
  getByOrganizer: async (userId: string) => {
    const { data } = await axios.get<Event[]>(`${API_URL}/events?organizerId=${userId}`);
    return data;
  },

  // Fetch user info for the Profile header
  getUser: async (id: string) => {
    const { data } = await axios.get<User>(`${API_URL}/users/${id}`);
    return data;
  }
};