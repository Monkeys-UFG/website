# Introdução

Programação Dinâmica é uma técnica de algoritmos bastante poderosa e capaz de resolver problemas bem complexos de programação. Toda a sua essência se baseia em não repetir cálculos já feitos, e os problemas que envolvem essa técnica podem ser resolvidos usando [recursão](../recursion.md), então é bom saberem o que é recursão e terem resolvido alguns problemas relacionados ao tópico antes de iniciar esse, já que Programação Dinâmica é bastante dependente de recursão. 

## Sequência de Fibonacci

No mais, vamos começar com um problema clássico que já foi falado no tópico de recursão, que é o problema de calcular o $n$-ésimo termo da [sequência de Fibonacci](https://pt.wikipedia.org/wiki/Sequ%C3%AAncia_de_Fibonacci). Trazendo o problema para esse tópico, podemos escrever a função que define o Fibonacci da seguinte maneira:

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

## Complexidade da Solução

Podemos ver que essa função é a interpretação do problema feita em código. Agora, vamos fazer algo que não foi feito naquela sessão, mas foi feito na sessão de [complexidade de algoritmos](../complexity.md), que é analisar a complexidade desse algoritmo, visto que será importante para sabermos até onde essa solução para o problema é viável. Em essência, o que estamos fazendo é dividindo esse problema em subproblemas menores até chegarmos em um caso que sabemos qual a resposta (o caso com $n=1$ e $n=0$). Assim, quando temos essa resposta, retornamos ela e combinamos com as respostas achadas em outros ramos da nossa recursão.

Interpretar chamadas recursivas pode ser difícil a primeira vista, mas é possível. Para o problema de Fibonacci, temos que o código solução tem duas chamadas recursivas, uma para $F(n-1)$ e outra para $F(n-2)$, significando que precisamos resolver o problema de Fibonacci para $n-1$ e para $n-2$. Vamos olhar para o que acontece quando chamamos a função para o $n = 5$:

<figure markdown="span" class="graphs"> 
    ![Exemplo de Fibonacci](../../assets/graphs/fibonacci.png)
</figure>

Quando chamamos a função para $n=5$, observem que a função de Fibonacci para $n=3$ é chamada duas vezes durante a recursão, e para $n=2$, a função aparece $3$ vezes. Isso implica que, várias vezes, a função para alguns valores acaba sendo chamada mais do que uma vez, e recalcula a solução para aqueles valores mesmo eles tendo sido calculados anteriormente.

Como cada chamada da função gera dois novos ramos na árvore de tamanho similar ao ramo anterior, temos que cada um dos ramos terá $\mathcal{O}(n)$ elementos. Com isso, podemos chegar na conclusão que a complexidade de calcular o $n$-ésimo número de Fibonacci é $\mathcal{O}(2^n)$. Se calcularmos o valor de $2^n$ para $n = 20$, chegaremos em um valor aproximado de $10^6$, o que já é bem grande. Se usarmos $n = 30$, chegaríamos a $10^9$, o que já seria inviável para resolver a questão. Então, o nosso objetivo é tentar cortar o máximo de ramos possíveis na árvore, já que muitos deles são repetidos.

## Técnica de Memoização

Algo que podemos fazer para resolver esse problema é salvar em uma tabela o resultado da computação gerada. Vamos declarar um vetor chamado $tab[]$, que tem o objetivo de guardar o resultado daquela computação, caso ela ainda não tenha sido feita. Após guardar, toda vez que chegarmos no mesmo estado novamente, apenas recuperamos o valor da tabela para evitar recomputar a função para aquele valor. Essa técnica é chamada de _memoização_ (não memorização), e tem como objetivo evitar recomputações desnecessárias.

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

Agora, para calcular a complexidade da programação dinâmica, olhamos para a relação _quantidade de subproblemas $\times$ trabalho por subproblema_. A quantidade de subproblemas é calculada olhando quantas outras funções precisam ser computadas para obter uma resposta para a função atual. Isso geralmente é feito olhando para os **estados** do problema, que são os parâmetros passados na função. No caso do Fibonacci, temos que para calcular $F(n)$, devemos ter calculado $F(n-1), F(n-2), \dots, F(0)$, ou seja, $n$ estados da função, e o trabalho por subproblema é calculado olhando as operações mais pesadas realizadas pela função. Temos que nesse caso, o trabalho realizado é $\mathcal{O}(1)$, já que há apenas retornos e verificações. Assim, a complexidade da programação dinâmica no problema de Fibonacci é $\mathcal{O}(n) \cdot \mathcal{O}(1) = \mathcal{O}(n)$.

Chamamos essa forma de resolver o problema de _top\_down_, onde chamamos a função do valor esperado, calculamos recursivamente o valor até chegar nos casos base da recursão e depois retornamos os valores obtidos, guardando os valores na tabela conforme construímos a resposta. Há uma outra forma de se fazer, chamada de _bottom\_up_, que é o exato oposto da _top\_down_: ela se baseia em começar pelos casos base da recursão e "subir" com os resultados obtidos, assim computando a $DP$ de baixo para cima.

!!! note "Informação Útil"
    Em inglês, o tópico de chama Dynamic Programming, e abreviado fica DP. As pessoas preferem chamar a técnica de DP quando abreviam porque vem do inglês, e a maioria dos blogs relacionados a isso são em inglês. Então se em algum tópico que você for ler estiver escrito DP em vez de PD, é por isso.

Uma implementação da técnica feita no Bottom_Up pode ser vista abaixo:

``` cpp title="bottom_up_fibonacci_dp.cpp" linenums="1"
const int N = 2e5+10;

int dp[N];
int F(int n) {
    // casos base
    dp[0] = 0;
    dp[1] = 1;

    // caso recursivo
    for(int i=2; i<=n; i++){
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
```

Podemos observar que essa função representa o cálculo do $n$-ésimo número de Fibonacci.

Com isso, podemos ver o quão poderosa é a técnica de Programação Dinâmica, e como ela pode ser usada para resolver esse e muitos outros problemas que envolvem salvar o cálculo de algum estado em uma tabela.

## Problemas Clássicos

A seguir, será falado de alguns problemas clássicos de programação dinâmica, que servirá como problemas introdutórios para a técnica ensinada acima.

### Problema da Mochila

O primeiro problema clássico envolvendo programação dinâmica tem a seguinte descrição: Imagine que você é um ladrão de joias e pretende roubar as joias de um comércio local. Você tem um saco capaz de aguentar uma quantidade $W$ de peso, e você pesquisou de antemão qual o valor e o peso de cada uma das $N$ joias que existem nesse comércio. Você tem o objetivo de maximizar o valor das joias roubadas sem que o peso delas ultrapasse o peso máximo que você pode carregar, senão o seu saco vai rasgar e você vai ficar sem nenhuma joia.

> Tente pensar em como você pode resolver o problema antes que você leia a solução esperada. Exercitar a mente é fundamental para se ter novas ideias.