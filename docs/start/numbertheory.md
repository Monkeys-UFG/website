# Teoria dos Números
Teoria dos números é um ramo da matemática que estuda números inteiros. Nessa seção, assumiremos que todos os números são inteiros.

## Aula relacionada recomendada

<figure markdown="span" class="left-caption">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/EiEmhW8_Stw?si=-2ji3drmaNcrR9e7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Créditos: Canal Maratona UFMG </figcaption>
</figure>

## Divisores
Um número $a$ é chamado de divisor ou fator de um número $b$ se $a$ divide $b$. Escrevemos $a \mid b$ e temos a seguinte propriedade:

$$
b = a \cdot k, k \in \mathbb{Z}
$$  

Por exemplo, os divisores de $24$ são $1, 2, 3, 4, 6, 8, 12$ e $24$.

$$
24 = 1 \cdot 24 = 2 \cdot 12 = 3 \cdot 8 = \cdots = 24 \cdot 1
$$

### Primos
Um número $n > 1$ é primo se seus únicos divisores positivos são $1$ e $n$. Por exemplo, $7, 19$ e $41$ são primos, mas 35 não é primo pois $5 \cdot 7 = 35$. Para todo número $n > 1$ existe uma única fatoração em primos:

$$
n = p_1^{\alpha_1} p_2^{\alpha_2} \cdots p_k^{\alpha_k},
$$

em que $p_1, p_2, ..., p_k$ são primos distintos e
$\alpha_1, \alpha_2, \cdots, \alpha_k$ são inteiros positivos. Por exemplo, a fatoração do número 84 é:

$$
    84 = 2^{2} \cdot 3^{1} \cdot 7^{1}
$$

### Número de divisores
O número de divisores de um número $n$ é:

$$
\tau(n) = \prod_{i=1}^{k} (\alpha_i + 1),
$$

porque para todo primo $p_i,$ existem $\alpha_i + 1$ formas de escolher quantas vezes ele aparece no divisor, de $p_i^0$ até $p_i^{\alpha_i}$. Por exemplo, o número de divisores de 84 é:

$$
\tau(84) = 3 \cdot 2 \cdot 2 = 12.
$$

### Soma dos divisores
A soma dos fatores de $n$ é:

$$
\sigma(n) = \prod_{i=1}^{k} (1 + p_i + \cdots + p_i^{\alpha_i}) = \prod_{i=1}^{k} \left(\frac{p_i^{\alpha_i+1} - 1} {p_i - 1} \right),
$$

pois podemos escolher qualquer potência dos primos presentes na fatoração de $n$, de $p_i^{0} = 1$ até $p_i^{\alpha_i}$. A simplificação pode ser feita pela soma de progressão geométrica com razão $p_i$:

$$
\begin{align}
S &= 1 + p_i + \cdots + p_i^{\alpha_i -1} +  p_i^{\alpha_i} \\
S \cdot p_i &= p_i + p_i^{2} + \cdots + p_i^{\alpha_i}+ p_i^{\alpha_i + 1} \\
S \cdot p_i - S &= p_i^{\alpha_i+1} - p_i^{\alpha_i} + p_i^{\alpha_i} - \cdots + \cdots - p_i + p_i - 1 \\
S \cdot (p_i - 1) &= p_i^{\alpha_i+1} - 1 \\
S &= \frac{p_i^{\alpha_i+1} - 1}{p_i - 1}
\end{align}
$$

Por exemplo, a soma dos fatores de 84 é:

$$
\sigma(84) = \frac{2^{3}-1}{2-1} \cdot \frac{3^{2}-1}{3-1} \cdot \frac{7^{2}-1}{7-1} = 
7 \cdot 4 \cdot 8 = 224
$$


### Produto dos divisores
O produto dos divisores de $n$ é:

$$
\mu(n) = n^{\tau(n)/2},
$$

porque podemos formar $\tau(n)/2$ pares de divisores, cada um com produto igual à $n$. Por exemplo, os doze fatores de $84$ produzem seis pares:

$$
\begin{align}
1 \cdot 84 \\
2 \cdot 42 \\
3 \cdot 28 \\
4 \cdot 21 \\
6 \cdot 14 \\
7 \cdot 12 
\end{align}
$$

