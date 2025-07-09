# C++ Standard Template Library (STL)

## Aula relacionada recomendada

<figure markdown="span" class="left-caption">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/beHruxE8D0M?si=gQICcS7_hceNuraj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Cŕeditos: Canal Maratona UFMG.</figcaption>
</figure>

## Conhecendo a STL
A **Standard Template Library** (STL) do C++ é um conjunto de classes e funções baseadas em templates que implementam estruturas de dados e algoritmos amplamente utilizados, como listas, pilhas, vetores, ordenação, busca, entre outros.

Nesta seção, vamos conhecer as principais estruturas e algoritmos da STL que são usados na programação competitiva.

As estruturas de dados mais comuns são:

| Estrutura   | Descrição                            |
| ----------- | ------------------------------------ |
| `vector`    |      Armazena elementos como um array, mas pode alterar seu tamanho dinamicamente. A adição e remoção de elementos geralmente ocorrem no final, e os elementos podem ser acessados por índice.  |
| `set`       |      Armazena elementos únicos de forma ordenada (crescente). Elementos não podem ser acessados por índice. |
| `map`       |  Armazena elementos em pares "chave/valor". Pode ser acessado através das chaves, e não pelo índice. |
| `pair`     |      Armazena dois valores como um único elemento, onde cada valor pode ter um tipo diferente. O acesso aos valores é feito por meio de `first` e `second`. |
| `stack`     |      Armazena elementos em uma ordem específica, chamada LIFO (Last In, First Out), onde os elementos podem ser adicionados e removidos apenas do topo (como uma pilha). Não é acessível por índice. |
| `queue`     |      Armazena elementos em uma ordem específica, chamada FIFO (First In, First Out), onde os elementos são adicionados no final e removidos da frente (como uma fila). Não é acessível por índice. |
| `priority_queue`      |    Armazena elementos em uma ordem específica, os elementos de maior prioridade aparecem primeiro (por padrão, os elementos de maior valor), é parecido com a queue, pois você só pode acessar os elementos da frente, mas aqui a ordem é determinada não pela ordem de inserção. Não é acessível por índice. |
| `deque`     |      Armazena elementos em uma fila de duas extremidades (deque), onde os elementos podem ser adicionados e removidos de ambos os lados. Os elementos podem ser acessados por índice. |


Os algoritmos mais comuns são:

| Algoritmo      | Descrição                          |
| ----------- | ------------------------------------ |
| `sort`       | Ordena os elementos em uma estrutura de dados.  |
| `reverse`       | Inverte a ordem dos elementos em um determinado intervalo. |
| `swap`    | Troca os valores de duas variáveis. |

## Template básico para a prática desta seção

Para facilitar nossa prática nessa seção utilizaremos esse template simples
para praticar as estruturas:

```cpp title="template.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {

  return 0;
}
```

### `#!cpp #include <bits/stdc++.h>`
É um arquivo de cabeçalho que já inclui todas as bibliotecas padrão, ou seja, você não precisa dar `#!cpp #include` manualmente para cada estrutura de dados ou algoritmo que for usar. Por exemplo, se precisar de `vector` e `set`, normalmente teria que incluir `#!cpp #include <vector>` e `#!cpp #include <set>` separadamente. Com `#!cpp #include <bits/stdc++.h>`, tudo isso já vem junto, facilitando o uso e economizando tempo.

### `#!cpp using namespace std;`
O `#!cpp using namespace std;` é uma diretiva no C++ que permite que você use os elementos da biblioteca padrão (std) sem precisar escrever `#!cpp std::` antes de cada um deles. Isso facilita a escrita do código, pois você não precisa digitar `#!cpp std::` repetidamente para acessar coisas como `#!cpp cout`, `#!cpp cin`, `#!cpp vector`, entre outros.

Por exemplo, se você não usar o `#!cpp using namespace std;`, seria necessário escrever `#!cpp std::cout`, `#!cpp std::cin`, `#!cpp std::vector`, etc. Com o `#!cpp using namespace std;`, basta escrever `#!cpp cout`, `#!cpp cin`, `#!cpp vector`, e o compilador entenderá automaticamente que você está se referindo à versão padrão dessas funções e estruturas.

