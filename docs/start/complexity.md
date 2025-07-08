# Complexidade de Algoritmos

## Aula relacionada recomendada

<figure markdown="span" class="left-caption">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/cu3kKbkEZSw?si=Y2Nol4FFzANIDpyo&amp;start=877" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Cŕeditos: Canal Maratona UFMG.</figcaption>
</figure>


## Motivação {#motivacao}
Pense no seguinte problema

>  <a href="https://cses.fi/problemset/task/1643" target="_blank">CSES - Maximum Subarray Sum</a>

> Dado um array de \(n\) inteiros, sua tarefa é encontrar a soma máxima dos valores em um subarray contíguo e não vazio.

!!! note "Nota"
    Tente resolver o problema antes de continuar a leitura.

Em competições de programação, a eficiência dos algoritmos é crucial, uma vez que os programas tem que ser executados em um tempo limite. Embora seja geralmente mais simples conceber uma solução que resolva o problema, o verdadeiro desafio reside em otimizá-la. Uma solução lenta resultará em pouca ou nenhuma pontuação.

## Análise de Complexidade
Para analisar o tempo que um programa demora para executar, vamos determinar o número de operações que um algoritmo executa em relação ao tamanho da entrada, \(n\). Para isso, utilizamos a <a href = "https://en.wikipedia.org/wiki/Big_O_notation" target = "_blank"> Notação Big O</a>, que descreve o pior caso da complexidade de tempo. O que fazemos é estabeler um limite superior, um máximo, para o número de operações que um programa executa.

Quando expressamos a complexidade de uma função como \(\mathcal{O}(f(n))\), geralmente omitimos fatores constantes e termos de ordem inferior de \(f(n)\). Veremos alguns exemplos práticos de como isso funciona a seguir.
Quando expressamos a complexidade de uma função como \(O(f(n))\), geralmente omitimos fatores constantes e termos de ordem inferior de \(f(n)\). Veremos alguns exemplos práticos de como isso funciona a seguir. Explicaremos o que queremos dizer com constantes e termos de ordem inferior com mais detalhes depois.

## Exemplos:
### Operações constantes

O código a seguir é \(\mathcal{O}(1)\), pois executa um número constante de operações.

```cpp linenums="1"
int a;
cin >> a;
int b = 45;
int c = a + b;
cout << c << '\n';
```
Podemos assumir que operações de entrada (input) e saída (output) também são \(\mathcal{O}(1)\).

### Loops
A complexidade de um loop é o número de iterações do loop, o código a seguir, por exemplo, tem complexidade \(\mathcal{O}(n)\).

```cpp linenums="1"
// O(n)
for (int i = 1; i <= n; i++) {
  // operações constantes
}
```

Como ignoramos constantes e fatores de ordem menor, o código abaixo também é \(\mathcal{O}(n)\).

```cpp linenums="1"
// O(n)
for (int i = 1; i <= 3*n + 4356; i++) {
  // operações constantes
}
```
Para determinar a complexidade de loops aninhados, podemos multiplicar a complexidade de cada loop, o loop a seguir tem complexidade \(O(n \cdot m)\).

```cpp linenums="1"
// O(n*m)
for (int i = 1; i <= n; i++) { // O(n)
  for (int j = 1; j <= m; j++) { // O(m)
    // operações constantes
  }
}
```
O código a seguir tem complexidade \(\mathcal{O}(n^2)\).
```cpp linenums="1"
// O(n*n)
for (int i = 1; i <= n; i++) { // O(n)
  for (int j = 1; j <= n; j++) { // O(n)
    // operações constantes
  }
}
```
!!! note "Observação"
    Um programa com \(k\) loops aninhados vai ter complexidade \(\mathcal{O}(n^k)\).

Se um algoritmo possui múltiplos blocos de código, consideramos a complexidade como a pior complexidade entre todos os blocos para a notação Big O. No código a seguir, temos um trecho que executa \(n^2\) iterações e outro que executa \(n\), para um \(n\) muito grande a contribuição de \(n^2\) será muito maior que a contribuição de \(n\) para o número total de iterações do programa (\(n\) tem ordem inferior a \(n^2\)). Assim, descartamos a contribuição de \(n\) para o cálculo da complexidade, o código a seguir tem complexidade \(O(n^2)\).

```cpp linenums="1"
// O(n^2)
for (int i = 1; i <= n; i++) {// O(n)
  for (int j = 1; j <= n; j++) { // O(n)
    // operações constantes
  }
}

// O(n)
for (int i = 1; i <= n; i++) {
  // operações constantes
}
```
!!! note "Analogia"
    Imagine um toboágua com uma fila enorme, o tempo que demoramos na fila é muito maior que o tempo que demoramos para descê-lo. Assim, podemos considerar que o tempo para usar o toboágua é o tempo que demoramos na fila, ignorando o tempo de descida. Isso é a mesma coisa que fazemos na notação Big O.

