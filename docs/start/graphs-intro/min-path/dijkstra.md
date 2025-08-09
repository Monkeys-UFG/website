# Dijkstra

Dado um grafo com $N, M \le 2\cdot 10^5$, com $N$ sendo o número de vértices e $M$ o número de arestas do grafo. O peso das arestas é positivo ($\ge 0$), e o grafo pode ser direcionado ou não direcionado. Queremos calcular a menor distância de um vértice $s$ para todos os outros vértices do grafo. Esse problema também é chamado de **Single Source Shortest Path** (ou SSSP).

Abaixo temos um slideshow de como o algoritmo vai funcionar a cada iteração.

<div class="slider-wrapper">
  <!-- área de slides -->
  <div class="slides-container">
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra1.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra2.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra3.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra4.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra5.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra6.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra7.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra8.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra9.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra10.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra11.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra12.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra13.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra14.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra15.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra16.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra17.png" /></div>
    <div class="image-sliderfade fade"><img src="../../../../assets/graphs/algorithms/dijkstra/dijkstra18.png" /></div>
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

## Algoritmo

O algoritmo foi desenvolvido por Edsger Dijkstra, e ele funciona da seguinte forma:

Crie um vetor $d[]$, onde para cada vértice $u$, ele conterá a menor distância atual de um vértice $s$ até ele. No começo, $d[s]=0$, e todos os outros vértices serão inicializados com $\infty$. Para fins de implementação, podemos escolher um número grande o suficiente para representar o infinito, visto que esse numero grande não será alcançado no decorrer do algoritmo. Assim,

$$
  d[u]=\infty, u\ne s
$$

Usaremos uma **Fila de Prioridade (priority_queue) / set** para armazenar as distâncias. Se você não conhece nenhuma das duas estruturas, recomendamos que passe na sessão de 

## Problemas recomendados
- <a href="https://cses.fi/problemset/task/1671" target="_blank">CSES - Shortest Routes I</a>
- <a href="https://codeforces.com/problemset/problem/20/C" target="_blank">Codeforces - Dijkstra?</a>
- <a href="https://cses.fi/problemset/task/1195" target="_blank">CSES - Flight Discount</a>
- <a href="https://cses.fi/problemset/task/1196" target="_blank">CSES - Flight Routes</a>
- <a href="https://cses.fi/problemset/task/1202" target="_blank">CSES - Investigation</a> 
