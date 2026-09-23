import { useNavigate } from 'react-router-dom'
import type {RefObject} from 'react'
import type {SorteioResponse} from '../types'
import TeamCard from '../components/TeamCard'
import styles from './Resultado.module.css'

interface Props {
    resultadoRef: RefObject<SorteioResponse | null>
}

export default function Resultado({ resultadoRef }: Props) {
    const navigate = useNavigate()
    const resultado = resultadoRef.current

    if (!resultado) {
        navigate('/', { replace: true })
        return null
    }

    const maxForca = Math.max(...resultado.equipes.map(e => e.forca))

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>🏆 Times <span className={styles.accent}>Sorteados</span></h1>
            </header>

            <div className={styles.teamList}>
                {resultado.equipes.map((equipe, i) => (
                    <TeamCard key={equipe.numero} equipe={equipe} index={i} maxForca={maxForca} />
                ))}
            </div>

            <button className={styles.newBtn} onClick={() => navigate('/')}>
                ↺ Novo Sorteio
            </button>
        </div>
    )
}