# Breadth First Search (BFS)

## Aula relacionada recomendada

<figure markdown="span" class="left-caption">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/_CQ0kQmZhG4?si=6Xi9edVGHIOBM6sj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Créditos: Canal Maratona UFMG </figcaption>
</figure>

## Introdução

O BFS é um algoritmo de Busca em Largura. Podemos interpretar a busca em largura como um incêndio em uma floresta. O incêncio começa de algum foco inicial, depois, ele se espalha pelas árvores mais próximas, até se tornar algo quase incontrolável. No algoritmo de BFS, a ideia é essencialmente a mesma: começamos de um vértice inicial e andamos primeiro para todos os vizinhos próximos, depois, ele se espalha para os vizinhos dos vizinhos, e assim por diante. Uma pequena ilustração de como o algoritmo funciona está demonstrado na sequência de imagens abaixo.

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

Vamos explorar melhor nessa sessão como implementar o BFS e quais são as aplicações práticas que podemos ter com ele.

## Implementação

Nós vamos manter uma fila, onde o topo dessa fila é o nosso vértice atual. Percorreremos todos os vizinhos não visitados do vértice atual, marcamos eles como visitados e adicionamos eles na fila. Com isso, andaremos no grafo em níveis, como o exemplo do incêndio falado no começo dessa seção.

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

Agora, tendo a ideia do algoritmo em mente, podemos pensar em algumas aplicações práticas do BFS em alguns problemas.

## Aplicações

Vamos assumir que todos os grafos podem ter até $N \le 2\cdot 10^{5}$ vértices e $M \le 2\cdot 10^{5}$ arestas.

### Contar componentes conexas

Dado um grafo $G$, contar quantas componentes conexas ele possui.

A ideia principal para contar a quantidade de componentes conexas é caminhar nos vértices que ainda não foram visitados, pois, se esse vértice ainda não foi visitado, ele e todos os outros vértices alcançáveis por ele fazem parte da mesma componente conexa. Assim, a solução se torna fazer o BFS em cada vértice ainda não visitado em qualquer ordem, e para cada chamada, aumentar em $1$ a resposta final.

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

Essencialmente, o código apresentado acima é o mesmo que o usado na sessão de DFS, mas com um BFS no lugar. Ambos algoritmos podem ser usados para resolver o problema de contar componentes conexas, e suas variadas aplicações.

### Caminho mínimo

Dado um grafo $G$ sem pesos nas arestas e dois vértices $s$ e $t$, achar qual o caminho mínimo de $s$ a $t$. Caso ele não exista, exiba isso.

Como o caminho feito pelo algoritmo é em largura, o que acontece é que ele também calcula a distância mínima de um vértice inicial para todos os outros pertencentes a mesma componente que ele, pois a ideia é que, agora, estamos andando em níveis, e só iremos visitar um nível novo quando já tivermos visitado todo o nível atual. Com isso, podemos caminhar no grafo e garantir que o caminho encontrado de um vértice inicial a todos os outros é o menor possível.

Para a implementação do algoritmo, vamos inicializar todos os valores de $dist[i]$ com $\infty$, sendo que $\infty$ é um número muito grande. Suponha que o nosso vértice atual seja $u$. Para todo vizinho de $u$, vamos chamá-lo de $v$, vamos verificar se devemos colocar ele na fila, vendo se a distância percorrida para chegar até ele é menor do que a distância percorrida até ele atualmente, ou seja, $dist[v] > dist[u]+1$. Se for, atualize e coloque o vértice na fila.

Se quisermos recuperar o caminho de $s$ a $t$, podemos guardar mais informação. No nosso caso, podemos guardar um vetor que marca quem é o pai de um certo vértice $u$, assim podemos manter, para cada $u$ do grafo, por qual vértice eu passei para chegar nele, com exceção do vértice inicial, que não possui antecessor. Como queremos sair do vértice $s$ até o $t$, para recuperar o caminho, sairemos de $t$ até $s$. Abaixo ficará o código que ilustra essa implementação do caminho mínimo mais a recuperação do caminho.

```cpp title="min_path.cpp" linenums="1"
const int N = 2e5+5;
vector<int> graph[N];
int dist[N]; // usando distância.
int pai[N]; // quem é pai de quem

void bfs(int s) {
	for(int i=1; i<N; i++){
		dist[i] = N+10; // valor grande.
		pai[i] = -1;
	}

    queue<int> q;
    q.push(s);
	dist[s] = 0;

    while(!q.empty()) {
        int u = q.front();
        q.pop();

        for(int v: graph[u]) {
            if(dist[v] > dist[u]+1){
				dist[v] = dist[u]+1;
				pai[v] = u; // pai de v é u.
				q.push(v);
			}
        }
    }
}

// função para recuperar o caminho de s a t.
vector<int> rec_path(int t) {
	vector<int> path;
	while(t != -1) {
		path.push_back(t);
		t = pai[t];
	}
	reverse(path.begin(), path.end());

	return path;
}
```

## Problemas recomendados
- <a href="https://cses.fi/problemset/task/1667" target="_blank">CSES - Message Route</a>
- <a href="https://cses.fi/problemset/task/1192" target="_blank">CSES - Counting Rooms</a>
- <a href="https://cses.fi/problemset/task/1193" target="_blank">CSES - Labyrinth</a>
- <a href="https://cses.fi/problemset/task/1194" target="_blank">CSES - Monsters</a>
- <a href="https://atcoder.jp/contests/abc405/tasks/abc405_d" target="_blank">Atcoder - Escape Route</a>
- <a href="https://codeforces.com/contest/520/problem/B" target="_blank">Codeforces - Two Buttons</a>
- <a href="https://codeforces.com/contest/2116/problem/C" target="_blank">Codeforces - Gellyfish and Flaming Peony</a>
- <a href="https://codeforces.com/contest/2114/problem/F" target="_blank">Codeforces - Small Operations</a>
- <a href="https://codeforces.com/contest/1873/problem/H" target="_blank">Codeforces - Mad City</a>
- <a href="https://cses.fi/problemset/task/1707" target="_blank">CSES - Graph Girth</a>