# Breadth First Search (BFS)

## Introdução

Temos dois grandes algoritmos para percorrer um grafo, o DFS (Busca em Profundidade) e o BFS (Busca em Largura). A grande diferença entre eles é a  forma que ambos fazem esse caminho. Enquanto o DFS percorre o grafo baseado em profundidade, ou seja, ele primeiro andará o mais fundo possível e, quando ele não encontrar mais lugar para ir, ele volta e tenta achar novos caminhos, o BFS fará o caminho em largura, ou seja, ele vai percorrer o grafo em níveis, conforme apresentado no slide abaixo.

Vamos explorar melhor, nessa sessão, como o BFS funciona, e quais as aplicações práticas que podemos ter com ele.

<div class="slider-wrapper">
  <!-- área de slides -->
  <div class="slides-container">
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs1.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs2.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs3.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs4.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs5.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs6.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs7.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs8.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/bfs/bfs9.png" /></div>

  </div>

  <!-- índice no canto -->
  <div class="slide-index">1/3</div>

  <!-- barra de controles fixa embaixo -->
  <div class="controls-bar">
    <button class="ctrl prev" onclick="plusSlides(-1)">❮</button>
    <button class="ctrl next" onclick="plusSlides(1)">❯</button>
  </div>
</div>
<br>

<!-- Explicar como o algoritmo é implementado. -->

## Implementação

Nós vamos manter uma fila, onde o topo dessa fila é o nosso vértice atual. Percorreremos todos os vizinhos não visitados do vértice atual e vamos adicionar todos eles na fila também. Isso fará com que andemos no nosso grafo em forma de níveis.

```cpp title="bfs.cpp" linenums="1"
const int N = 2e5+5;
vector<int> graph[N]; // grafo na forma de lista de adjacência
vector<bool> vis; // saber se um vértice foi visitado ou não.


void bfs(int s) {
    queue<int> q; // fila para guardar os vértices
    q.push(s); // colocar o vértice "source" na fila.
    vis[s] = true; // marcar o vértice s

    while(!q.empty()) {
        int u = q.front(); // pegar o vértice no topo da fila
        q.pop(); // retirar o vértice do topo da fila.

        for(int v: graph[u]) { // percorrer todos os vizinhos de u
            if(!vis[v]){ // se o vértice v não tiver sido visitado
                vis[v] = true; // marque v como visitado
                q.push(v); // e coloque ele na fila
            }
        }
    }
}
```

A complexidade de usar o BFS é $\mathcal{O}(N + M)$, com $N$ sendo o número de vértices do nosso grafo, e $M$ o número de arestas.

!!! note "Aviso"
    Um erro comum ao usar algoritmos de grafos é não visitar os vértices. Se não visitar os vértices, a complexidade pode sair de algo linear para algo na ordem exponencial. Tomem cuidado!

Agora, tendo a ideia do algoritmo em mente, podemos pensar em algumas aplicações práticas do BFS em alguns problemas.

## Aplicações

Vamos assumir que todos os grafos podem ter até $N \le 2\cdot 10^{5}$ vértices e $M \le 2\cdot 10^{5}$ arestas.

### Contar componentes conexas.

Dado um grafo $G$, contar quantas componentes conexas ele possui.

A ideia é ir por cada vértice não visitado e percorrer a sua componente conexa, visitando todo mundo dela, para ela ser contabilizada somente uma vez. Após percorrer todas as componentes, teremos no final a quantidade guardada em alguma variável.

```cpp title="connected_component.cpp" linenums="1"

int components() {
	int rs = 0; // guardar qtd de componentes

	for(int i=1; i<=n; i++) {
		if(!vis[i]){
			rs++;
			bfs(i);
		}
	}
}

```

Essencialmente, o código apresentado acima é o mesmo que o usado na sessão de DFS, mas com um BFS no lugar. Podemos fazer exatamente a mesma coisa para contar quantos vértices tem em cada componente conexa também, apenas trocando o algoritmo de DFS para o de BFS.

### Caminho mínimo

Dado um grafo $G$ sem pesos nas arestas e dois vértices $s$ e $t$, achar qual o caminho mínimo de $s$ a $t$. Caso ele não exista, exiba isso.

Como o caminho feito pelo algoritmo é em largura, o que acontece é que ele também calcula a distância mínima de um vértice inicial para todos os outros pertencentes a mesma componente que ele, pois a ideia é que, agora, estamos andando em níveis, e só iremos visitar um nível novo quando já tivermos visitado todo o nível atual. Com isso, podemos caminhar no grafo e garantir que o caminho encontrado de um vértice inicial a todos os outros é o menor possível.

## Problemas recomendados
- <a href="https://cses.fi/problemset/task/1667" target="_blank">CSES - Message Route</a>
- <a href="https://cses.fi/problemset/task/1192" target="_blank">CSES - Counting Rooms</a>
- <a href="https://cses.fi/problemset/task/1193" target="_blank">CSES - Labyrinth</a>
- <a href="https://cses.fi/problemset/task/1194" target="_blank">CSES - Monsters</a>
- <a href="https://atcoder.jp/contests/abc405/tasks/abc405_d" target="_blank">Atcoder - Escape Route</a>
- <a href="https://codeforces.com/contest/520/problem/B" target="_blank">Codeforces - Two Buttons</a>
- <a href="https://codeforces.com/contest/2116/problem/C" target="_blank">Codeforces - Gellyfish and Flaming Peony</a>
- <a href="https://codeforces.com/contest/2114/problem/F" target="_blank">Codeforces - Small Operations</a>