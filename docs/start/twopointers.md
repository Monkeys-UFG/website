# Two Pointers

## Problema motivador   

> Dado um vetor com $N$ elementos ($1 \le N \le 10^5$), com valores positivos no vetor ($1 \le a_i \le 10^9$), e dado um número alvo $x$, eu quero contar quantos subarrays existem tal que a soma do subarray é igual a $x$. Formalmente, eu quero contar pares $l,r$, onde $l \le r$, onde $\sum_{i=l}^{r} a_i = x$.

> <a href="https://cses.fi/problemset/task/1660" target="_blank">CSES - Subarray Sums I</a>

!!! note
    Um subarray (ou subvetor) é uma subsequência contígua de elementos de um vetor. Ou seja, é um trecho obtido apenas removendo elementos do início, do fim, ou de ambos lados do vetor original. Por exemplo, seja $A = [3, 5, 4, 1, 9, 7]$. Os vetores $[5, 4, 1], [9, 7], [4, 1, 9, 7]$ são subarrays válidos do vetor $A$. Porém, o vetor $[3, 4, 1, 9]$ não é um subarray válido do vetor $A$ (o número 5 estava no meio do vetor e foi omitido).


!!! note
    Tente resolver o problema antes de seguir no tópico.

A forma mais direta de se resolver esse problema é testar todos os subarrays possíveis. Uma forma de fazer isso é:

1. Fixamos um índice $l$, variando de 0 a $n-1$.
2. Para cada $l$, criamos um índice $r$ para andar de $l$ a $n-1$, acumulando os valores de $A$ em uma variável $sum$.
3. Se $sum == x$, então incrementamos a resposta em 1.
4. Se $sum > x$, podemos quebrar a iteração e ir para o próximo $l$. Podemos fazer isso pois os valores $a_i$ são positivos.

```cpp title="subarray_sums_I_lento.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, x;
    cin >> n >> x;
    vector<int> a(n);

    for(int i=0; i<n; i++) {
        cin >> a[i];
    }
    long long ans = 0;
    for(int l=0; l<n; l++){ // itere o l de 0 a n-1
        int sum = 0;
        for(int r=l; r<n; r++){ // itere o r de l a n-1
            sum += a[r];

            if(sum == x){
                ans++;
            }

            if(sum > x) {
                break;
            }
        }
    }

    cout << ans << "\n";

    return 0;
}
```

Pensando no pior caso, temos $10^5$ elementos em um vetor, com $x=10^9$ e os valores de $a$ são todos $1$. Iremos iterar sobre o loop interno um total de $n$ vezes, e o loop interno rodará $n-i$ vezes toda vez que o algoritmo entrar, resultado em uma complexidade $\mathcal{O}(n^2)$, o que resulta em $\approx 10^{10}$ operações, resultando em tempo limite excedido.

## Introdução

O método de Two Pointers consiste em usarmos dois índices, que chamamos de ponteiros, para andar sobre um vetor, satisfazendo certas propriedades. Podemos querer que esses dois ponteiros movam na mesma direção, um andando mais lento do que o outro, e podemos querer também que ambos ponteiros andem em direções opostas, terminando o algoritmo quando eles se encontram/cruzam. Para problemas como o acima, reduziremos a complexidade de $\mathcal{O}(n^2)$ para $\mathcal{O}(n)$ com essa técnica.

No problema apresentado, na solução força bruta fornecida, toda vez que passamos do índice $l$ para o $l+1$, descartávamos todo o trabalho feito até o momento, incrementando o $l$ e reiniciamos $r$ para ser o novo $l$, zerando a variável $sum$. Isso é bastante ineficiente. Quando já calculamos o intervalo $[l,r]$, para ir pro intervalo $[l+1,r]$, basta decrementar o valor de $a_l$ da nossa soma atual.

Essa é a técnica de Two Pointers. Podemos garantir duas propriedades importantes quando estamos fazendo essas operações:

1. Quando avançamos o ponteiro $r$, temos que a nossa soma atual aumenta.
2. Quando avançamos o ponteiro $l$, a nossa soma atual diminui.

Com isso, em vez de resetar o ponteiro $r$ toda vez que $l$ muda, avançamos ambos ponteiros pra frente apenas.

Assim, o nosso novo algoritmo fica:

1. Inicie $l=r=sum=0$.
2. Faça $sum = sum + a[r]$.
3. Enquanto $sum > x$, então faremos $sum = sum - a[l]$ e avançamos $l$ em $1$.
4. Se $sum == x$, achamos uma resposta. Incrementamos o valor da resposta em $1$.

## Código e Análise de Complexidade

```c++ title="two_pointers.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, x;
    cin >> n >> x;

    long long sum = 0;
    int ans = 0;

    int l = 0;
    for(int r = 0; r < n; r++) {
        sum += a[r];
        while(sum > x) {
            sum -= a[l];
            l++;
        }
        if(sum == x) {
            ans++;
        }
    }

    cout << ans << '\n';

    return 0;
}
```

Analisando a complexidade desse código, podemos ver que, apesar de ter um while aninhado. Podemos observar que, como o for controla o o ponteiro $r$ e o while controla o ponteiro $l$, e ambos só vão pra frente, então no máximo ambos vão fazer no máximo $n$ operações cada. Assim, temos que $n+n = 2n \in \mathcal{O}(n)$.

## Outros problemas

### Contar segmentos com valores distintos

Dado um vetor com $N$ elementos, queremos contar quantos subarrays existem tal que todos os elementos do subarray são distintos. $(1 \le N \le 2 \cdot 10^5, 1 \le a_i \le 10^9)$.

Podemos fazer uma solução parecida com a solução feita no problema motivador acima. Vamos manter um mapa de valores indicando quantos de cada valor eu já peguei. Devemos ter apenas um de cada valor no mapa para poder contar o segmento como válido. Vamos manter ponteiros $l,r$ iniciando no começo do vetor e vamos começar a andar o $r$.