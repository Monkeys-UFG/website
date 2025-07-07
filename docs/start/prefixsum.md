# Soma de prefixo

## Motivação
Pense no seguinte problema

> Dado um array de inteiros com \( n \) elementos, e \( q \) consultas do tipo \( [i, j] \), retorne a soma dos elementos do intervalo \( [i, j] \) do array.

> <a href="https://cses.fi/problemset/task/1646" target="_blank">CSES - Static Range Sum Queries</a>

!!! note
    Tente resolver o problema antes de continuar a leitura.

Uma abordagem consistiria em calcular a soma de cada intervalo individualmente. Para cada consulta \( [i, j] \), somaríamos diretamente os elementos \( a_i + a_{i+1} + \ldots + a_j \). A complexidade dessa abordagem é \( O(n) \) operações por consulta, resultando em uma complexidade total de \( O(nq) \) para \( q \) consultas. Considerando que tanto \( n \) quanto \( q \) podem ser da ordem de \( 10^5 \), essa abordagem é computacionalmente lenta.

## Introdução
Na abordagem acima possivelmente iremos realizar vários cálculos repetidamente, a ideia aqui é pré-processar o array \( a \) e armazenar as somas parciais em um novo array. Seja \( prefix \) esse array, iremos definir \( prefix[i] \) como a soma dos primeiros \( i \) elementos do array \( a \).

Assim, podemos calcular a soma de qualquer intervalo \( [i, j] \) em tempo constante \( O(1) \), coletando o valor da soma dos \( j \) primeiros elementos e subtraindo/removendo todos os elementos anteriores a \( i \), ou seja, os \( i - 1 \) primeiros elementos. Mostraremos que a complexidade de pré-processamento é \( O(n) \), resultando em uma complexidade total de \( O(n + q) \) para \( q \) consultas.

## Definição

Seja \( a \) um array de inteiros, o array \( prefix \) é definido como:

$$
prefix[i] = a_1 + a_2 + \ldots + a_{i-1} + a_i
$$

Ou seja:

$$
prefix[i] = prefix[i - 1] + a_i
$$

Dessa forma, podemos calcular a soma de qualquer intervalo \( [i, j] \) como:

$$
range(i, j) = prefix[j] - prefix[i - 1]
$$

Pois:

$$
range(i, j) = prefix[j] - prefix[i - 1]
$$

$$
= (a_1 + a_2 + \ldots + a_{j-1} + a_j) - (a_1 + a_2 + \ldots + a_{i-1})
$$

$$
= ((a_1 + a_2 + \ldots + a_{i-1}) + (a_i + a_{i+1} + \ldots + a_{j-1} + a_j)) - (a_1 + a_2 + \ldots + a_{i-1})
$$

$$
= (a_i + a_{i+1} + \ldots + a_{j-1} + a_j) + (a_1 + a_2 + \ldots + a_{i-1}) - (a_1 + a_2 + \ldots + a_{i-1})
$$

$$
= a_i + a_{i+1} + \ldots + a_{j-1} + a_j
$$

## Código
Esse código é um exemplo de como implementar a técnica de prefixo para a soma. Assim, podemos calcular o range de \( i \) até \( j \) como:

```cpp title="psum.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    vector<int> prefix(n + 1);

    // Para evitar o caso de indíce negativo em
    // prefix[i-1], indexaremos o array a partir de 1
    prefix[0] = 0;

    // O(n)
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        prefix[i] = prefix[i - 1] + x;
    }

    // O(q)
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << prefix[r] - prefix[l - 1] << '\n';
    }
}
```

## Outras estruturas algébricas
Imagine que para resolver certo problema, você precise realizar os cálculo de um range de um array utilizando uma operação que não seja a de soma, como o produto ou bitwise XOR. Nessa seção, vamos ver como podemos generalizar o conceito de soma de prefixo para outras operações e verificar se podemos ou não utilizar a técnica.

Para isso, a rigor matemático, é necessário que dado um conjunto \( G \) e uma operação \( \star \), \( (G, \star) \) seja um grupo.


#### Propriedades de um grupo
\( (G, \star) \) é um grupo se, e somente se, satisfaz as seguintes propriedades:

##### Fechamento
Operar quaisquer dois elementos de \( G \) com \( \star \) deve resultar em um elemento de \( G \)

$$
\forall x, y \in G, x \star y \in G
$$

##### Associatividade

A operação \( \star \) deve ser associativa, ou seja, a ordem de aplicação da operação entre quaisquer três elementos não importa

$$
\forall x, y, z \in G, (x \star y) \star z = x \star (y \star z)
$$

##### Elemento neutro
Deve existir um elemento \( e \) em \( G \), tal que, operar qualquer elemento \( x \) em \( G \) com \( e \) resulta em \( x \)

$$
\forall x \in G, \exists e \in G : x \star e = e \star x = x
$$

