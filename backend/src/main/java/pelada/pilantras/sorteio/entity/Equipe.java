package pelada.pilantras.sorteio.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Equipe {

    private int numero;

    private List<Jogador> jogadores;

    private int forca;

}