e o produto dos fatores é $\mu(84) = 84^{6} = 351298031616$.

## Densidade de primos

A densidade de números primos $\pi(n)$ representa a quantidade de primos entre $1$ e $n$. Temos a aproximação:

$$
    \pi(n) \approx \frac{n}{\ln(n)}
$$

Por exemplo $\pi(10) = 4,$ pois temos $4$ primos entre $1$ e $10:$ $2, 3, 5, 7$.  

## Algoritmos básicos
Se um número $n$ não é primo, ele pode ser representado como um produto $a \cdot b,$ em que $a \leq \sqrt{n}$ ou $b \leq \sqrt{n}$, portanto existe um fator entre $2$ e $\lfloor\sqrt{n}\rfloor$. Assim, podemos testar se um número é primo e achar sua fatoração em $O(\sqrt{n})$.

### Identificar se um número é primo 
A função $is \_ prime$ abaixo checa se o número $n$ é primo. Sabemos que o único número par primo é $2$, portanto podemos checar a paridade de $n$ e tentar dividir $n$ apenas pelos números impares entre $3$ e $\lfloor \sqrt{n} \rfloor$.
```cpp title="is_prime.cpp" linenums="1"
bool is_prime(int n) {
    if (n < 2) return false;
    if(n%2==0) return n==2;

    for (int x = 3; x*x <= n; x+=2) {
        if (n%x == 0) return false;
    }
    
    return true;
}
```

### Fatorar um número
A função $factor$ abaixo retorna um vetor que contém a fatoração em primos do número $n$. A função divide $n$ pelos seus divisores primos e os adiciona no vector. O processo encerra quando $n$ não tem mais fatores entre $2$ e $\lfloor \sqrt{n} \rfloor$. Ao final do processo, se $n > 1$, ele é primo e é o último divisor.

```cpp title="factor.cpp" linenums="1"
vector<int> factors(int n) {
    vector<int> f;

    for (int x = 2; x*x <= n; x++) {
        while (n%x == 0) {
            f.push_back(x);
            n /= x;
        }
    }
    if (n > 1) f.push_back(n);

    return f;
}
```
Note que cada fator primo aparece no vetor a quantidade de vezes que ele divide o número. Por exemplo, $24 = 2^3  \cdot 3$, portanto o resultado da função será $[2, 2, 2, 3]$.

## Crivo de Eratóstenes
O crivo de Eratóstenes é um algoritmo que constrói um vetor no qual podemos usar de maneira eficiente para determinar se um determinado número entre $0$ e $n$ é primo.
O algoritmo constrói um vetor $prime$ cujas posições $0, 1, 2, 3, \cdots, n$ são usadas. O valor $prime[k] = 1$ significa que $k$ é primo, e o valor $prime[k] = 0$ significa que $k$ não é primo.

O algoritmo itera sobre os números $2, \cdots, n$ um por um. Sempre que um novo primo $x$ é encontrado, o algoritmo guarda que os múltiplos de $x$ $(2x, 3x, 4x, \cdots)$ não são primos, pois são divisíveis por x.

```cpp title="crivo.cpp" linenums="1"
vector<int> crivo(int N) {
    vector<int>prime(N+1, 1);
    prime[0] = prime[1] = 0;

    for (int x = 2; x <= N; x++) {
        if(prime[x]){
            for(int y = x+x; y <= N; y+=x){
                prime[y] = 0;
            }
        }
    }
    return prime;
}
```

O loop interior do algoritmo é executado $n/x$ vezes para cada valor de $x$. Portanto, um upper bound para a complexidade de tempo é a série harmônica 

$$
    \sum_{x=2}^{n} \frac {n}{x} = \frac {n}{2} + \frac {n}{3} + \cdots + \frac {n}{n} = \mathcal{O}(n \log{n})
$$

Na realidade, o algoritmo é mais eficiente, pois o loop interior vai ser executado apenas se o número $x$ é primo, cuja frequência é aproximadamente $\frac{n}{\ln(n)}$. Portanto, a complexidade de tempo do algoritmo é $\mathcal{O}(n \log \log n)$, sendo muito próxima de $\mathcal{O}(n)$.


