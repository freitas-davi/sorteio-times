import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {Jogador, Categoria, SorteioRequest} from '../types'
import PlayerCard from '../components/PlayerCard'
import styles from './Home.module.css'

const CAT_COLORS: Record<Categoria, string> = {
    A: '#4A9EFF', B:  '#32CD32', C: '#B8860B', D: '#E84444'
}

export default function Home() {
    const navigate = useNavigate()
    const [numeroTimes, setNumeroTimes] = useState(2)
    const [nome, setNome] = useState('')
    const [categoria, setCategoria] = useState<Categoria>('A')
    const [jogadores, setJogadores] = useState<Jogador[]>([])
    const [erro, setErro] = useState('')

    function adicionarJogador() {
        if (!nome.trim()) return
        if (jogadores.some(j => j.nome.toLowerCase() === nome.trim().toLowerCase())) {
            setErro('Jogador já adicionado.')
            return
        }
        setErro('')
        setJogadores(prev => [...prev, { nome: nome.trim(), categoria }])
        setNome('')
    }

    function removerJogador(idx: number) {
        setJogadores(prev => prev.filter((_, i) => i !== idx))
    }

    function handleSortear() {
        if (jogadores.length < numeroTimes) {
            setErro(`Adicione pelo menos ${numeroTimes} jogadores.`)
            return
        }
        const request: SorteioRequest = { numeroTimes, jogadores }
        navigate('/loading', { state: { request } })
    }


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>Sorteio de times</span>
                <h1>Pelada<span> Pilantras</span></h1>
            </header>

            <div className={styles.divider} />

            {/* Step 1 */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    {/*<span className={styles.sectionNum}>01</span>*/}
                    <span className={styles.sectionTitle}>Número de times</span>
                </div>
                <div className={styles.countRow}>
                    <button className={styles.countBtn} onClick={() => setNumeroTimes(n => Math.max(2, n - 1))}>−</button>
                    <span className={styles.countValue}>{String(numeroTimes).padStart(2, '0')}</span>
                    <button className={styles.countBtn} onClick={() => setNumeroTimes(n => Math.min(8, n + 1))}>+</button>
                </div>
            </div>

            <div className={styles.divider} />

            {/* Step 2 */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    {/*<span className={styles.sectionNum}>02</span>*/}
                    <span className={styles.sectionTitle}>Adicionar jogador</span>
                </div>

                <div className={styles.inputRow}>
                    <input
                        className={styles.input}
                        placeholder="Nome do jogador"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && adicionarJogador()}
                        maxLength={30}
                    />
                </div>

                <div className={styles.catRow}>
                    {(['A', 'B', 'C', 'D'] as Categoria[]).map(cat => (
                        <button
                            key={cat}
                            className={`${styles.catBtn} ${categoria === cat ? styles.catBtnActive : ''}`}
                            style={categoria === cat ? { background: CAT_COLORS[cat] } : {}}
                            onClick={() => setCategoria(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <button className={styles.confirmBtn} onClick={adicionarJogador}>
                    Confirmar jogador
                </button>
            </div>

            <div className={styles.divider} />

            {/* Step 3 — Lista */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    {/*<span className={styles.sectionNum}>03</span>*/}
                    <span className={styles.sectionTitle}>Lista jogadores</span>
                    {jogadores.length > 0 && (
                        <span className={styles.sectionMeta}>
              {String(jogadores.length).padStart(2, '0')} jogadores
            </span>
                    )}
                </div>

                <div className={styles.playerList}>
                    {jogadores.map((j, i) => (
                        <PlayerCard key={i} jogador={j} index={i} onRemove={removerJogador} />
                    ))}
                </div>
            </div>

            {erro && <div className={styles.erro}>{erro}</div>}

            <button
                className={styles.sortearBtn}
                onClick={handleSortear}
                disabled={jogadores.length < numeroTimes}
            >
                Sortear times
            </button>

            <footer className={styles.footer}>Created by - DaviDev</footer>
        </div>
    )
}