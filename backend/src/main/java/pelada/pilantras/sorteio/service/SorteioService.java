package pelada.pilantras.sorteio.service;

import org.springframework.stereotype.Service;
import pelada.pilantras.sorteio.dto.SorteioRequestDTO;
import pelada.pilantras.sorteio.dto.SorteioResponseDTO;
import pelada.pilantras.sorteio.entity.Equipe;
import pelada.pilantras.sorteio.entity.Jogador;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SorteioService {

    public SorteioResponseDTO sortear(SorteioRequestDTO request) {
        List<Jogador> jogadores = new ArrayList<>(request.jogadores());
        int numeroTimes = request.numeroTimes();

        validar(jogadores, numeroTimes);

        jogadores = embaralharPorCategoria(jogadores);

        List<Equipe> equipes = distribuir(jogadores, numeroTimes);

        return new SorteioResponseDTO(equipes);
    }

    // 1. Valida a entrada antes de qualquer processamento
    private void validar(List<Jogador> jogadores, int numeroTimes) {
        if (numeroTimes < 2) {
            throw new IllegalArgumentException("Número de times deve ser pelo menos 2.");
        }
        if (jogadores.size() < numeroTimes) {
            throw new IllegalArgumentException(
                    "Jogadores insuficientes: %d jogadores para %d equipes.".formatted(jogadores.size(), numeroTimes)
            );
        }
    }

    // 2. Dentro de cada categoria, embaralha aleatoriamente
    //    Depois ordena: A primeiro, C por último
    //    Assim o greedy funciona corretamente
    private List<Jogador> embaralharPorCategoria(List<Jogador> jogadores) {
        Collections.shuffle(jogadores);

        return jogadores.stream()
                .sorted(Comparator.comparingInt(j -> -j.getCategoria().peso()))
                .collect(Collectors.toList());
    }

    private List<Equipe> distribuir(List<Jogador> jogadores, int numeroTimes) {

        int[] forcas = new int[numeroTimes];
        List<List<Jogador>> times = new ArrayList<>();

        for (int i = 0; i < numeroTimes; i++) {
            times.add(new ArrayList<>());
        }

        for (Jogador jogador : jogadores) {
            int timeMaisFraco = indiceMenorValor(forcas);
            times.get(timeMaisFraco).add(jogador);
            forcas[timeMaisFraco] += jogador.getCategoria().peso();
        }

        // Monta a resposta
        List<Equipe> equipes = new ArrayList<>();
        for (int i = 0; i < numeroTimes; i++) {
            equipes.add(
                    new Equipe(i + 1, times.get(i), forcas[i])
            );
        }
        return equipes;
    }

    private int indiceMenorValor(int[] arr) {
        int idx = 0;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < arr[idx]) idx = i;
        }
        return idx;
    }

}
