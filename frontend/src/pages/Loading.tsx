import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { sortearTimes } from '../services/api'
import type {SorteioRequest, SorteioResponse} from '../types'
import type {RefObject} from 'react'
import styles from './Loading.module.css'

interface Props {
    resultadoRef: RefObject<SorteioResponse | null>
}

export default function Loading({ resultadoRef }: Props) {
    const navigate = useNavigate()
    const location = useLocation()
    const { request } = location.state as { request: SorteioRequest }
    const hasNavigated = useRef(false)

    useEffect(() => {
        const MIN_DURATION = 2000

        const start = Date.now()

        sortearTimes(request).then(res => {
            resultadoRef.current = res
            const elapsed = Date.now() - start
            const remaining = Math.max(0, MIN_DURATION - elapsed)
            setTimeout(() => {
                if (!hasNavigated.current) {
                    hasNavigated.current = true
                    navigate('/resultado', { replace: true })
                }
            }, remaining)
        })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.ripple} />
            <div className={styles.ripple2} />
            <div className={styles.circle} />
            <p className={styles.text}>Sorteando times...</p>
        </div>
    )
}