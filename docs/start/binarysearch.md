# Busca Binária

## Aula Relacionada Recomendada:

<figure markdown="span" class="left-caption">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/s9W9zJrcrzY?si=XCASUjVSUhgB-4PC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Cŕeditos: Canal Maratona UFMG.</figcaption>
</figure>

## Motivação
Pense no seguinte problema

> Uma fábrica possui \(n \) máquinas que podem ser utilizadas para fabricar produtos. Seu objetivo é produzir um total de \(t \) produtos.

> Para cada máquina, você sabe quantos segundos ela leva para fabricar um único produto.
As máquinas podem trabalhar simultaneamente, e você pode definir livremente o cronograma de produção.
Qual é o menor tempo necessário para produzir \(t \) produtos?

> [CSES - Factory Machines](https://cses.fi/problemset/task/1620)

!!! note "Nota"
    Tente resolver o problema antes de continuar a leitura.


## Introdução

O conceito de busca binária surge quando buscamos encontrar valores em um determinado conjunto de forma rápida e eficiente.

Suponha que queiramos encontrar um elemento em um determinado array.
Uma abordagem genérica consiste em usar um laço `#!cpp for` e percorrer todos os seus elementos.

Uma possível implementação dessa busca é a seguinte:


```cpp title="search.cpp" linenums="1"
for (int i = 0; i < N; i++) {
  if (array[i] == x) {
    // elemento x encontrado no indice i;
    cout << "ELEMENTO ENCONTRADO!\n";
    break;
  }
}
```
Essa abordagem, por sua vez, tem complexidade \(\mathcal{O}(N) \) no pior caso. Agora, suponha que desejemos realizar \(Q \) consultas de elementos. Nesse cenário, a complexidade torna-se \(\mathcal{O}(NQ) \), o que é inviável quando \(N \) e \(Q \) são da ordem de \(10^5 \).

No entanto, há uma propriedade interessante: se os elementos do vetor estiverem ordenados, cada busca pode ser feita em \(\mathcal{O}(\log_2(N)) \).

Na busca binária, escolhemos o elemento do meio do intervalo e, a cada iteração, decidimos se o próximo intervalo de busca ficará à direita ou à esquerda desse ponto, com base no valor do elemento que buscamos.

A ideia pode ser vizualizada a seguir:

<div class="slider-wrapper">
  <!-- área de slides -->
  <div class="slides-container">
    <div class="image-sliderfade fade">
      <img src="../../assets/16x9.png" />
      <div class="caption">Legenda 1</div>
    </div>
  </div>

  <!-- índice no canto -->
  <div class="slide-index">1/1</div>

  <!-- barra de controles fixa embaixo -->
  <div class="controls-bar">
    <button class="ctrl prev" onclick="plusSlides(-1)">❮</button>
    
    <button class="ctrl next" onclick="plusSlides(1)">❯</button>
  </div>
</div>
<br>


A ideia apresentada anteriormente pode ser implementada da seguinte maneira:

```c++ title="binarysearch.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
  // n: número de elementos do vetor
  // q: número de consultas realizadas
  int n, q;
  cin >> n >> q;
  vector<int> a(n);
  for (int i = 0; i < n; i++) cin >> a[i]; // O(n)

  // ordenamos o vetor para que seja possível aplicar a búsca binária
  sort(a.begin(), a.end()); // O(n log n)

  while(q--) {
    // para cada consulta, buscamos o elemento x
    int x; cin >> x;

    // inicialmente nosso espaço de busca é todo o array.
    // iniciamos find com false para que possamos identifcar facilmente  
    // o caso em que o elemento não existe no array.
    int left = 0, right = n - 1;
    bool find = false;
    while (left <= right) {
      int mid = (left + right) / 2;

      if (a[mid] == x) {
        find = true;
        break;
      } else if (a[mid] < x) left = mid + 1;
      else right = mid - 1;
    }
    cout << (find ? "SIM\n" : "NAO\n");
  } // O(q log n)

  return 0;
}
```
Complexidade final: \(\mathcal{O}(N\cdot \log_2 (N)) \)

### Provando a complexidade

## Busca Binária em Funções monótonas

Para além da simples busca de elementos, a técnica de busca binária pode ser aplicada na resolução de problemas de minimização e maximização.

Considere uma função booleana \(f(x) \). Em problemas desse tipo, queremos determinar o menor (ou maior) valor de \(x \) para o qual \(f(x) \) retorna verdadeiro. Para que isso seja possível de forma eficiente, é fundamental que \(f \) seja [monótona](https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_mon%C3%B3tona). Sob essa condição, todos os pontos em que \(f(x) = true \) aparecem agrupados em um único intervalo contíguo.

Ou seja: 

Para funções **crescente**, existe um ponto de corte \(x'\) tal que

$$
  f(x) =
  \begin{cases}
  \mathtt{false}, & x < x',\\
  \mathtt{true},  & x \ge x'.
  \end{cases}
$$

Para funções **decrescente**, o padrão é análogo, mas com os valores invertidos:

$$
  f(x) =
  \begin{cases}
  \mathtt{true},  & x < x',\\
  \mathtt{false}, & x \ge x'.
  \end{cases}
$$

Podemos usar essa propriedade para resolver o problema motivador.

### Solução:

O objetivo é descobrir o **menor tempo** necessário para produzir uma quantidade \(t\) de produtos.  
Podemos converter isso em um **problema de minimização** definindo uma função booleana

$$
  f(X, t) = 
  \begin{cases}
  \mathtt{true}, & \text X\text{ segundos é suficiente produzir pelo menos }t\text{ produtos}.\\
  \mathtt{false}, & \text{caso contrário}.
  \end{cases}
$$

Para verificar se \(X\) segundos são suficientes, note que cada máquina \(i\) produz \(\lfloor X / a_i\rfloor\) produtos em \(X\) segundos (onde \(a_i\) é o tempo que a máquina \(i\) leva para fabricar um único produto).  
Logo, o total produzido por \(n\) máquinas é

$$
  \sum_{i=1}^n \Big\lfloor \frac{X}{a_i}\Big\rfloor.
$$

## Monotonicidade

Para aplicar **busca binária**, é fundamental que \(f(X,t)\) seja **monótona**:

1. Se \(f(x,t)=\mathtt{true}\), então \(f(y,t)=\mathtt{true}\) para todo \(y \ge x\).  
2. Se \(f(x,t)=\mathtt{false}\), então \(f(y,t)=\mathtt{false}\) para todo \(y \le x\).

Isso garante que existe um **ponto de corte** \(X'\) tal que

$$
  f(X,t)=
  \begin{cases}
  \mathtt{false}, & X < X',\\
  \mathtt{true},  & X \ge X',
  \end{cases}
$$

e podemos encontrá‑lo eficientemente por busca binária.

### Exemplo

Caso de teste:
```cpp
3 7
3 2 5
// 3 máquinas, queremos produzir 7 produtos.
// Tempos: a = [3, 2, 5]
```

Ao atribuir valores de $1$ a $10$ à função $f(X, t)$, observamos o seguinte comportamento:

``` c++ linenums="1"
f(1, 7) = false
f(2, 7) = false
f(3, 7) = false
f(4, 7) = false
f(5, 7) = false
f(6, 7) = false
f(7, 7) = false
f(8, 7) = true
f(9, 7) = true
f(10, 7) = true
```
O ponto de corte é $X' = 8$.

O interessante é que podemos determinar o valor ótimo a partir de uma estimativa inicial, usando busca binária.

#### Algoritmo por busca binária

Suponha que sabemos que a resposta está em \([L, R]\). Então:

1. Calcule \( 
  mid = \left\lfloor \frac{L + R}{2} \right\rfloor. 
\)

2. Avalie \(f(mid, t)\):  

      - Se \(\mathtt{true}\), então toda solução \(\ge mid\) também é verdadeira \(\Rightarrow \) atualize \(R \leftarrow mid. \)
   
      - Se \(\mathtt{false}\), então toda solução \(\le mid\) também é falsa \(\Rightarrow \) atualize  \(L \leftarrow mid + 1. \)

3. Repita até \(L = R\). Esse valor é o \(X'\) ótimo.

#### Simulação da busca binária (caso dado no exemplo):

A seguir, a tabela que mostra cada iteração com \(L\), \(R\),  
\(mid = \big\lfloor (L+R)/2\big\rfloor\), o valor de \(f(mid,7)\) e a ação tomada:

| Iteração | \(L\) | \(R\) | \(mid = \lfloor (L+R)/2\rfloor\) | \(f(mid,7)\) | Ação           |
|:--------:|:-----:|:-----:|:------------------------------:|:----------:|:--------------:|
| 1        | 0     | 20    | 10                             | true       | \(R \leftarrow 10\) |
| 2        | 0     | 10    | 5                              | false      | \(L \leftarrow 6\)  |
| 3        | 6     | 10    | 8                              | true       | \(R \leftarrow 8\)  |
| 4        | 6     | 8     | 7                              | false      | \(L \leftarrow 8\)  |
| 5        | 8     | 8     | 8                              | true       | Fim: \(X' = 8\)    |


Para aplicar essa abordagem, podemos considerar um limite superior maior para o intervalo, por exemplo \( [0,\,10^{18}] \), e implementar o algoritmo da seguinte forma:

```cpp title="factorymachines.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;
 
int n, t;
vector<int> a;

/**
  * Verifica se m segundos é suficiente para produzir
  * pelo menos t produtos
  * @param m quantidade de segundos
  * @return true caso a quantidade m de segundos seja suficiente para 
  * produzir t produtos, false caso contrário.
*/
bool check(long long m) {
  long long sum = 0, qtd = 0;
  for (int i = 0; i < n; i++) {
    sum += (m / a[i]);
    // evita overflow da variável sum
    if (sum >= t) return true;
  }
  return sum >= t;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
 
  int t = 1;
  // cin >> t;
  while(t--) {
    cin >> n >> t;
    a.resize(n);
  
    for (int i = 0; i < n; i++) cin >> a[i];
    // Intervalo inicial de tempo [0, 1e18] 
    long long l = 0, r = (long long)1e18+10, ans;
    while (l <= r) {
      long long m = (l + r) / 2;
  
      if (check(m)) {
        // se check retorna true, essa quantidade de tempo é suficiente, 
        // salvamos ela na resposta e olhamos para o intervalo [l, m - 1]
        // em busca de um valor menor
        ans = m;
        r = m - 1;
      } else l = m + 1;
        // se check retorna false, precisamos de uma quantidade maior de tempo, 
        // olhamos pro intervalo [m + 1, r]
    }
    cout << ans << '\n';
  }
  return 0;
}
```

## Implementações do C++
O C++ possui algumas implementações de busca binária que são uteis em muitos problemas: 
#### lower_bound
Dado um vetor ordenado, retorna um ponteiro para primeira posição maior ou igual a um valor \(X \) procurado.

Complexidade: \( \mathcal{O}(\log_2(N))\)

Sintaxe:
```
lower_bound(first, last, val)
```
Parametros:

  - first: Ponteiro pro primeiro elemento do range
  - last: Ponteiro pro último elemento do range
  - val: Valor a ser comparado.

#### Exemplo:
```cpp title="lower_bound.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
  vector<int> a = {10, 20, 30, 30, 40, 45, 50};

  // encontrando o lower bound de 35 no vetor
  cout << *lower_boud(a.begin(), a.end(), 35) << '\n';
  // também conseguimos guardar a posição 
  // do lower_bound da seguinte forma
  int p = lower_bound(a.begin(), a.end(), 35) - a.begin();
  cout << p << '\n\';
}
```

#### upper_bound
Dado um vetor ordenado, retorna um ponteiro para primeira posição **estritamente** maior a um valor \(X \) procurado.

Complexidade: \( \mathcal{O}(\log_2(N))\)

Sintaxe:

```c++ 
lower_bound(first, last, val)
```

Parametros:
  
  - first: Ponteiro pro primeiro elemento do range
  - last: Ponteiro pro último elemento do range
  - val: Valor a ser comparado.

#### Exemplo:
```cpp title="upper_bound.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
  vector<int> a = {10, 20, 30, 30, 40, 45, 50};

  // encontrando o upper bound de 35 no vetor
  cout << *upper_boud(a.begin(), a.end(), 35) << '\n';
  // também conseguimos guardar a posição 
  // do upper_bound da seguinte forma
  int p = upper_bound(a.begin(), a.end(), 35) - a.begin();
  cout << p << '\n\';
}
```

Para mais detalhes sobre a implementação dessas funções:

 - [lower_bound](https://cplusplus.com/reference/algorithm/lower_bound/)
 - [upper_bound](https://cplusplus.com/reference/algorithm/upper_bound/)