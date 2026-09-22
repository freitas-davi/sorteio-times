package pelada.pilantras.sorteio.dto;

import pelada.pilantras.sorteio.entity.Equipe;

import java.util.List;

public record SorteioResponseDTO(

        List<Equipe> equipes

) { }