No exemplo a seguir, a complexidade é \(O(n^2 + m)\). Diferente do exemplo anterior o segundo loop depende de outro fator da entrada \(m\), esse fator não tem nenhuma relação com \(n\), assim não podemos descartá-lo como no outro código. Pois, possivelmente, a influência de \(m\) pode ser maior que a influência de \(n^2\) e vice-versa.

```cpp linenums="1"
// O(n^2)
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= n; j++) {
    // operações constantes
  }
}

// O(m)
for (int i = 1; i <= m; i++) {
  // operações constantes
}
```

Para terminar a seção de loops, vamos estimar a complexidade do seguinte código. 
```cpp linenums="1"
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= i; j++) { 
    // operações constantes
  }
}
```
Nesse exemplo, a quantidade de iterações do loop interno vai depender do valor de \(i\), assim:

| Loop externo  | Loop interno                            |
| ----------- | ------------------------------------ |
| \(i = 1\)    |  1 iteração. |
| \(i = 2\)    | 2 iterações. |
| \(i = 3\)       |  3 iterações. |
| \(\dots\)     |  \(\dots\) |
| \(i = n\)     |  \(n\) iterações. |


Assim vamos ter \(1 + 2 + 3 + \dots + n\) iterações, ou seja, a soma de uma <a href = "https://pt.wikipedia.org/wiki/Progress%C3%A3o_aritm%C3%A9tica" target = "_blank">progressão aritmética</a>, então teremos \(\dfrac{n*(1+n)}{2} = \dfrac{n^2 + n}{2} = \dfrac{1}{2}n^2 + \dfrac{1}{2}n\) iterações. Podemos ignorar as constantes, \(n^2 + n\), além disso temos que \(n\) tem menos influência (menor ordem) que \(n^2\), então podemos ignorá-lo na notação Big O. Desse modo, a complexidade é \(\mathcal{O}(n^2)\).

### Recursão
A complexidade de uma função recursiva é determinada pelo número de vezes que a função é chamada multiplicado pela complexidade de cada chamada.

Considere a seguinte função:
```cpp linenums="1"
void f(int val, int limite) {
  if (val == limite) return;
  f(val + 1, limite);
}

int main() {
  int n;
  cin >> n;
  f(1, n);
}
```
A chamada `f(1, n)` resulta em \(n\) chamadas da função, e cada uma delas tem complexidade \(\mathcal{O}(1)\). Sendo assim, a complexidade total é \(\mathcal{O}(n)\).

Agora, vejamos a próxima função:
```cpp linenums="1" title="fibonacci.cpp"
int fib(int n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  return fib(n - 1) + fib(n - 2);  
}

int main() {
  int n;
  cin >> n;
  fib(n);
}
```
Nesse caso, cada chamada da função ``fib(n)`` gera duas novas chamadas recursivas: ``fib(n - 1)`` e ``fib(n - 2)``, exceto quando atinge os casos base, que são retornados diretamente sem gerar novas chamadas.

A árvore abaixo representa visualmente essa estrutura de chamadas para ``fib(5)``

<figure markdown="span" class="graphs"> 
    ![Exemplo de Fibonnaci](../assets/graphs/fibonacci.png)
</figure>

Observe que:

- A árvore cresce para a esquerda e para a direita a cada chamada, como uma árvore binária.

- Muitos valores são recalculados diversas vezes. Por exemplo, ``fib(2)`` é chamado 3 vezes, ``fib(1)`` aparece 5 vezes.

Analisando a árvore de cima para baixo, podemos estimar o total de chamadas considerando a quantidade de nós (bolinhas) para cada nível. O primeiro nível tem \(1\) nó,
no próximo teremos o dobro (\(2\) nós), depois teremos o dobro do dobro (\(4\) nós) e os próximos níveis também terão (uma estimativa próxima) o dobro de nós do nível anterior.

$$ 1 + 2 + 4 + \dots + 2^{n - 1} = 2^n-1 = \mathcal{O}(2^n). $$

> A soma acima é a soma de uma <a href = "https://pt.wikipedia.org/wiki/Progress%C3%A3o_geom%C3%A9trica" target = "_blank">progressão geométrica</a> e o desenvolvimento da fórmula de sua soma resultará em \(2^n-1\).

Ou seja, a complexidade de tempo da versão recursiva de Fibonacci é exponencial.

### Complexidades Comuns

