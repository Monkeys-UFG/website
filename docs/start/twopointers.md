# Two Pointers

## Problema motivador   

> Dado um vetor com $N$ elementos ($1 \le N \le 2 \cdot 10^5$), com valores positivos no vetor ($1 \le a_i \le 10^9$), e dado um número alvo $x$, eu quero contar quantos subarrays existem tal que a soma do subarray é igual a $x$. Formalmente, eu quero contar pares $l,r$, com $l \le r$, onde $\sum_{i=l}^{r} a_i = x$.

> <a href="https://cses.fi/problemset/task/1660" target="_blank">CSES - Subarray Sums I</a>

!!! note
    Um subarray (ou subvetor) é uma subsequência contígua de elementos de um vetor. Ou seja, é um trecho obtido apenas removendo elementos do início, do fim, ou de ambos lados do vetor original. Por exemplo, seja $A = [3, 5, 4, 1, 9, 7]$. Os vetores $[5, 4, 1], [9, 7], [4, 1, 9, 7]$ são subarrays válidos do vetor $A$. Porém, o vetor $[3, 4, 1, 9]$ não é um subarray válido do vetor $A$ (o número 5 estava no meio do vetor e foi omitido).


!!! note
    Tente resolver o problema antes de seguir no tópico.

A forma mais direta de se resolver esse problema é testar todos os subarrays possíveis. Uma forma de fazer isso é:

1. Fixamos um índice $l$, variando de 0 a $n-1$.
2. Para cada $l$, criamos um índice $r$ para andar de $l$ a $n-1$, acumulando os valores de $A$ em uma variável $sum$.
3. Se $sum = x$, então incrementamos a resposta em 1.
4. Se $sum > x$, podemos quebrar a iteração e ir para o próximo $l$. Podemos fazer isso pois todos os valores $a_i$ são positivos, então continuar somando significa necessariamente aumentar o valor de $sum$.

```cpp title="subarray_sums_I_lento.cpp" linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, x;
    cin >> n >> x;
    vector<int> a(n);

    for (int i=0; i<n; i++) {
        cin >> a[i];
    }
    long long ans = 0;
    for (int l=0; l<n; l++){ // itere o l de 0 a n-1
        int sum = 0;
        for (int r=l; r<n; r++) { // itere o r de l a n-1
            sum += a[r];

            if (sum == x) {
                ans++;
            }

            if (sum > x) {
                break;
            }
        }
    }

    cout << ans << "\n";

    return 0;
}
```

Pensando no pior caso, temos $10^5$ elementos em um vetor, com $x=10^9$ e os valores de $a$ são todos $1$. Iremos iterar sobre o loop externo um total de $n$ vezes, e o loop interno rodará $n-i$ vezes toda vez que o algoritmo entrar, resultando em uma complexidade $\mathcal{O}(n^2)$, o que resulta em $\approx 10^{10}$ operações, resultando em <span style="color: red;">tempo limite excedido.</span>

## Introdução

O método de Two Pointers consiste em usarmos dois índices, que chamamos de ponteiros, para andar sobre um vetor, satisfazendo certas propriedades. Podemos querer que esses dois ponteiros movam na mesma direção, um andando mais lento do que o outro, e podemos querer também que ambos ponteiros andem em direções opostas, terminando o algoritmo quando eles se encontram/cruzam. Para problemas como o acima, reduziremos a complexidade de $\mathcal{O}(n^2)$ para $\mathcal{O}(n)$ com essa técnica.

No problema apresentado, na solução força bruta fornecida, toda vez que passamos do índice $l$ para o $l+1$, descartávamos todo o trabalho feito até o momento, incrementando o $l$ e reiniciamos $r$ para ser o novo $l$, zerando a variável $sum$. Isso é bastante ineficiente. Quando já calculamos o intervalo $[l,r]$, para ir pro intervalo $[l+1,r]$, basta decrementar o valor de $a_l$ da nossa soma atual.

Essa é a técnica de Two Pointers. Podemos garantir duas propriedades importantes quando estamos fazendo essas operações:

1. Quando avançamos o ponteiro $r$, temos que a nossa soma atual **aumenta**.
2. Quando avançamos o ponteiro $l$, a nossa soma atual **diminui**.

Com isso, em vez de resetar o ponteiro $r$ toda vez que $l$ muda, avançamos ambos ponteiros pra frente apenas.

Assim, o nosso novo algoritmo fica:

1. Inicie $l=r=sum=0$.
2. Faça $sum = sum + a[r]$.
3. Enquanto $sum > x$, então faremos $sum = sum - a[l]$ e avançamos $l$ em $1$.
4. Se $sum == x$, achamos uma resposta. Incrementamos o valor da resposta em $1$.

Essa forma de usar a técnica de Two Pointers as vezes é referida como **Sliding Window (Janela Deslizante)**.

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

Nessa parte do artigo, serão apresentados outros problemas que também podem ser resolvidos usando a técnica de Two Pointers.

### Contar segmentos com valores distintos

Dado um vetor com $N$ elementos, queremos contar quantos subarrays existem tal que todos os elementos do subarray são distintos.

Podemos fazer uma solução parecida com a solução feita no problema motivador acima. Vamos manter um mapa de frequência indicando a frequência de cada valor passado na janela no momento. Inicializaremos o mapa vazio e os ponteiros $l,r$ com $0$.

