import type {Jogador} from '../types'
import styles from './PlayerCard.module.css'

const CAT_COLORS: Record<string, string> = {
    A: '#32CD32', B: '#B8860B', C: '#6A6AFF', D: '#E84444'
}

interface Props {
    jogador: Jogador
    index: number
    onRemove: (index: number) => void
}

export default function PlayerCard({ jogador, index, onRemove }: Props) {
    const initials = jogador.nome.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    const cor = CAT_COLORS[jogador.categoria]

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <span style={{ color: cor }}>{initials}</span>
            </div>
            <span className={styles.nome}>{jogador.nome}</span>
            <span className={styles.badge} style={{ background: cor + '33', color: cor }}>
        {jogador.categoria}
      </span>
            <button className={styles.remove} onClick={() => onRemove(index)}>×</button>
        </div>
    )
}