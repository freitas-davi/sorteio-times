import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Equipe } from '../types';

const TEAM_COLORS = ['#B8860B', '#4CAF9E', '#E84444', '#9B8AFB', '#F5A623', '#5BA4E5'];
const CAT_COLORS  = { A: '#32CD32', B: '#B8860B', C: '#6A6AFF' };

interface Props {
    equipe: Equipe;
    index: number;
    maxForca: number;
}

export default function TeamCard({ equipe, index, maxForca }: Props) {
    const cor = TEAM_COLORS[index % TEAM_COLORS.length];
    const fillPct = (equipe.forca / maxForca) * 100;

    return (
        <View style={s.card}>
            <View style={s.header}>
                <View style={[s.number, { backgroundColor: cor }]}>
                    <Text style={s.numberText}>{equipe.numero}</Text>
                </View>
                <Text style={s.title}>Time {equipe.numero}</Text>
                <View style={s.strength}>
                    <View style={s.bar}>
                        <View style={[s.fill, { width: `${fillPct}%` as any, backgroundColor: cor }]} />
                    </View>
                    <Text style={s.pts}>{equipe.forca}pts</Text>
                </View>
            </View>

            {equipe.jogadores.map((jogador, i) => {
                const initials = jogador.nome.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
                const catCor = CAT_COLORS[jogador.categoria];
                return (
                    <View key={i} style={[s.playerRow, i < equipe.jogadores.length - 1 && s.playerBorder]}>
                        <View style={[s.avatar, { backgroundColor: cor + '22' }]}>
                            <Text style={[s.avatarText, { color: cor }]}>{initials}</Text>
                        </View>
                        <Text style={s.playerName}>{jogador.nome}</Text>
                        <View style={[s.badge, { backgroundColor: catCor + '33' }]}>
                            <Text style={[s.badgeText, { color: catCor }]}>{jogador.categoria}</Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const s = StyleSheet.create({
    card:         { backgroundColor: '#000080', borderRadius: 16, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#1a1aaa' },
    header:       { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: 1, borderBottomColor: '#1a1aaa' },
    number:       { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    numberText:   { fontSize: 16, fontWeight: '900', color: '#000' },
    title:        { flex: 1, fontSize: 16, fontWeight: '800', color: '#fff' },
    strength:     { alignItems: 'flex-end', gap: 4 },
    bar:          { width: 60, height: 4, backgroundColor: '#1a1aaa', borderRadius: 2, overflow: 'hidden' },
    fill:         { height: '100%', borderRadius: 2 },
    pts:          { fontSize: 10, color: '#888', fontWeight: '600' },
    playerRow:    { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10 },
    playerBorder: { borderBottomWidth: 1, borderBottomColor: '#0d0d55' },
    avatar:       { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
    avatarText:   { fontSize: 11, fontWeight: '800' },
    playerName:   { flex: 1, fontSize: 14, fontWeight: '600', color: '#fff' },
    badge:        { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
    badgeText:    { fontSize: 11, fontWeight: '800' },
});