1. Avançamos o ponteiro $r$ e inserimos $a[r]$ no mapa.
2. Se a frequência de $a[r]$ se tornar maior do que $1$, significa que encontramos uma duplicata. Avançamos o ponteiro $l$ e removemos $a[l]$ do mapa até que a duplicata seja removida.
3. Quando a janela $[l,r]$ estiver válida (ou seja, sem elementos repetidos), isso significa que todos os subarrays que terminam em $r$ e começam entre $l$ e $r$ são válidos.

Portanto, a cada passo do ponteiro $r$, somamos $r-l+1$ a nossa resposta.

Vamos olhar para um exemplo prático. Seja $a = [1,2,1,3]$.

+ $r=0, l=0 \rightarrow [1]$ é válido. Adicionamos $0-0+1=1$ a nossa resposta. (subarrays válidos: $[1]$).
+ $r=1,l=0 \rightarrow [1,2]$ é válido. Adicionamos $1-0+1=2$ a resposta. (subarrays válidos: $[2], [1,2]$).
+ $r=2,l=0 \rightarrow [1,2,1]$ não é válido. Avançamos $l$ para $1$. Nova janela fica $[2,1]$, que é válido. Adicionamos $2-1+1=2$ a resposta. (subarrays válidos: $[1],[2,1]$).
+ $r=3,l=1 \rightarrow [2,1,3]$ é válido. Adicionamos $3-1+1=3$ a resposta. (subarrays válidos: $[3],[1,3],[2,1,3]$).

$R = 1+2+2+3 = 8$ subarrays válidos.

Complexidade final fica $\mathcal{O}(n \log n)$, onde $\log n$ vem dos acessos do mapa.

### Two Sum

Dado um vetor ordenado com $n$ elementos e um valor alvo $k$, quero saber se existem dois índices $i,j$ tal que $a[i] + a[j] = k$.

A ideia aqui é que, como o vetor está ordenado, podemos colocar um ponteiro no começo $(l)$ e um no final $(r)$. Com isso, podemos garantir que, quando avançamos o $l$, aumentamos o valor da soma dos dois valores e quando diminuímos o ponteiro $r$, a soma dos dois valores diminui. Assim, podemos fazer o seguinte:

+ Se $a[l]+a[r]=k$, achamos o valor!
+ Se $a[l]+a[r]<k$, então a soma é menor do que o desejado. Incrementamos $l$.
+ Se $a[l]+a[r]>k$, a soma é maior do que o desejado. Decrementamos $r$.

Isso funciona pois, a cada iteração, eliminamos com certeza um elemento do vetor (seja ele o menor ou o maior valor do vetor atualmente), reduzindo a busca sem precisar testar todas as $\mathcal{O}(n^2)$ combinações de pares.

## Dicas para identificar problemas

Podemos nos perguntar algumas coisas quando estamos tentando identificar se um problema pode ser resolvido usando a técnica de Two Pointers:

1. É **monótono**? Ou seja, expandir para a direita faz com que algo em uma variável apenas aumente? Expandir pra esquerda faz com que essa mesma variável apenas diminua?
2. O problema em questão envolve **coisas contínuas**? Como por exemplo, subarrays, substrings, achar pares em vetores ordenados.

Se a resposta for sim para ambas perguntas, quase certamente você pode usar Two Pointers para resolver esse problema.

## Lista de Exercícios

!!! tip "Dica"
    Problemas que envolvem Two Pointers podem precisar de outras técnicas, como Busca Binária ou Soma de Prefixo. Considere isso quando estiver resolvendo os problemas abaixo.

- <a href="https://cses.fi/problemset/task/1640" target="_blank">CSES - Sum of Two Values</a>
- <a href="https://cses.fi/problemset/task/3420" target="_blank">CSES - Distinct Values Subarrays</a>
- <a href="https://cses.fi/problemset/task/2428" target="_blank">CSES - Distinct Values Subarrays II</a>
- <a href="https://codeforces.com/contest/2000/problem/D" target="_blank">Codeforces - Right Left Wrong</a>
- <a href="https://codeforces.com/contest/702/problem/C" target="_blank">Codeforces - Cellular Network</a>
- <a href="https://cses.fi/problemset/task/1641" target="_blank">CSES - Sum of Three Values</a>
- <a href="https://codeforces.com/edu/course/2/lesson/9/2/practice/contest/307093/problem/F" target="_blank">Codeforces - Segment with Small Spread</a> (para acessar esse problema, entre na aba <a href="https://codeforces.com/edu/courses" target="_blank">Edu</a> na hotbar do Codeforces. Após isso, dê *enroll* em *ITMO Academy: pilot course*.)
- <a href="https://codeforces.com/edu/course/2/lesson/9/3/practice/contest/307094/problem/B" target="_blank">Codeforces - Total Length</a> (para acessar esse problema, entre na aba <a href="https://codeforces.com/edu/courses" target="_blank">Edu</a> na hotbar do Codeforces. Após isso, dê *enroll* em *ITMO Academy: pilot course*.)
- <a href="https://codeforces.com/edu/course/2/lesson/9/3/practice/contest/307094/problem/E" target="_blank">Codeforces - Knapsack on a Segment</a> (para acessar esse problema, entre na aba <a href="https://codeforces.com/edu/courses" target="_blank">Edu</a> na hotbar do Codeforces. Após isso, dê *enroll* em *ITMO Academy: pilot course*.)