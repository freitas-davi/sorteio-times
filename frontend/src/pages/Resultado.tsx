import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import type { RefObject } from 'react'
import type { SorteioResponse } from '../types'
import TeamCard from '../components/TeamCard'
import styles from './Resultado.module.css'

interface Props {
    resultadoRef: RefObject<SorteioResponse | null>
}

export default function Resultado({ resultadoRef }: Props) {
    const navigate = useNavigate()
    const resultado = resultadoRef.current

    useEffect(() => {
        if (!resultado) {
            navigate('/', { replace: true })
        }
    }, [resultado, navigate]);

    if (!resultado) return null

    const maxForca = Math.max(...resultado.equipes.map(e => e.forca))

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <div className={styles.topbarIcon}>P.D.P</div>
                <span className={styles.topbarLabel}>Pelada dos Pilantras</span>
            </div>

            <div className={styles.teamList}>
                {resultado.equipes.map((equipe, i) => (
                    <TeamCard key={equipe.numero} equipe={equipe} index={i} maxForca={maxForca} />
                ))}
            </div>

            <button className={styles.newBtn} onClick={() => navigate('/')}>
                ↺ Novo sorteio
            </button>
        </div>
    )
}