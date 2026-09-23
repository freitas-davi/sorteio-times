import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {Jogador, Categoria, SorteioRequest} from '../types'
import PlayerCard from '../components/PlayerCard'
import escudo from '../assets/escudo_pilantras.png'
import styles from './Home.module.css'

const CAT_COLORS: Record<Categoria, string> = {
    A: '#32CD32', B: '#B8860B', C: '#6A6AFF', D: '#E84444'
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

    const contagem = (['A', 'B', 'C', 'D'] as Categoria[]).map(c => ({
        cat: c, count: jogadores.filter(j => j.categoria === c).length
    }))

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img src={escudo} alt="PDP" className={styles.icon} />
                <h1>Sorteio <span className={styles.accent}>Pelada Pilantras</span></h1>
            </header>

            {/* Número de times */}
            <div className={styles.card}>
                <span className={styles.label}>Número de times</span>
                <div className={styles.countRow}>
                    <button className={styles.countBtn} onClick={() => setNumeroTimes(n => Math.max(2, n - 1))}>−</button>
                    <span className={styles.countValue}>{numeroTimes}</span>
                    <button className={styles.countBtn} onClick={() => setNumeroTimes(n => Math.min(8, n + 1))}>+</button>
                </div>
            </div>

            {/* Adicionar jogador */}
            <div className={styles.card}>
                <span className={styles.label}>Adicionar jogador</span>
                <div className={styles.addRow}>
                    <input
                        className={styles.input}
                        placeholder="Nome do jogador"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && adicionarJogador()}
                        maxLength={30}
                    />
                    <button className={styles.addBtn} onClick={adicionarJogador}>+</button>
                </div>
                <div className={styles.catRow}>
                    {(['A', 'B', 'C', 'D'] as Categoria[]).map(cat => (
                        <button
                            key={cat}
                            className={`${styles.catBtn} ${categoria === cat ? styles.catBtnActive : ''}`}
                            style={categoria === cat ? { background: CAT_COLORS[cat], borderColor: CAT_COLORS[cat] } : {}}
                            onClick={() => setCategoria(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lista de jogadores */}
            {jogadores.length > 0 && (
                <>
                    <div className={styles.playerCountInfo}>
                        {jogadores.length} jogadores · {contagem.filter(c => c.count > 0).map(c => `${c.cat}:${c.count}`).join('  ')}
                    </div>
                    <div className={styles.playerList}>
                        {jogadores.map((j, i) => (
                            <PlayerCard key={i} jogador={j} index={i} onRemove={removerJogador} />
                        ))}
                    </div>
                </>
            )}

            {erro && <div className={styles.erro}>{erro}</div>}

            <button
                className={styles.sortearBtn}
                onClick={handleSortear}
                disabled={jogadores.length < numeroTimes}
            >
                Sortear Times
            </button>
            <footer className={styles.footer}>created by DaviDev</footer>
        </div>
    )
}