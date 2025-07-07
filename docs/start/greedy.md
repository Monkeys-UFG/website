# Algoritmo Guloso


## Aula Relacionada Recomendada:

<figure markdown="span" class="left-caption">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/jZ4Pzf3P-NE?si=ktESPltXYZoh2kZt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Cŕeditos: Canal Maratona UFMG.</figcaption>
</figure>

## Motivação
Pense no seguinte problema
> Um restaurante recebeu \(n\) pedidos de reserva. Cada pedido reserva o restaurante por um período contínuo de tempo, sendo o \(i\)-ésimo pedido caracterizado por dois valores: o instante de início \(l_i\) e o instante de término \(r_i\) (com \(l_i \leq r_i\)).

> A administração do restaurante pode aceitar ou recusar os pedidos. Qual é o número máximo de pedidos que podem ser aceitos?

> Importante: nenhum par de pedidos aceitos pode se sobrepor, ou seja, eles não podem compartilhar nem mesmo um instante de tempo. Se um pedido termina exatamente no mesmo momento em que outro começa, ambos não podem ser aceitos simultaneamente.

> <a href="https://codeforces.com/problemset/problem/597/B" target="_blank">Codeforces - Restaurant</a>