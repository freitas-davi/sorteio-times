export type Categoria = 'A' | 'B' | 'C' | 'D';

export interface Jogador {
    nome: string;
    categoria: Categoria;
}

export interface Equipe {
    numero: number;
    jogadores: Jogador[];
    forca: number;
}

export interface SorteioRequest {
    numeroTimes: number;
    jogadores: Jogador[];
}

export interface SorteioResponse {
    equipes: Equipe[];
}