Podemos alterar o algoritmo para obter a fatoração de cada número entre $2$ e $n$, criando um novo vetor $d$ de vectors, em que $d[k]$ guarda a fatoração em primos do número $k$.


```cpp title="crivo_div.cpp" linenums="1"
vector<vector<int>> crivo(int N) {
    vector<int>prime(N, 1);
    prime[0] = prime[1] = 0;
    vector<vector<int>>d(N);

    for (int x = 2; x < N; x++) {
        if(prime[x]){
            d[x].push_back(x);
            for(int y = x+x; y < N; y+=x){
                prime[y] = 0;
            
                int t = y;
                while(t%x==0){
                    d[y].push_back(x);
                    t/=x;
                }
            }
        }
    }
    return d;
}
```

## Máximo Divisor Comum (MDC ou GCD)
O máximo divisor comum de dois números $a$ e $b$, $\gcd(a,b)$, é o maior número que divide tanto $a$ quanto $b$. Por exemplo, $\gcd(24,36) = 12$.

### Algoritmo de Euclides
O algoritmo de euclides é uma maneira eficiente de calcular o $\gcd$ de dois números. Ele é baseado na seguinte fórmula:

$$
\gcd(a,b) = 
\begin{cases}
a, & \text{se } b = 0 \\
\gcd(b, a \bmod b), & \text{se } b \neq 0 
\end{cases}
$$

O algoritmo de Euclides funciona em tempo $\mathcal{O}(\log n)$, em que $n = \min(a,b)$.

O pior caso acontece quando $a$ e $b$ são números consecutivos de Fibonacci. Por exemplo,

$$
\gcd(13,8) = \gcd(8,5) = \gcd(5,3) = \gcd(3,2) = \gcd(2,1) = \gcd(1,0) = 1
$$

```cpp title="gcd.cpp" linenums="1"
int gcd(int a, int b){
    if(b==0) return a;
    return gcd(b, a%b);
}
```

## Mínimo múltiplo comum (MMC ou LCM)
O mínimo múltiplo comum de dois números $a$ e $b$, $lcm(a,b)$, é o menor número que é divisível por $a$ e por $b$. Por exemplo, $lcm(24,36) = 72.$

O $\gcd$ e o $lcm$ possuem a seguinte propriedade:

$$
    lcm(a,b) = \frac{ab}{\gcd(a,b)}
$$

## Função totiente de Euler
Números $a$ e $b$ são coprimos se $\gcd(a,b) = 1$. A função totiente de Euler $\varphi(n)$ calcula a quantidade de números coprimos com $n$ entre $1$ e $n$. Por exemplo, $\varphi(12) = 4$, porque $1, 5, 7$ e $11$ são coprimos com $12$.

O valor de $\varphi(n)$ pode ser calculado pela fatoração em primos de $n$ usando a formula:

$$
\varphi(n) = \prod_{i=1}^{k} (p_i^{\alpha_i - 1} \cdot (p_i - 1))
$$

Por exemplo, $\varphi(12) = (2^1 \cdot (2-1)) \cdot (3^0 \cdot (3-1)) = 4$. 

Note que $\varphi(n) = n-1$ se $n$ é primo.


## Aritmética modular
 
Na aritmética modular, o conjunto de números é limitado para apenas $0, 1, 2, \cdots, m-1$, em que $m$ é uma constante.

Cada número $x$ é representado pelo número $r$ tal que 

$$
0 \le r < m \\
$$

$$
x = m \cdot k + r, k \in \mathbb{Z}
$$

Por exemplo, $75 \bmod 17 = 7$.

Pode-se calcular o módulo antes de algumas operações para evitar números muito grandes. Algumas propriedades são:

$$
\begin{align}
(x + y) \bmod m &= (x \bmod m + y \bmod m) \bmod m \\
(x - y) \bmod m &= (x \bmod m - y \bmod m) \bmod m \\
(x \cdot y) \bmod m &= (x \bmod m \cdot y \bmod m) \bmod m \\
x^n \bmod m &= (x \bmod m)^n \bmod m
\end{align}
$$

## Exponenciação Rápida

Existe um jeito de calcular o valor de $x^n \bmod m$ em $\mathcal{O}(\log n)$ utilizando a seguinte recursão:

