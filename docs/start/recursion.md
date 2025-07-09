# Recursão
 
## Aula relacionada recomendada

<figure markdown="span" class="left-caption">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/ngCos392W4w?si=WZziRzVIdzlF8p0H" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</figure>

## Introdução

Recursão é definir algo em termos de si próprio. Um dos exemplos mais clássicos para ilustrar esse conceito é a sequência de Fibonacci. Ela é uma sequência de números inteiros de tal forma que os primeiros elementos são \(0\) e \(1\) e os próximos elementos são definidos como a soma dos dois anteriores.

Em linguagem matématica, definimos o \(n\)-ésimo termo de Fibonacci como:

$$
F(n) = 
\begin{cases}
0, \text{ se } n = 0 \\
1, \text{ se } n = 1 \\
F(n-1) + F(n-2)
\end{cases}
$$

No nosso contexto, vamos sempre estar trabalhando com funções recursivas, e considerando a sequência de Fibonacci, podemos escrever uma função recursiva que retorna o \(n\)-ésimo número de Fibonacci. Em código:
```cpp linenums="1" title="fibonacci.cpp"
int fib(int n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  return fib(n - 1) + fib(n - 2);  
}
```
!!! note "Observação"
    Cada chamada recursiva vai criar um novo "ambiente", as variáveis e argumentos são diferentes para cada chamada da função recursiva. Assim quando uma função recursiva se chama, apesar dos nomes das variáveis serem os mesmos, os valores em cada váriavel são independentes entre si. Como se fossem várias caixas com o mesmo nome, mas com conteúdos distintos.

Podemos perceber que a definição matemática do termo de Fibonacci e a função que fizemos são muito similares. Primeiramente, definimos o que chamamos de **casos bases**, que são situações em que não definimos a função em termos de si mesma, na sequência de Fibonacci, os casos bases seriam quando \(n\) é igual a \(0\) ou \(1\). Depois, definimos as **relações de recorrência**, quando não estamos tratando os casos básicos. Nelas, a função recursiva é definida em termo dela mesma, e como ela se relaciona consigo mesma é o que chamaremos de relação de recorrência. Uma função pode ter mais de uma relação de recorrência. 

Usando a recursão, podemos resolver muitos problemas com bastante facilidade. A seguir, veremos exemplos de como utilizar a recursividade.

!!! Tip "Recomendação"
    Nos exemplos, execute os códigos e tente simular o fluxo de execução da função recursiva para diferentes valores. Para cada chamada da função, tente escrever os valores das variáveis e argumentos para ajudar na compreensão.

## Exemplos:

### Contagem regressiva
Vamos definir uma função que imprime os números de \(N\) até \(1\) de maneira decrescente (uma contagem regressiva) usando a recursividade. Primeiro analisamos os possiveis casos base. Neste exemplo, temos um caso base, quando \(n = 1\). Quando \(n = 1\), vamos imprimir o número \(1\) e encerrar a contagem. Agora definimos as relações de recorrência, se \(n > 1\), então imprimimos o número \(n\) na tela e continuamos a contagem a partir do número \(n-1\). Ou seja:

$$
ContagemRegressiva(n) = 
\begin{cases}
\text{imprimir } 1, \text{ se } n =1 \\
\text{imprimir } n \text{ e chamar } ContagemRegressiva(n-1), \text{ se } n > 1
\end{cases}
$$

Em código:
```cpp linenums="1"
void ContagemRegressiva(int n){
  if(n == 1){
    cout << 1 << '\n';
    return;
  }
  cout << n << '\n';
  ContagemRegressiva(n-1);
}
```
Agora basta chamar a função `ContagemRegressiva(N)` que ela irá realizar a contagem regressiva de \(N\) até \(1\).

!!! Tip "Recomendação"
      Sempre tente escrever a função recursiva no papel, você não precisa definir ela de maneira completamente matemática, mas escrever no papel como a função recursiva funciona vai te ajudar a implementá-la.

### Contagem progressiva
Agora vamos definir uma função que imprime os números de \(1\) até \(N\) de maneira crescente (uma contagem progressiva). Pensando no exemplo anterior, poderíamos considerar o caso base \(n = N\) em que imprimos \(n\) e encerramos a contagem. A relação de recorrência seria quando \(n < N\), nesse caso imprimimos \(n\) e continuamos a contagem a partir do número \(n+1\). Ou seja:

$$
ContagemProgressiva(n,N) = 
\begin{cases}
\text{imprimir } n, \text{ se } n = N \\
\text{imprimir } n \text{ e chamar } ContagemProgressiva(n+1,N), \text{ se } n < N
\end{cases}
$$

Porém, existe outra maneira de definir essa função de tal maneira que não precisamos desse segundo parâmetro \(N\). Considerando:

$$
ContagemProgressiva(n) = 
\begin{cases}
\text{imprimir } 1, \text{ se } n = 1 \\
\text{chamar } ContagemProgressiva(n-1) \text{ e imprimir } n, \text{ se } n > 1
\end{cases}
$$

