# Complexidade de Algoritmos

## Aula Relacionada recomendada:

## Motivação
Pense no seguinte problema

> Dado um array de \(n\) inteiros, encontre a maior soma dos valores em um subarray continuo e não vazio.

> [CSES - Maximum Subarray Sum](https://cses.fi/problemset/task/1643)

!!! note "Nota"
    Tente resolver o problema antes de continuar a leitura.

A eficiencia de algoritmos é muito importante em competições de programação. Normalmente é mais facil elaborar uma solução lenta que resolve o problema, e o real desafio se torna otimizar essa solução. Se sua solução é muita lenta, voce conseguira pouca pontuação, ou nenhuma pontuação no geral.

## Cálculo de Complexidade
Nos desejamos calcular quantas operações leva para rodar um algoritmo, em termos do tamanho do input \( n\). Isso pode ser feito usando a [Notação Big O](https://en.wikipedia.org/wiki/Big_O_notation), que expressa o pior caso de complexidade de tempo como uma função de n quando n tende ao infinito. A complexidade é um limite superior para o número de etapas que um algoritmo requer em função do tamanho da entrada. Na notação Big O, denotamos a complexidade de uma função como \( O(f(n))\), onde fatores constantes e termos de ordem inferior são geralmente omitidos de \( f(n)\). Veremos alguns exemplos de como isso funciona a seguir.

## Exemplos:
### Operações constantes

O código a seguir é \(O(1)\), por que executa um número constante de operações.

```cpp linenums="1"
int a;
cin >> a;
int b = 45;
int c = a + b;
cout << c << '\n';
```
Podemos assumir que operações de input e output também são \(O(1)\).

### Loops
Uma razão comum para seu algoritmo seja lento é uma quantidade muito grande loops que rodam pelo input. Quanto mais loops aninhados seu algoritmo conter, mais lento ele será. Se existem \(k\) loops aninhados, a complexidade de tempo será \(O(n^k)\).

O código a seguir possui complexidade \(O(n)\)

```cpp linenums="1"
for (int i = 1; i <= n; i++) {
  // operações constantes
}
```

Como estamos ignorando fatores de ordem menor o código a seguir também é \(O(n)\)

```cpp linenums="1"
for (int i = 1; i <= n + 4356; i++) {
  // operações constantes
}
```

Para sabermos a complexidade de loops aninhados podemos multiplicar a complexidade de cada loop.

```cpp linenums="1"
for (int i = 1; i <= n; i++) { // O(n)
  for (int j = 1; j <= m; j++) { // O(m)
    // operações constantes
  }
}
```
Complexidade: \(O(n \cdot m)\)


```cpp linenums="1"
for (int i = 1; i <= n; i++) { // O(n)
  for (int j = 1; j <= n; j++) { // O(n)
    // operações constantes
  }
}
```
Complexidade: \(O(n^2)\)

Se um algoritmo possui multiplos blocos, consideramos a complexidade como a pior complexidade entre todos os blocos.

```cpp linenums="1"
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= n; j++) {
    // operações constantes
  }
}

for (int i = 1; i <= n; i++) {
  // operações constantes
}
```
Complexidade: \(O(n^2)\)


```cpp linenums="1"
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= n; j++) {
    // operações constantes
  }
}

for (int i = 1; i <= m; i++) {
  // operações constantes
}
```
Complexidade: \(O(n^2 + m)\), o primeiro bloco tem complexidade \(O(n^2)\) o segundo possui complexidade \(O(m)\), e nenhuma delas é uma função de ordem inferior em relação à outra.

### Recursão
A complexidade de uma função recursiva depende do número de vezes que a função é chamada e a complexidade de cada chamada. A complexidade será o produto desses valores.

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
A chamada `f(1, n)` causa \(n\) chamadas da função, cada chamada tem complexidade \(O(1)\). Portanto a complexidade final é \(O(n)\)

Já nessa seguinte função:
```cpp linenums="1"
int g(int val, int limite) {
  if (val == limite) return;
  g(val + 1, limite);
  g(val + 1, limite);
}

int main() {
  int n;
  cin >> n;
  g(1, n);
}
```
Nesse caso cada chamada da função ``g`` gera duas novas chamadas, com excessão de o valor chegar ao limite.
A tabela da quantidade de chamadas pode ser vizualizada a seguir:

| Chamada da função     | Número de chamadas                          |
| ----------- | ------------------------------------ |
| `g(val, n)`       | 1  |
| `g(val + 1, n)`   | 2 |
| `g(val + 2, n)`   | 4 |
| `...`             |...|
| `g(limite, n)`| \(2^{n-1}\) |

Baseado nisso a complexidade será:

$$ 1 + 2 + 4 + ... + 2^{n - 1} = 2^n-1 = O(2^n). $$

Complexidades e restrições comuns:

- Fórmulas matemáticas que apenas calculam uma resposta: \(O(n)\)
- Busca binária: \(O(\log n)\)
- Set/map ou priority queue: \(O(\log n)\) por operação
- Fatoração prima ou verificação de número primo: \(O\sqrt{n}\)
- Lendo \(n \) itens do input: \(O(n)\) 
- Iterar por um array ou lista de \(n \) elementos: \(O(n)\)
- Sorting: Geralmente implementado em \(O(n \cdot \log n)\) em sorts da linguagem.
- Iterar por todos os subconjuntos de tamanho k de uma lista: \(O(n^k)\)
- Iterar por todos os subconjuntos: \(O(2^n)\)
- Iterar por todas as permutações: \(O(n!)\)

Aqui estão limites superiores conservadores para o valor de \(n\) para cada complexidade de tempo.
Você pode se safar com mais do que isso, mas isso deve permitir que você verifique rapidamente se um algoritmo é viável.


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

### Maximum Subarray Sum
Uma maneira simples de resolver o problema é percorrer todos os subarrays possíveis, calcular a soma dos valores em cada subarray e manter a soma máxima.

O código a seguir implementa este algoritmo:
```cpp title="CSES1643.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
}
```