$$
x^n = 
\begin{cases}
1 &,\text{se $n = 0$} \\
x^{n/2} \cdot x^{n/2} &, \text{se $n$ for par} \\
x^{n-1} \cdot x &, \text{se $n$ for impar} 
\end{cases}
$$

É importante que no caso de $n$ ser par, o valor de $x^{n/2}$ é calculado apenas uma vez. Isso garante a complexidade $\mathcal{O}(\log n)$, porque $n$ é sempre dividido por dois quando é par. 

```cpp title="fastexp.cpp" linenums="1"
int fastexp(int x, int n, int m){
    if(n==0) return 1;
    long long p = fastexp(x, n/2, m);
    p = (p * p) % m;
    if(n%2 == 1) p = (p * x) % m;
    return p;
}
```

## Pequeno Teorema de Fermat e Teorema de Euler

Para um $m$ primo e coprimo com $x$, o pequeno teorema de Fermat afirma que

$$
x^{m-1} \bmod m  = 1
$$

Pode-se expandir para 

$$
x^k \bmod m = x^{k \bmod (m-1)} \bmod m
$$

De forma geral, o teorema de Euler para $x$ e $m$ coprimos afirma que

$$
x^{\varphi (m)} \bmod m = 1
$$

O teorema de Fermat é equivalente ao teorema de Euler, pois $\varphi (m) = m-1$ para $m$ primo.

## Inverso modular

O inverso de $x \bmod m$ é um número $x^{-1}$ tal que

$$
x \cdot x^{-1} \bmod m = 1
$$

Usando inversos modulares, é possível dividir números módulo $m$, porque divisão por $x$ corresponde à multiplicação por $x^{-1}$.

No entanto, o inverso modular nem sempre existe. Por exemplo, se $x = 2$ e $m = 4$, a equação $x \cdot x^{-1} \bmod m = 1$ não tem solução, porque todos os múltiplos de 2 serão pares e o resto nunca poderá ser $1$ quando $m = 4$. Temos que $x^{-1} \bmod m$ pode ser calculado apenas quando $x$ e $m$ são coprimos.

Pelo teorema de Euler,

$$
x^{\varphi(m)} \bmod m = x \cdot x^{\varphi(m) - 1} \bmod m = 1
$$


Portanto, por definição, os números $x^{-1}$ e $x^{\varphi(m)-1}$ são equivalentes módulo $m$.

$$
x^{-1} = x^{\varphi(m)-1} \bmod m
$$

Se $m$ é primo, obtemos

$$
x^{-1} = x^{m-2} \bmod m
$$

Essa fórmula permite calcular inversos modulares de uma forma eficiente utilizando o algoritmo da exponenciação rápida. 

```cpp title="mod_inverse.cpp" linenums="1"
int inv(int x, int m){
    return fexp(x, m-2, m);
}
```

Por exemplo, $6^{-1} \bmod 17 = 6^{17 - 2} \bmod 17 = 3$. Note que $6 \cdot 3 \bmod 17 = 1$.


## Problemas recomendados

- <a href="https://cses.fi/problemset/task/1713" target="_blank">CSES - Counting Divisors</a>
- <a href="https://cses.fi/problemset/task/3396" target="_blank">CSES - Next Prime</a>
- <a href="https://atcoder.jp/contests/abc169/tasks/abc169_d" target="_blank">Atcoder - Div Game</a>
- <a href="https://cses.fi/problemset/task/2182" target="_blank">CSES - Divisor Analysis</a>
- <a href="https://cses.fi/problemset/task/1081" target="_blank">CSES - Common Divisors</a>
- <a href="https://atcoder.jp/contests/abc412/tasks/abc412_e" target="_blank">Atcoder - LCM Sequence</a>
- <a href="https://cses.fi/problemset/task/1095" target="_blank">CSES - Exponentiation</a>
- <a href="https://cses.fi/problemset/task/1712" target="_blank">CSES - Exponentiation II</a>
- <a href="https://cses.fi/problemset/task/2185" target="_blank">CSES - Prime Multiples</a>
- <a href="https://cses.fi/problemset/task/2417" target="_blank">CSES - Counting Coprime Pairs</a>
- <a href="https://cses.fi/problemset/task/1082" target="_blank">CSES - Sum of Divisors</a>