Em código:
```cpp linenums="1"
void ContagemProgressiva(int n){
  if(n == 1){
    cout << 1 << '\n';
    return;
  }
  ContagemProgressiva(n-1);
  cout << n << '\n';
}
```
Usando esse código, conseguimos fazer uma contagem progressiva de \(1\) até \(N\) chamando `ContagemProgressiva(N)` sem precisar usar dois parâmetros. Essa implementação parece muito similar a da `ContagemRegressiva(n)`, com exceção de que a impressão agora é feita depois da chamada recursiva, esse detalhe que faz a diferença. Quando chamamos a função recursiva primeiro, vamos chamar a função recursivamente até alcançarmos o caso base \(n = 1\). Somento quando \(n = 1\), vamos imprimir o número \(1\) e retornar das funções mais internas e imprimir os próximos números em ordem crescente.

### Subconjuntos
Dado um conjunto \(S\) de números naturais, vamos criar um programa que imprime todos os subconjuntos de \(S\). Para fazer isso, inicialmente, vamos ter um conjunto \(T\) vazio que usaremos para construir todos os subconjuntos possíveis. Considere que $S$ tem $N$ elementos. Para cada elemento, podemos escolher incluí-lo em \(T\) ou não. Cada escolha gera um novo subconjunto. Vamos pensar em uma definição recursiva com essa ideia em mente, para cada elemento \(x\) em \(S\), temos duas opções: 

- incluir \(x\) em \(T\) e gerar o conjunto \(T \cup \{x\}\) ou 
- não incluir \(x\) em \(T\) e manter o mesmo conjunto \(T\). 

Após fazer a escolha para \(x\), podemos desconsiderar \(x\) em \(S\) e passar a considerar o conjunto \(S - \{x\}\). Com essa ideia, podemos implementar a função recursiva.

$$
Subconjuntos(S,T) = 
\begin{cases}
\text{imprimir } T, \text{ se } S = \emptyset \\
Subconjuntos(S-x,T \cup x) \text{ e } Subconjuntos(S-x,T), \text{ se } S \neq \emptyset \text{ e considerando } x \in S
\end{cases}
$$

Em código:
```cpp linenums="1"
void Subconjuntos(vector<int> S, vector<int> T){
  if(S.empty()){
    Imprimir(T); // Função que imprime o subconjunto
    return;
  }
  int x = S.back();
  S.pop_back(); // Retiramos o elemento x de S

  // Opção de incluir x em T
  T.push_back(x);
  Subconjuntos(S,T); // Subconjuntos(S-x,T + {x})
  
  // Opção de não incluir x em T
  T.pop_back(); // Desfazemos a operação que fizemos anteriormente de incluir x em T
  Subconjuntos(S,T); // Subconjuntos(S-x,T)
}
```
Mas existe um problema nessa implementação que vamos evitar. Toda vez que chamamos a função recursivamente, passamos o `vector` como argumento, isso vai alocar espaço na memória a cada chamada e atrasar o nosso programa. Para evitar isso vamos considerar \(S\) e \(T\) `vector`'s globais e vamos utilizar índices para considerar os elementos de S e também o caso base.
```cpp linenums="1"
vector<int> S,T;
void Subconjuntos(int pos){
  // consideramos todos os elementos de S
  if(pos == S.size()){
    Imprimir(T); // Função que imprime o subconjunto
    return;
  }
  int x = S[pos]; // estamos considerando o elemento na posiçao "pos"

  // Opção de incluir x em T
  T.push_back(x);
  Subconjuntos(pos+1); 
  
  // Opção de não incluir x em T
  T.pop_back(); // Desfazemos a operação que fizemos anteriormente de incluir x em T
  Subconjuntos(pos+1);
}
```
Agora para imprimir os subconjuntos, basta chamar `Subconjuntos(0)`.

!!! Tip "Recomendação"
    Se você tem que alterar uma estrutura mais complicada em uma função `vector`, `set` ou `map` por exemplo. Tente colocar essas estruturas globalmente, assim você tem menos chance de sem querer passar essas estruturas como argumento e alocar memória desnecessariamente.

## Lista de exercícios
- <a href = "https://cses.fi/problemset/task/1622" target = "_blank">CSES - Creating Strings</a>
- <a href = "https://atcoder.jp/contests/abc367/tasks/abc367_c" target = "_blank">Atcoder - Enumerate Sequences</a>
- <a href = "https://neps.academy/br/exercise/11" target = "_blank">OBI - Falta uma</a>
- <a href = "https://atcoder.jp/contests/abc247/tasks/abc247_c" target = "_blank">Atcoder - 1 2 1 3 1 2 1</a>
- <a href = "https://codeforces.com/gym/103540/problem/B" target = "_blank"> GYM Codeforces - Gift</a>
- <a href = "https://codeforces.com/problemset/problem/1829/D" target = "_blank"> Codeforces - Gold Rush</a>
- <a href = "https://atcoder.jp/contests/abc167/tasks/abc167_c" target = "_blank">Atcoder - Skill Up</a>
- <a href = "https://atcoder.jp/contests/abc260/tasks/abc260_c" target = "_blank">Atcoder - Changing Jewels</a>
- <a href = "https://cses.fi/problemset/task/1623" target = "_blank">CSES - Apple Division</a>
- <a href = "https://cses.fi/problemset/task/2165/" target = "_blank">CSES - Tower of Hanoi</a>
