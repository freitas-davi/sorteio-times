import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue, useAnimatedStyle, withTiming,
    Easing, runOnJS,
} from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { sortearTimes } from '../services/api';
import { SorteioRequest, SorteioResponse } from '../types';

const { width, height } = Dimensions.get('window');
const DIAGONAL = Math.sqrt(width * width + height * height);

export default function LoadingScreen() {
    const router = useRouter();
    const { request } = useLocalSearchParams<{ request: string }>();
    const scale = useSharedValue(0);
    const resultRef = useRef<SorteioResponse | null>(null);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    function navegarParaResultado() {
        if (resultRef.current) {
            router.replace({
                pathname: '/resultado',
                params: { resultado: JSON.stringify(resultRef.current) },
            });
        }
    }

    useEffect(() => {
        // Dispara API e animação em paralelo
        sortearTimes(JSON.parse(request) as SorteioRequest).then(res => {
            resultRef.current = res;
        });

        // Animação: círculo cresce até cobrir a tela inteira (~1.8s)
        scale.value = withTiming(
            DIAGONAL / 30, // raio inicial é 30px, escala até cobrir tudo
            { duration: 1800, easing: Easing.inOut(Easing.cubic) },
            (finished) => {
                if (finished) runOnJS(navegarParaResultado)();
            }
        );
    }, []);

    return (
        <View style={s.container}>
            <Animated.View style={[s.circle, animStyle]} />
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000033', alignItems: 'center', justifyContent: 'center' },
    circle:    { width: 60, height: 60, borderRadius: 30, backgroundColor: '#32CD32' },
});