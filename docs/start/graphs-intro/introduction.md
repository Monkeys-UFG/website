# Introdução

Essa seção tem o intuito de apresentar uma introdução à Teoria dos Grafos.


## Definição
Um grafo é representado por um par ordenado $G = (V, E)$, em que $V$ é o conjunto de vértices e $E$ é o conjunto de arestas. Eles podem ser utilizados para representar relações entre os vértices, através do uso das arestas. Por exemplo, os vértices podem ser vistos como cidades e as arestas como estradas, em que a aresta $(U,V)$ existe se há uma estrada entre as cidades $U$ e $V$.

Os exemplos dessa seção serão baseados no seguinte grafo:
<figure markdown="span" class="graphs"> 
    ![Grafo de exemplo](../../assets/graphs/undirected_graph.png)
</figure>

$$
    V = \{A, B, C, D\}
$$

$$
    E = \{
            (A, B), (A, C),
            (B, C), (B, D),
            (C, D)
        \}
$$

## Vizinhança
Definimos a vizinhança $N$ de um vértice $V$ como o conjunto de vértices que estão ligados diretamente a $V$ através de uma aresta.
Em grafos direcionados, se temos a aresta $(U,V)$, então $V\in N(U)$ e $U\notin N(V)$.  

$$
N(V) = \{U | (V,U) \in E\}
$$

$$
\begin{aligned}
    &N(A) = \{B,C\} \\
    &N(B) = \{A,C,D\} \\
    &N(C) = \{A,B,D\} \\
    &N(D) = \{B,C\} 
\end{aligned}
$$

## Grau
O grau de um vértice $V$ é o número de arestas que incidem em $V$. Se existe uma aresta que liga um vértice nele mesmo (loops), ela conta duas vezes em seu grau. 
Em grafos direcionados, temos dois tipos de grau: de entrada e saida, que representam, respectivamente,
o número de arestas que entram e saem no vértice.

$$
    Deg(V) = \left|N(V) \right| + loops
$$

$$
\begin{aligned}
&Deg(A) = 2 \\
&Deg(B) = 3 \\
&Deg(C) = 3 \\
&Deg(D) = 2 
\end{aligned}
$$

