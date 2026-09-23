import type {Equipe} from '../types'
import styles from './TeamCard.module.css'

const TEAM_COLORS = ['#B8860B', '#4CAF9E', '#E84444', '#9B8AFB', '#F5A623', '#5BA4E5']
const CAT_COLORS: Record<string, string> = {
    A: '#32CD32', B: '#B8860B', C: '#6A6AFF', D: '#E84444'
}

interface Props {
    equipe: Equipe
    index: number
    maxForca: number
}

export default function TeamCard({ equipe, index, maxForca }: Props) {
    const cor = TEAM_COLORS[index % TEAM_COLORS.length]
    const fillPct = (equipe.forca / maxForca) * 100

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.number} style={{ background: cor }}>
                    <span>{equipe.numero}</span>
                </div>
                <span className={styles.title}>Time {equipe.numero}</span>
                <div className={styles.strength}>
                    <div className={styles.bar}>
                        <div className={styles.fill} style={{ width: `${fillPct}%`, background: cor }} />
                    </div>
                    <span className={styles.pts}>{equipe.forca}pts</span>
                </div>
            </div>
            <div className={styles.players}>
                {equipe.jogadores.map((jogador, i) => {
                    const initials = jogador.nome.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
                    const catCor = CAT_COLORS[jogador.categoria]
                    return (
                        <div key={i} className={styles.playerRow} style={{ borderBottomColor: i < equipe.jogadores.length - 1 ? '#0d0d55' : 'transparent' }}>
                            <div className={styles.avatar} style={{ background: cor + '22' }}>
                                <span style={{ color: cor }}>{initials}</span>
                            </div>
                            <span className={styles.playerName}>{jogador.nome}</span>
                            <span className={styles.badge} style={{ background: catCor + '33', color: catCor }}>{jogador.categoria}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}