# Bot -  Tem NBA na TV hoje
![Logo NBA](/NBAlogo.png)

## Objetivo

Criação de bot simples para o twitter, como forma de estudos de JavaScript, utilizando framework NodeJS.

## Funcionamento

A partir de informações do site [Jumper Brasil](https://jumperbrasil.lance.com.br/calendario-transmissoes-nba-brasil/), foi extraída a lista das transmissões da NBA no Brasil. Elas foram formatadas em arquivo CSV utilizando o PowerQuery do Excel.

Os dados da planilha são lidos e, caso haja correspondência com o dia de hoje, é postado um tweet pré-formatado com as informações da transmissão no perfil [@temNBAnaTVhoje](https://twitter.com/temNBAnaTVhoje).

O projeto utiliza pipeline do Github, programada para rodar o bot diariamente às 9h (horário brasileiro).