package pelada.pilantras.sorteio.dto;

import pelada.pilantras.sorteio.entity.Jogador;
import tools.jackson.databind.annotation.JsonDeserialize;

import java.util.List;

@JsonDeserialize
public record SorteioRequestDTO(

        int numeroTimes,

        List<Jogador> jogadores

) { }