- Fórmulas matemáticas que apenas calculam uma resposta:   \(\mathcal{O}(1)\)
- Busca binária: \(\mathcal{O}(\log_2 (n))\)
- Operações em ``Set``/``Map`` ou ``Priority Queue``: \(\mathcal{O}(\log_2 (n))\) por operação
- Ordenação (Sorting): Geralmente implementado em \(\mathcal{O}(n \log_2 (n))\) nas funções de ordenação padrão das linguagens. Em C++, a complexidade é essa.
- Iterar por todos os subconjuntos de um conjunto de tamanho \(n\): \(\mathcal{O}(2^n)\)
- Iterar por todas as permutações de tamanho \(n\): \(\mathcal{O}(n!)\)

## Fator constante

Fator constante vai se referir a ideia de que diferentes códigos com uma mesma complexidade Big O podem ter tempos de execução distintos entre si. Um exemplo é um código que tem um loop e dentro do loop temos 10 `if`'s e outro código com o mesmo loop, mas com um só `if`. Os dois códigos tem mesma complexidade, porém o primeiro código vai ser mais lento (a diferença não vai ser grande, mas ela vai existir).

Esse fator constante pode muitas vezes ser ignorado, pois ele não costuma ser relevante e ignorá-los nos ajudam a calcular a complexidade de um código. Mas é bom ter em mente que as constantes pode tornar o seu código mais lento e que as vezes é necessário otimizar o seu código a fim de diminuir esses fatores constantes. Um exemplo é tentar diminuir o número de operações que você faz, ou fazer operações mais rápidas (a operação de multiplicação é mais custosa para a CPU que a soma por exemplo).

## Complexidade e tempo de execução

Uma estimativa conservadora para o número de operações que um computador consegue realizar por segundo é de \(10^8\), mas normalmente podemos considerar \(4 \cdot 10^8\). A seguir uma tabela que dado um \(n\), mostra possíveis complexidades para um algoritmo.


| \(n\)                      | Complexidades possíveis          |
| :----------------------: | :--------------------------------: |
| \(n \leq 10\)          | \(O(n!), O(n^7), O(n^6)\)        |
| \(n \leq 20\)          | \(O(2^nn), O(n^5)\)              |
| \(n \leq 80\)          | \(O(n^4)\)                       |
| \(n \leq 400\)         | \(O(n^3)\)                       |
| \(n \leq 7500\)        | \(O(n^2)\)                       |
| \(n \leq 7 \cdot 10^4\)| \(O(n \sqrt n)\)                 |
| \(n \leq 5 \cdot 10^5\)| \(O(n \log n)\)                  |
| \(n \leq 5 \cdot 10^6\)| \(O(n)\)                         |
| \(n \leq 10^{18}\)     | \(O(\log^2 n), O(\log n), O(1)\) |


## Solução do <a href ="#motivacao">problema motivador</a> (Maximum Subarray Sum) 
### 1ª Solução
Uma maneira direta de resolver o problema é iterar sobre todos os subarrays possíveis, calcular a soma de cada um e registrar a maior soma encontrada.

O código a seguir implementa essa abordagem:
```cpp linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> a(n);
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  long long ans = 0;
  for (int l = 0; l < n; l++) {
    for (int r = 0; r < n; r++) {
      long long sum = 0;
      for (int k = l; k <= r; k++) {
        sum += a[k];
      }
      ans = max(ans, sum);
    }
  }
  cout << ans << '\n';
}
```

A complexidade dessa solução é \(\mathcal{O}(n^3)\). Como \(n\) pode ser da ordem de \(2 \cdot 10^5\), essa abordagem se torna inviável para a maioria dos casos.

### 2ª Solução

Para otimizar a complexidade, podemos usar o seguinte raciocínio: vamos nos concentrar em encontrar o subarray de maior soma que termina na posição \(k\). Existem duas possibilidades para esse subarray:

1. Ele contém apenas o elemento na posição \(k\).

2. Ele é formado pelo subarray de maior soma que termina na posição \(k−1\), seguido pelo elemento na posição \(k\).

Considerando que estamos buscando a soma máxima global, o subarray que termina na posição \(k−1\) também deve ter a maior soma possível para que a soma total seja máxima. Com essa ideia, podemos resolver o problema eficientemente, calculando a soma máxima do subarray que termina em cada posição, da esquerda para a direita.

O código a seguir implementa essa abordagem:

```cpp linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> a(n);
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  long long ans = 0, sum = 0;
  for (int k = 0; k < n; k++) {
    sum = max(a[k], sum + a[k]);
    ans = max(ans, sum);
  }
  cout << ans << '\n';
}
```
Este algoritmo possui apenas um loop que itera sobre a entrada, resultando em uma complexidade final de \(O(n)\). Essa abordagem é conhecida como
<a href="https://en.wikipedia.org/wiki/Maximum_subarray_problem" target="_blank">Algoritmo de Kadane</a>.