##### Inverso

Deve existir um elemento \( y \) em \( G \) para cada elemento \( x \) em \( G \), tal que, operar \( x \) com \( y \) resulta no elemento neutro \( e \)

$$
\forall x \in G, \exists y \in G : x \star y = y \star x = e
$$

Dessa forma, poderemos utilizar todo o conhecimento adquirido acima. Pois, seja:

$$
prefix[i] = a_1 \star a_2 \star \ldots \star a_{i-1} \star a_i
$$

Observe que \( prefix[i] \) pertence a \( G \) pela propriedade de fechamento. Dessa forma:

$$
prefix[i] = prefix[i-1] \star a_i
$$

Como \( prefix[i] \) pertence a \( G \), logo \( prefix[i] \) possui um elemento inverso, seja \( prefix[i]^{-1} \) esse elemento. Assim, podemos definir a operação de range como:

$$
range(i, j) = prefix[i-1]^{-1} \star prefix[j]
$$

Pois:

$$
range(i, j) = (a_1 \star a_2 \star \ldots \star a_{i-1})^{-1} \star (a_1 \star a_2 \star \ldots \star a_{j-1} \star a_j)
$$

$$
= (a_1 \star a_2 \star \ldots \star a_{i-1})^{-1} \star (a_1 \star a_2 \star \ldots \star a_{i-1}) \star (a_{i} \star a_{i+1} \star a_{i+2} \star \ldots \star a_j)
$$

$$
= ((a_1 \star a_2 \star \ldots \star a_{i-1})^{-1} \star (a_1 \star a_2 \star \ldots \star a_{i-1})) \star (a_{i} \star a_{i+1} \star a_{i+2} \star \ldots \star a_j)
$$

$$
= e \star (a_{i} \star a_{i+1} \star a_{i+2} \star \ldots \star a_j)
$$

$$
= a_{i} \star a_{i+1} \star a_{i+2} \star \ldots \star a_j
$$

!!! note
    - **Linha 2 e 3**: Associatividade
    - **Linha 4**: Inverso
    - **Linha 5**: Elemento neutro

### Exemplo da operação de range
Tome o array \( \{ a_1, a_2, a_3, a_4, a_5 \} \), tal que, \( a_1, a_2, a_3, a_4, a_5 \in G \) e \( (G, \star) \) é um grupo e deseja calcular o \( range(3, 5) \):

$$
range(3, 5) = prefix[2]^{-1} \star prefix[5]
$$

$$
= (a_1 \star a_2)^{-1} \star (a_1 \star a_2 \star a_3 \star a_4 \star a_5)
$$

$$
= (a_1 \star a_2)^{-1} \star (a_1 \star a_2) \star (a_3 \star a_4 \star a_5)
$$

$$
= ((a_1 \star a_2)^{-1} \star (a_1 \star a_2)) \star (a_3 \star a_4 \star a_5)
$$

$$
= e \star (a_3 \star a_4 \star a_5)
$$

$$
= a_3 \star a_4 \star a_5
$$

### Exemplo de grupos

##### Soma nos reais

\( ( \mathbb{R}, + ) \)

- **Elemento neutro**: \( 0 \)
- **Inverso**: Função de subtração

##### Multiplicação nos inteiros

\( ( \mathbb{Z}, * ) \)

- **Elemento neutro**: \( 1 \)
- **Inverso**: Função de divisão

##### Bitwise XOR nos inteiros

\( ( \mathbb{Z}, \oplus ) \)

- **Elemento neutro**: \( 0 \)
- **Inverso**: Função de bitwise XOR

## Código geral
Esse código é um exemplo de como implementar a técnica de prefixo para o produto. Para isso, utilizamos o inverso da multiplicação, que é a divisão. Assim, podemos calcular o range de \( i \) até \( j \) como:

```cpp title="solve.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

vector<double> prefix;

double neutro = 1.0;
// elemento neutro para soma seria:
// int neutro = 0;

double inverso(double x) {
    return 1.0 / x;
    // Inverso da soma seria:
    // return -x;
}

double operacao(double x, double y) {
    return x * y;
    // Operação de soma seria:
    // return x + y;
}

double range(int i, int j) {
    return operacao(inverso(prefix[i - 1]), prefix[j]);
}

int main() {
    int n, q;
    cin >> n >> q;
    prefix.resize(n + 1);
    prefix[0] = neutro;

    // O(n)
    for (int i = 1; i <= n; i++) {
        double x;
        cin >> x;
        prefix[i] = operacao(prefix[i - 1], x);
    }

    // O(q)
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << range(l, r) << endl;
    }
}
```

## Lista de exercícios
- <a href="https://cses.fi/problemset/task/1646" target="_blank">CSES - Static Range Sum Queries</a>
- <a href="https://cses.fi/problemset/task/1650" target="_blank">CSES - Range Xor Queries</a>