//dependências
require("dotenv").config();
const Twit = require("twit");
const axios = require("axios").default;
var dados, data, hora, jogo, canal;

console.log("Bot running");

//autenticação
const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
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

function tweetHoje() {
  const csv = require("csv-parser");
  const fs = require("fs");
  const dados = [];

  fs.createReadStream("data.csv")
    .pipe(csv({ separator: "," }))
    .on("data", (data) => dados.push(data))
    .on("end", () => {
      console.log("Bot running");

      qtdTransmissoes = dados.length;
      console.log(qtdTransmissoes);

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
            " #NBA #NBAnaESPN #NBAnoStarPlus #NBAnoPrimeVideo";

          console.log(msg);

          T.post(
            "statuses/update",
            { status: msg },
            function (err, data, response) {
              console.log(data);
            }
          );
        }
      }
    });
}

tweetHoje();
