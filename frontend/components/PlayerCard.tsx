import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Jogador } from '../types';

const CAT_COLORS = { A: '#32CD32', B: '#B8860B', C: '#6A6AFF', D: '#E84444' };

interface Props {
    jogador: Jogador;
    index: number;
    onRemove: (index: number) => void;
}

export default function PlayerCard({ jogador, index, onRemove }: Props) {
    const initials = jogador.nome.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const cor = CAT_COLORS[jogador.categoria];

    return (
        <View style={s.container}>
            <View style={s.avatar}>
                <Text style={s.avatarText}>{initials}</Text>
            </View>
            <Text style={s.nome}>{jogador.nome}</Text>
            <View style={[s.badge, { backgroundColor: cor + '33' }]}>
                <Text style={[s.badgeText, { color: cor }]}>{jogador.categoria}</Text>
            </View>
            <TouchableOpacity onPress={() => onRemove(index)}>
                <Text style={s.remove}>×</Text>
            </TouchableOpacity>
        </View>
    );
}

const s = StyleSheet.create({
    container:  { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#000080', borderRadius: 10, padding: 10, marginBottom: 6 },
    avatar:     { width: 32, height: 32, borderRadius: 16, backgroundColor: '#000033', alignItems: 'center', justifyContent: 'center' },
    avatarText: { fontSize: 11, fontWeight: '800', color: '#B8860B' },
    nome:       { flex: 1, fontSize: 14, fontWeight: '600', color: '#fff' },
    badge:      { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
    badgeText:  { fontSize: 11, fontWeight: '800' },
    remove:     { fontSize: 20, color: '#555', paddingHorizontal: 4 },
});