package pelada.pilantras.sorteio.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Jogador {

    private String nome;

    private Categoria categoria;

}
