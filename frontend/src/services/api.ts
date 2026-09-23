import axios from 'axios';
import type {SorteioRequest, SorteioResponse} from '../types';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '',
});

export async function sortearTimes(request: SorteioRequest): Promise<SorteioResponse> {
    const { data } = await api.post<SorteioResponse>('/sorteio', request);
    return data;
}
