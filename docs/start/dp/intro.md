# Introdução

Dinamação Progrâmica é uma técnica de algoritmos bastante poderosa e capaz de resolver problemas bem complexos de programação. Toda a sua essência se baseia em não repetir cálculos já feitos, e os problemas que envolvem essa técnica podem ser resolvidos usando [recursão](../recursion.md), então é bom saberem o que é recursão e terem resolvido alguns problemas relacionados ao tópico antes de iniciar esse, já que Programação Dinâmica é bastante dependente de recursão. 

## Fibonacci

No mais, vamos começar com um problema clássico que já foi falado naquele tópico, o problema de calcular o $n$-ésimo termo da [sequência de Fibonacci](https://pt.wikipedia.org/wiki/Sequ%C3%AAncia_de_Fibonacci), um problema também apresentado na sessão anterior. Trazendo o problema para esse tópico, podemos escrever a função que define o Fibonacci da seguinte maneira:

$$
F(n) = 
\begin{cases}
    0, \text{ se } n = 0\\
    1, \text{ se } n = 1\\
    F(n-1) + F(n-2), \text{ se } n \ge 2
\end{cases}
$$

Assim, com essa interpretação, podemos escrever a seguinte função recursiva que resolve esse problema:

``` cpp linenums="1" title="fibonacci.cpp"
int F(int n) {
    // primeiro, trate os casos base
    if(n == 0) return 0;
    if(n == 1) return 1;

    // depois, trate o caso recursivo.

    return F(n-1) + F(n-2);
}
```

Podemos ver que essa função é a interpretação do problema feita em código. Agora, vamos fazer algo que não foi feito naquela sessão, que é analisar a complexidade desse algoritmo, visto que será importante para sabermos até onde essa solução para o problema é viável. Em essência, o que estamos fazendo é dividindo esse problema em subproblemas menores até chegarmos em um caso que sabemos qual a resposta (o caso com $n=1$ e $n=0$). Assim, quando temos essa resposta, retornamos ela e combinamos com as respostas achadas em outros ramos da nossa recursão.

Interpretar chamadas recursivas pode ser difícil a primeira vista, mas é possível. Para o problema de Fibonacci, temos que o código solução tem duas chamadas recursivas, uma para $F(n-1)$ e outra para $F(n-2)$, significando que precisamos resolver o problema de Fibonacci para $n-1$ e para $n-2$. Vamos olhar para o que acontece quando chamamos a função para o $n = 5$:

<figure markdown="span" class="graphs"> 
    ![Exemplo de Fibonacci](../../assets/graphs/fibonacci.png)
</figure>

Quando chamamos a função para $n=5$, observem que a função de Fibonacci para $n=3$ é chamada duas vezes durante a recursão, e para $n=2$, a função aparece $3$ vezes. Isso implica que, várias vezes, a função para alguns valores acaba sendo chamada mais do que uma vez, e recalcula a solução para aqueles valores mesmo eles tendo sido calculados anteriormente.

Como cada chamada da função gera dois novos ramos na árvore de tamanho similar ao ramo anterior, temos que cada um dos ramos terá $\mathcal{O}(n)$ elementos. Com isso, podemos chegar na conclusão que a complexidade de calcular o $n$-ésimo número de Fibonacci é $\mathcal{O}(2^n)$. Se calcularmos o valor de $2^n$ para $n = 20$, chegaremos em um valor aproximado de $10^6$, o que já é bem grande. Se usarmos $n = 30$, chegaríamos a $10^9$, o que já seria inviável para resolver a questão. Então, o nosso objetivo é tentar cortar o máximo de ramos possíveis na árvore, já que muitos deles são repetidos.

Algo que podemos fazer para resolver esse problema é salvar em uma tabela o resultado da computação gerada. Vamos declarar um vetor chamado $tab[]$, que tem o objetivo de guardar o resultado daquela computação, caso ela ainda não tenha sido feita. Agora, quando chamarmos a função de Fibonacci, assim que chegarmos em um cara que já calculamos e salvamos no vetor, vamos simplesmente retornar o valor do vetor, pois ele já contém a resposta para aquele subproblema, e assim evitamos recomputar as respostas já tabuladas.

Vamos escrever o código para melhor compreensão da modificação que faremos no algoritmo:

``` cpp linenums="1" title="fibonacci_dp.cpp"
const int N = 2e5+10;

int tab[N]; // tabela de respostas

int F(int n) {
    if(n == 0) return 0;
    if(n == 1) return 1;

    // -1 significa ainda não calculado
    if(tab[n] != -1) return tab[n];

    // calculamos o novo valor e salvamos na tabela
    return tab[n] = F(n-1) + F(n-2);
}
```

O novo algoritmo tem pouca mudança: apenas uma tabela foi adicionada, e isso conclue todo o trabalho que precisamos fazer para otimizar a complexidade de tempo do problema. O que acontece é exatamente o que foi falado acima, guardar o resultado na tabela e consultar depois caso ele já tenha sido calculado. Em essência, todos os ramos que continham um valor já calculado em outro ramo serão cortados, e a nova complexidade será apenas uma passada linear em um ramo da árvore por completo, ou seja, $\mathcal{O}(n)$! Saímos de uma complexidade exponencial do problema para complexidade linear.