## Estruturas de Dados
Em cada um dos links abaixo, você encontra referências que ensinam a utilizar cada uma das estruturas.

- ``vector``: <a href="https://www.geeksforgeeks.org/vector-in-cpp-stl/" target="_blank">https://www.geeksforgeeks.org/vector-in-cpp-stl/</a>
- ``set``: <a href="https://www.geeksforgeeks.org/set-in-cpp-stl/" target="_blank">https://www.geeksforgeeks.org/set-in-cpp-stl/</a>
- ``map``: <a href="https://www.geeksforgeeks.org/cpp/map-associative-containers-the-c-standard-template-library-stl/" target="_blank">https://www.geeksforgeeks.org/cpp/map-associative-containers-the-c-standard-template-library-stl/</a>
- ``pair``: <a href="https://www.geeksforgeeks.org/pair-in-cpp-stl/" target="_blank">https://www.geeksforgeeks.org/pair-in-cpp-stl/</a>
- ``stack``: <a href="https://www.geeksforgeeks.org/stack-in-cpp-stl/" target="_blank">https://www.geeksforgeeks.org/stack-in-cpp-stl/</a>
- ``queue``: <a href="https://www.geeksforgeeks.org/queue-cpp-stl/" target="_blank">https://www.geeksforgeeks.org/queue-cpp-stl/</a>
- ``priority_queue``: <a href="https://www.geeksforgeeks.org/cpp/priority-queue-in-cpp-stl/" target="_blank">https://www.geeksforgeeks.org/cpp/priority-queue-in-cpp-stl/</a>
- ``deque``:  <a href="https://www.geeksforgeeks.org/deque-cpp-stl/" target="_blank">https://www.geeksforgeeks.org/deque-cpp-stl/</a>

## Algoritmos
Em cada um dos links abaixo, você encontra referências que ensinam a utilizar cada um dos algoritmos.

<a href="https://www.geeksforgeeks.org/swap-in-cpp/" target="_blank">https://www.geeksforgeeks.org/swap-in-cpp/</a>

- ``sort``: <a href="https://www.geeksforgeeks.org/sort-c-stl/" target="_blank">https://www.geeksforgeeks.org/sort-c-stl/</a>
- ``reverse``: <a href="https://www.geeksforgeeks.org/stdreverse-in-c/" target="_blank">https://www.geeksforgeeks.org/stdreverse-in-c/</a>
- ``swap``: <a href="https://www.geeksforgeeks.org/swap-in-cpp/" target="_blank">https://www.geeksforgeeks.org/swap-in-cpp/</a>

!!! Tip "Pro Tip"
    Conhecer as estruturas e algoritmos básicos da STL vão te ajudar bastante na sua jornada em programação competitiva.

## Lista de exercícios

- <a href="https://cses.fi/problemset/task/1621" target="_blank">CSES - Distinct Numbers</a>
- <a href="https://neps.academy/br/exercise/276" target="_blank">OBI - Copa do Mundo</a>
- <a href="https://neps.academy/br/exercise/2233" target="_blank">Neps Academy - Mini Dicionário</a>
- <a href="https://neps.academy/br/exercise/492" target="_blank">OBI - Sinuca</a>
- <a href="https://neps.academy/br/exercise/252" target="_blank">OBI - Frequência na aula</a>
- <a href="https://neps.academy/br/exercise/1486" target="_blank">OBI - Zero para Cancelar</a>
- <a href="https://neps.academy/br/exercise/253" target="_blank">OBI - Times</a>
- <a href="https://neps.academy/br/exercise/2070" target="_blank">OBI - Bombom</a>
- <a href="https://neps.academy/br/exercise/271" target="_blank">OBI - Expressões</a>
- <a href="https://olimpiada.ic.unicamp.br/pratique/p2/2015/f1/quebra/" target="_blank">OBI - Quebra-cabeça</a>
