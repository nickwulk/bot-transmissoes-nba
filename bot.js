//dependências
require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
var dados, data, hora, jogo, canal;

//autenticação
var client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

//cálculo do dia de hoje
function diaDeHoje() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  return today;
}

// twitta hoje
function tweetHoje() {
  // lê planilha csv
  const csv = require("csv-parser");
  const fs = require("fs");
  const dados = [];

  fs.createReadStream("data.csv")
    .pipe(csv({ separator: "," }))
    .on("data", (data) => dados.push(data))
    .on("end", () => {
      console.log("Bot running");

      // calcula e retorna quantidade de transmissões
      qtdTransmissoes = dados.length;
      console.log(qtdTransmissoes);

      // itera sobre os dados da planilha
      for (var i = 0; i < dados.length; i++) {
        hoje = diaDeHoje();
        if (dados[i].data == hoje) {
          hora = dados[i].hora;
          jogo = dados[i].jogo;
          canal = dados[i].transmissão;
          msg =
            "Transmissão de " +
            hoje +
            ": " +
            hora +
            " | " +
            jogo +
            " | " +
            canal +
            " #NBA #NBAnaESPN #ESPNnoStarPlus #NBAnoPrimeVideo";

          // console.log(msg);

          // twitta usando a api do twitter
          client.v2
            .tweet(msg)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    });
}

tweetHoje();
