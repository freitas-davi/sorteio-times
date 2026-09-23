# Sorteio de Times

Um aplicativo inteligente para sortear times de forma equilibrada em peladas de futebol. O sistema leva em conta o nível de cada jogador para criar times com força semelhante.

---

## O Que É?

É uma ferramenta que automatiza o sorteio de times em peladas, distribuindo jogadores de forma **justa e equilibrada**. Em vez de um sorteio aleatório, o algoritmo considera o nível técnico de cada jogador (A, B, C ou D) para criar times com força semelhante.

### Por que é útil?
- **Sem sorteio injusto:** Não mais times desbalanceados
- **Rápido:** Sorteia em segundos
- **Responsivo:** Funciona no celular
- **Intuitivo:** Interface amigável

---

## 🔧 Como Funciona

### Algoritmo de Sorteio

1. **Validação:** Verifica se há jogadores suficientes para o número de times
2. **Embaralhamento:** Embaralha aleatoriamente os jogadores
3. **Ordenação:** Ordena por categoria (A → B → C → D)
4. **Distribuição Greedy:** Aloca cada jogador ao time com menor força acumulada

### Sistema de Categorias

| Categoria | Peso | Descrição    |
|-----------|------|--------------|
| **A** | 4 | Craque       |
| **B** | 3 | Bom          |
| **C** | 2 | Da pro gasto |
| **D** | 1 | Perna de pau |

**Exemplo:**
- 2 jogadores A + 1 jogador D = Força 9
- 1 jogador A + 2 jogadores C = Força 8 (equilibrado!)

---

## 🚀 Getting Started

### Pré-requisitos

- **Java 21+** (para backend)
- **Node.js 18+** (para frontend)
- **Maven 3.8+** (incluído com o projeto)


---

## 📦 Dependências

### Backend
- **Spring Boot 4.1.1** - Framework web
- **Lombok** - Geração de código
- **Maven** - Build tool

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 8** - Build tool
- **Axios** - HTTP client
- **React Router v7** - Navegação
- **Oxlint** - Linter
