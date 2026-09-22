import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SorteioResponse, Equipe, Jogador } from '../types';

const TEAM_COLORS = ['#B8860B', '#4CAF9E', '#E84444', '#9B8AFB', '#F5A623', '#5BA4E5'];
const CAT_COLORS  = { A: '#32CD32', B: '#B8860B', C: '#6A6AFF' };

export default function ResultadoScreen() {
    const router = useRouter();
    const { resultado } = useLocalSearchParams<{ resultado: string }>();
    const { equipes } = JSON.parse(resultado) as SorteioResponse;
    const maxForca = Math.max(...equipes.map(e => e.forca));

    return (
        <SafeAreaView style={s.safe}>
            <FlatList
                data={equipes}
                keyExtractor={item => String(item.numero)}
                ListHeaderComponent={
                    <View style={s.header}>
                        <Text style={s.title}>Times <Text style={s.titleAccent}>Sorteados</Text></Text>
                    </View>
                }
                renderItem={({ item, index }: { item: Equipe; index: number }) => {
                    const cor = TEAM_COLORS[index % TEAM_COLORS.length];
                    const fillPct = (item.forca / maxForca) * 100;
                    return (
                        <View style={s.teamCard}>
                            <View style={s.teamHeader}>
                                <View style={[s.teamNumber, { backgroundColor: cor }]}>
                                    <Text style={s.teamNumberText}>{item.numero}</Text>
                                </View>
                                <Text style={s.teamTitle}>Time {item.numero}</Text>
                                <View style={s.strengthContainer}>
                                    <View style={s.strengthBar}>
                                        <View style={[s.strengthFill, { width: `${fillPct}%` as any, backgroundColor: cor }]} />
                                    </View>
                                    <Text style={s.strengthText}>{item.forca}pts</Text>
                                </View>
                            </View>
                            {item.jogadores.map((jogador: Jogador, i: number) => (
                                <View key={i} style={[s.playerRow, i < item.jogadores.length - 1 && s.playerBorder]}>
                                    <View style={[s.avatar, { backgroundColor: cor + '22' }]}>
                                        <Text style={[s.avatarText, { color: cor }]}>
                                            {jogador.nome.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()}
                                        </Text>
                                    </View>
                                    <Text style={s.playerName}>{jogador.nome}</Text>
                                    <View style={[s.catBadge, { backgroundColor: CAT_COLORS[jogador.categoria] + '33' }]}>
                                        <Text style={[s.catText, { color: CAT_COLORS[jogador.categoria] }]}>{jogador.categoria}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    );
                }}
                ListFooterComponent={
                    <View style={s.footer}>
                        <TouchableOpacity style={s.newBtn} onPress={() => router.replace('/')}>
                            <Text style={s.newBtnText}>↺ Novo Sorteio</Text>
                        </TouchableOpacity>
                    </View>
                }
                contentContainerStyle={s.container}
            />
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe:             { flex: 1, backgroundColor: '#000033' },
    container:        { padding: 20, paddingBottom: 40 },
    header:           { marginBottom: 24 },
    title:            { fontSize: 32, fontWeight: '900', color: '#fff', lineHeight: 38 },
    titleAccent:      { color: '#B8860B' },
    teamCard:         { backgroundColor: '#000080', borderRadius: 16, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#1a1aaa' },
    teamHeader:       { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: 1, borderBottomColor: '#1a1aaa' },
    teamNumber:       { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    teamNumberText:   { fontSize: 16, fontWeight: '900', color: '#000' },
    teamTitle:        { flex: 1, fontSize: 16, fontWeight: '800', color: '#fff' },
    strengthContainer:{ alignItems: 'flex-end', gap: 4 },
    strengthBar:      { width: 60, height: 4, backgroundColor: '#1a1aaa', borderRadius: 2, overflow: 'hidden' },
    strengthFill:     { height: '100%', borderRadius: 2 },
    strengthText:     { fontSize: 10, color: '#888', fontWeight: '600' },
    playerRow:        { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10 },
    playerBorder:     { borderBottomWidth: 1, borderBottomColor: '#0d0d55' },
    avatar:           { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
    avatarText:       { fontSize: 11, fontWeight: '800' },
    playerName:       { flex: 1, fontSize: 14, fontWeight: '600', color: '#fff' },
    catBadge:         { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
    catText:          { fontSize: 11, fontWeight: '800' },
    footer:           { marginTop: 8 },
    newBtn:           { borderWidth: 1.5, borderColor: '#B8860B', borderRadius: 14, padding: 16, alignItems: 'center' },
    newBtnText:       { fontSize: 15, fontWeight: '700', color: '#B8860B' },
});