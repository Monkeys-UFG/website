# Recursão

## Aula relacionada recomendada

<figure markdown="span" class="left-caption">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/watch?v=ngCos392W4w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</figure>

## Introdução

Recursão é definir algo em termos de si próprio. Um dos exemplos mais clássicos para ilustrar esse conceito é a sequência de Fibonacci. Ela é uma sequência de números inteiros de tal forma que os primeiros elementos são \(0\) e \(1\) e os próximos elementos são definidos como a soma dos dois anteriores.

Em linguagem matématica, definimos o \(n\)-ésimo termo de Fibonacci como:

$$
F(n) = 
\begin{cases}
0, \text{se } n = 0 \\
1, \text{se } n = 1 \\
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

Podemos perceber que a definição matemática do termo de Fibonacci e a função que fizemos são muito similares, primeiro definimos o que chamamos de **casos bases**, que são situações em que não definimos a função em termos dela mesmo, na sequência de Fibonacci, os casos bases seriam quando \(n\) é igual a \(0\) ou \(1\). Depois definimos as **relações de recorrência**, quando não estamos tratando os casos básicos, a função recursiva é definida em termo dela mesma, e como ela se relaciona consigo mesma é o que chamaremos de relação de recorrência. Uma função pode ter mais de uma relação. 

Pensando na recursão, podemos definir muitas funções de maneira recursiva com bastante facilidade. A seguir, daremos exemplos de como utilizar a recursividade.

## Exemplos:

### Contagem regressiva
Vamos definir uma função que imprime os números de \(N\) até \(1\) de maneira decrescente (uma contagem regressiva), para exercitar a recursividade vamos tentar estabelecer uma definição recursiva da contagem. Primeiro analisamos os possíveis casos básicos, nesse caso, quando \(n = 1\), só iremos imprimir o número \(1\) na tela e então encerrar a contagem, se \(n > 1\), então imprimimos o número \(n\) na tela e continuamos a contagem a partir do número \(n-1\). Ou seja:

$$
ContagemRegressiva(n) = 
\begin{cases}
\text{imprimir } 1, \text{ se } n =1 \\
\text{imprimir } n \text{ e iniciar } ContagemRegressiva(n-1), \text{ se } n > 1
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
Agora basta chamar a função `ContagemRegressiva(n)` que ela irá realizar a contagem regressiva.

!!! Tip "Recomendação"
      Sempre tente escrever a função recursiva no papel, você não precisa definir ela de maneira completamente matemática, mas escrever no papel como a função recursiva funciona vai te ajudar a implementá-la.

### Contagem progressiva
Agora vamos definir uma função que imprime os números de \(1\) até \(N\) de maneira crescente (uma contagem progressiva). Primeiro analisamos os possíveis casos básicos, nesse caso, quando chegarmos no último número \(N\), vamos imprimí-lo e encerrar a contagem, se \(n < N\), então imprimimos o número \(n\) na tela e continuamos a contagem a partir do número \(n+1\). Ou seja:

$$
ContagemProgressiva(n) = 
\begin{cases}
\text{imprimir } n, \text{ se } n = N \\
\text{imprimir } n \text{ e iniciar } ContagemProgressiva(n+1), \text{ se } n < N
\end{cases}
$$

Em código:
```cpp linenums="1"
void ContagemProgressiva(int n, int N){
  if(n == N){
    cout << n << '\n';
    return;
  }
  cout << n << '\n';
  ContagemProgressiva(n+1);
}
```
Nesse exemplo, utilizamos uma váriavel auxiliar \(N\) que vai nos dizer o número máximo que iremos contar, porque diferentemente do caso anterior, estamos começando a contagem  partir do número 1 e terminando em um número \(N\), e como esse número pode variar, temos que de alguma maneira saber qual o valor desse número ao chamar a função `ContagemProgressiva(1,N)`.



