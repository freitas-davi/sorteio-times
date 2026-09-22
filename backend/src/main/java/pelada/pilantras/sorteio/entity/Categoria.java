package pelada.pilantras.sorteio.entity;

public enum Categoria {

    A,
    B,
    C,
    D;

    public int peso() {
        return switch (this) {
            case A -> 5;
            case B -> 3;
            case C -> 2;
            case D -> 1;
        };
    }

}
