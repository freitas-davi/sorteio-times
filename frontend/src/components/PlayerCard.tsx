import type {Jogador} from '../types'
import styles from './PlayerCard.module.css'

const CAT_COLORS: Record<string, string> = {
    A: '#4A9EFF', B: '#32CD32', C: '#B8860B', D: '#E84444'
}

interface Props {
    jogador: Jogador
    index: number
    onRemove: (index: number) => void
}

export default function PlayerCard({ jogador, index, onRemove }: Props) {
    const cor = CAT_COLORS[jogador.categoria]
    return (
        <div className={styles.container}>
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.nome}>{jogador.nome}</span>
            <span className={styles.badge} style={{ color: cor }}>
            {jogador.categoria}
      </span>
            <button className={styles.remove} onClick={() => onRemove(index)}>×</button>
        </div>
    )
}