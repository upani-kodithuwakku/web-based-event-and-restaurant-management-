import axios from 'axios';
import type { BookingInput, Reservation, Table, User } from '../types';
export const demoMode = import.meta.env.VITE_DEMO_MODE !== 'false';
export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || '/api', timeout: 12000 });
api.interceptors.request.use(config => { const token = sessionStorage.getItem('gather-token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
export const errorMessage = (e: unknown) => axios.isAxiosError(e) ? e.response?.data?.message || (e.response?.status === 401 ? 'Please sign in to continue.' : 'Unable to reach the server. Please try again.') : e instanceof Error ? e.message : 'Something went wrong.';
export const reservationApi = {
 availability: async (date: string, time: string, guests: number, preference?: string) => (await api.get<{data: {availableTables: Table[]; alternativeTimes: string[]}}>('/reservations/availability', { params: {date, time, guests, preference: preference || undefined} })).data.data,
 mine: async () => (await api.get<{data: Reservation[]}>('/reservations/my')).data.data,
 save: async (input: BookingInput, id?: number) => (await (id ? api.put(`/reservations/${id}`, input) : api.post('/reservations', input))).data.data as Reservation,
 cancel: async (id: number, reason: string) => (await api.patch(`/reservations/${id}/cancel`, {reason})).data.data as Reservation,
 tables: async () => (await api.get<{data: Table[]}>('/admin/tables')).data.data,
 daily: async (date: string) => (await api.get<{data: Reservation[]}>('/admin/reservations', {params: {date}})).data.data,
 action: async (id: number, action: string) => (await api.patch(`/admin/reservations/${id}/${action}`)).data.data as Reservation,
 tableStatus: async (id: number, status: string) => (await api.patch(`/admin/tables/${id}/status`, {status})).data.data as Table,
};
export const authenticate = async (register: boolean, values: Record<string, string>) => (await api.post<{data: User}>(`/auth/${register ? 'register' : 'login'}`, values)).data.data;
