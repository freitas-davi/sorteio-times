import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, FlatList,
    StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Jogador, Categoria, SorteioRequest } from '../types';
import { sortearTimes } from '../services/api';

const CORES = { A: '#32CD32', B: '#B8860B', C: '#6A6AFF', D: '#E84444' };

export default function HomeScreen() {
    const router = useRouter();
    const [numeroTimes, setNumeroTimes] = useState(2);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState<Categoria>('A');
    const [jogadores, setJogadores] = useState<Jogador[]>([]);

    function adicionarJogador() {
        if (!nome.trim()) return;
        if (jogadores.some(j => j.nome.toLowerCase() === nome.trim().toLowerCase())) {
            Alert.alert('Atenção', 'Jogador já adicionado.');
            return;
        }
        setJogadores(prev => [...prev, { nome: nome.trim(), categoria }]);
        setNome('');
    }

    function removerJogador(idx: number) {
        setJogadores(prev => prev.filter((_, i) => i !== idx));
    }

    async function handleSortear() {
        if (jogadores.length < numeroTimes) {
            Alert.alert('Atenção', `Adicione pelo menos ${numeroTimes} jogadores.`);
            return;
        }
        const request: SorteioRequest = { numeroTimes, jogadores };
        router.push({ pathname: '/loading', params: { request: JSON.stringify(request) } });
    }

    return (
        <SafeAreaView style={s.safe}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <FlatList
                    data={jogadores}
                    keyExtractor={(_, i) => String(i)}
                    ListHeaderComponent={
                        <View>
                            <Text style={s.title}>Sorteio pelada{'\n'}<Text style={s.titleAccent}>Pilantras</Text></Text>

                            {/* Número de times */}
                            <View style={s.card}>
                                <Text style={s.label}>Número de times</Text>
                                <View style={s.countRow}>
                                    <TouchableOpacity style={s.countBtn} onPress={() => setNumeroTimes(n => Math.max(2, n - 1))}>
                                        <Text style={s.countBtnText}>−</Text>
                                    </TouchableOpacity>
                                    <Text style={s.countValue}>{numeroTimes}</Text>
                                    <TouchableOpacity style={s.countBtn} onPress={() => setNumeroTimes(n => Math.min(8, n + 1))}>
                                        <Text style={s.countBtnText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Adicionar jogador */}
                            <View style={s.card}>
                                <Text style={s.label}>Adicionar jogador</Text>
                                <View style={s.addRow}>
                                    <TextInput
                                        style={s.input}
                                        placeholder="Nome do jogador"
                                        placeholderTextColor="#555"
                                        value={nome}
                                        onChangeText={setNome}
                                        onSubmitEditing={adicionarJogador}
                                        returnKeyType="done"
                                    />
                                    <TouchableOpacity style={s.addBtn} onPress={adicionarJogador}>
                                        <Text style={s.addBtnText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={s.catRow}>
                                    {(['A', 'B', 'C', 'D'] as Categoria[]).map(cat => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={[s.catBtn, categoria === cat && { backgroundColor: CORES[cat], borderColor: CORES[cat] }]}
                                            onPress={() => setCategoria(cat)}
                                        >
                                            <Text style={[s.catBtnText, categoria === cat && { color: '#000' }]}>{cat}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {jogadores.length > 0 && (
                                <Text style={s.playerCountInfo}>
                                    {jogadores.length} jogadores ·{' '}
                                    {(['A','B','C','D'] as Categoria[]).map(c => `${c}:${jogadores.filter(j=>j.categoria===c).length}`).join('  ')}
                                </Text>
                            )}
                        </View>
                    }
                    renderItem={({ item, index }) => (
                        <View style={s.playerItem}>
                            <View style={s.avatar}>
                                <Text style={s.avatarText}>
                                    {item.nome.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()}
                                </Text>
                            </View>
                            <Text style={s.playerName}>{item.nome}</Text>
                            <View style={[s.catBadge, { backgroundColor: CORES[item.categoria] + '33' }]}>
                                <Text style={[s.catBadgeText, { color: CORES[item.categoria] }]}>{item.categoria}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removerJogador(index)}>
                                <Text style={s.removeBtn}>×</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListFooterComponent={
                        <TouchableOpacity
                            style={[s.sortearBtn, jogadores.length < numeroTimes && s.sortearBtnDisabled]}
                            onPress={handleSortear}
                            disabled={jogadores.length < numeroTimes}
                        >
                            <Text style={s.sortearBtnText}>Sortear Times</Text>
                        </TouchableOpacity>
                    }
                    contentContainerStyle={s.container}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe:              { flex: 1, backgroundColor: '#000033' },
    container:         { padding: 20, paddingBottom: 40 },
    title:             { fontSize: 32, fontWeight: '900', color: '#fff', marginBottom: 24, lineHeight: 38 },
    titleAccent:       { color: '#B8860B' },
    card:              { backgroundColor: '#000080', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1a1aaa' },
    label:             { fontSize: 11, fontWeight: '700', color: '#B8860B', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 },
    countRow:          { flexDirection: 'row', alignItems: 'center', gap: 12 },
    countBtn:          { width: 44, height: 44, borderRadius: 10, backgroundColor: '#000033', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#1a1aaa' },
    countBtnText:      { color: '#fff', fontSize: 22, fontWeight: '600' },
    countValue:        { flex: 1, textAlign: 'center', fontSize: 28, fontWeight: '900', color: '#B8860B' },
    addRow:            { flexDirection: 'row', gap: 8, marginBottom: 10 },
    input:             { flex: 1, backgroundColor: '#000033', borderRadius: 10, borderWidth: 1.5, borderColor: '#1a1aaa', padding: 12, color: '#fff', fontSize: 15 },
    addBtn:            { width: 46, height: 46, backgroundColor: '#B8860B', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    addBtnText:        { fontSize: 24, fontWeight: '700', color: '#000' },
    catRow:            { flexDirection: 'row', gap: 8 },
    catBtn:            { flex: 1, height: 38, borderRadius: 8, borderWidth: 1.5, borderColor: '#1a1aaa', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000033' },
    catBtnText:        { fontSize: 13, fontWeight: '700', color: '#888' },
    playerCountInfo:   { fontSize: 12, color: '#888', textAlign: 'right', marginBottom: 8 },
    playerItem:        { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#000080', borderRadius: 10, padding: 10, marginBottom: 6 },
    avatar:            { width: 32, height: 32, borderRadius: 16, backgroundColor: '#000033', alignItems: 'center', justifyContent: 'center' },
    avatarText:        { fontSize: 11, fontWeight: '800', color: '#B8860B' },
    playerName:        { flex: 1, fontSize: 14, fontWeight: '600', color: '#fff' },
    catBadge:          { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
    catBadgeText:      { fontSize: 11, fontWeight: '800' },
    removeBtn:         { fontSize: 20, color: '#555', paddingHorizontal: 4 },
    sortearBtn:        { backgroundColor: '#B8860B', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 16 },
    sortearBtnDisabled:{ opacity: 0.4 },
    sortearBtnText:    { fontSize: 16, fontWeight: '900', color: '#000' },
});