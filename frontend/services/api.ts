import axios from 'axios';
import { SorteioRequest, SorteioResponse } from '../types';

// Durante dev, use o IP local da sua máquina — localhost não funciona no device/emulador
const BASE_URL = 'http://localhost:8080/';

const api = axios.create({ baseURL: BASE_URL });

export async function sortearTimes(request: SorteioRequest): Promise<SorteioResponse> {
    const { data } = await api.post<SorteioResponse>('/sorteio', request);
    return data;
}