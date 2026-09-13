import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { demoMode, reservationApi } from '../services/api';
import { seedReservations, tables as initialTables } from '../data';
import { availableTables } from '../services/availability';
import type { BookingInput, EventBooking, Order, Reservation, Table, User } from '../types';
import toast from 'react-hot-toast';
function read<T>(key: string, fallback: T): T { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } }
export function useStored<T>(key: string, fallback: T) { const [value, setValue] = useState<T>(() => read(key, fallback)); useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]); return [value, setValue] as const; }
function useAppState() {
 const [user, setUser] = useState<User | null>(() => { try { return JSON.parse(sessionStorage.getItem('gather-user') || 'null'); } catch { return null; } });
 const [reservations, setReservations] = useStored<Reservation[]>('gather-demo-reservations', seedReservations);
 const [liveReservations, setLiveReservations] = useState<Reservation[]>([]);
 const [tables, setTables] = useStored<Table[]>('gather-demo-tables', initialTables);
 const [orders, setOrders] = useStored<Order[]>('gather-demo-orders', []);
 const [events, setEvents] = useStored<EventBooking[]>('gather-demo-events', []);
 const [saved, setSaved] = useStored<number[]>('gather-saved', []);
 const [notifications, setNotifications] = useStored<string[]>('gather-notifications', ['Welcome to Gather. Your next good moment starts here.']);
 const [loading, setLoading] = useState(false);
 const [loadError, setLoadError] = useState('');
 const login = (next: User) => { setUser(next); sessionStorage.setItem('gather-user', JSON.stringify(next)); if (next.token) sessionStorage.setItem('gather-token', next.token); };
 const logout = () => {setUser(null); setLiveReservations([]); sessionStorage.removeItem('gather-user'); sessionStorage.removeItem('gather-token');};
 const notify = (message: string) => {setNotifications(n => [message, ...n]); toast.success(message);};
 const refresh = async () => { if (demoMode || !user?.roles.includes('CUSTOMER')) return; setLoading(true); setLoadError(''); try {setLiveReservations(await reservationApi.mine());} catch {setLoadError('Your reservations could not be loaded. Please retry.');} finally {setLoading(false);} };
 useEffect(() => {void refresh();}, [user?.userId]);
 const saveBooking = async (input: BookingInput, id?: number) => {
 let result: Reservation;
 if (demoMode) {const table = availableTables(tables, reservations, input.reservationDate, input.startTime, input.guestCount, id).find(t => t.id === input.tableId); if (!table) throw new Error('This table is no longer available. Choose another time or table.'); result = {...input, id: id || Date.now(), bookingReference: id ? reservations.find(r => r.id === id)!.bookingReference : `RES-DEMO-${Date.now().toString(36).toUpperCase()}`, table, status: 'CONFIRMED'}; setReservations(all => id ? all.map(r => r.id === id ? result : r) : [result, ...all]);}
 else { result = await reservationApi.save(input, id); setLiveReservations(all => id ? all.map(r => r.id === id ? result : r) : [result, ...all]); }
 notify(id ? 'Your reservation has been updated.' : 'Your table is reserved. See you at Gather!'); return result;
 };
 const cancelBooking = async (id: number, reason: string) => {if (demoMode) setReservations(all => all.map(r => r.id === id ? {...r, status: 'CANCELLED'} : r)); else {const result = await reservationApi.cancel(id, reason); setLiveReservations(all => all.map(r => r.id === id ? result : r));} notify('Reservation cancelled. We hope to see you soon.');};
 return { user, login, logout, reservations: demoMode ? reservations : liveReservations, setReservations, tables, setTables, orders, setOrders, events, setEvents, saved, setSaved, notifications, setNotifications, notify, saveBooking, cancelBooking, loading, loadError, refresh };
}
const AppContext = createContext<ReturnType<typeof useAppState> | null>(null);
export const AppProvider = ({children}: {children: ReactNode}) => <AppContext.Provider value={useAppState()}>{children}</AppContext.Provider>;
export const useApp = () => {const app = useContext(AppContext); if (!app) throw new Error('AppProvider missing'); return app;};
