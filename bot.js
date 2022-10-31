//dependências
require('dotenv').config();
const Twit = require('twit');
const axios = require('axios').default;
var dados, data, hora, jogo, canal

console.log("Bot running")

//autenticação
const T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

//cálculo do dia de hoje
function getToday(){
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

return today
}

//entradas de dados
dados = ['18/10/2022','Philadelphia 76ers x Boston Celtics','Amazon Prime Video','20h30',
'19/10/2022','New York Knicks x Memphis Grizzlies','ESPN 2','20h30',
'20/10/2022','Milwaukee Bucks x Philadelphia 76ers','Amazon Prime Video','20h30',
'21/10/2022','Boston Celtics x Miami Heat','ESPN 2','20h30',
'22/10/2022','Memphis Grizzlies x Dallas Mavericks','ESPN 2','21h30',
'23/10/2022','Phoenix Suns x Los Angeles Clippers','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h',
'24/10/2022','Denver Nuggets x Portland Trail Blazers','Band / TNT / SporTV 2/ Gaules / Facebook da CNN Brasil','23h',
'25/10/2022','Dallas Mavericks x New Orleans Pelicans','Amazon Prime Video','20h30',
'26/10/2022','Brooklyn Nets x Milwaukee Bucks','ESPN 2','20h30',
'28/10/2022','Indiana Pacers x Washington Wizards','ESPN 2','20h30',
'29/10/2022','Memphis Grizzlies x Utah Jazz','ESPN 2','22h',
'30/10/2022','Denver Nuggets x Los Angeles Lakers','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','22h30',
'31/10/2022','Houston Rockets x Los Angeles Clippers','Band / TNT / SporTV 2/ Gaules / Facebook da CNN Brasil','23h30',
'01/11/2022','Orlando Magic x Oklahoma City Thunder','Amazon Prime Video','20h30',
'02/11/2022','Boston Celtics x Cleveland Cavaliers','ESPN 2','20h30',
'04/11/2022','Chicago Bulls x Boston Celtics','ESPN 2','20h30',
'05/11/2022','Boston Celtics x New York Knicks','ESPN 2','20h30',
'06/11/2022','Cleveland Cavaliers x Los Angeles Lakers','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','17h30',
'07/11/2022','Sacramento Kings x Golden State Warriors','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h',
'09/11/2022','New York Knicks x Brooklyn Nets','ESPN 2','21h30',
'10/11/2022','Philadelphia 76ers x Atlanta Hawks','Amazon Prime Video','21h30',
'11/11/2022','Minnesota Timberwolves x Memphis Grizzlies','ESPN 2','23h30',
'12/11/2022','Atlanta Hawks x Philadelphia 76ers','ESPN 2','21h30',
'13/11/2022','Brooklyn Nets x Los Angeles Lakers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h30',
'14/11/2022','San Antonio Spurs x Golden State Warriors','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h',
'15/11/2022','Memphis Grizzlies x New Orleans Pelicans','Amazon Prime Video','21h30',
'16/11/2022','Boston Celtics x Atlanta Hawks','ESPN 2','21h30',
'18/11/2022','Milwaukee Bucks x Philadelphia 76ers','ESPN 2','21h30',
'19/11/2022','Utah Jazz x Portland Trail Blazers','ESPN 2','0h',
'21/11/2022','Utah Jazz x Los Angeles Clippers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h30',
'22/11/2022','Brooklyn Nets x Philadelphia 76ers','Amazon Prime Video','21h30',
'23/11/2022','Dallas Mavericks x Boston Celtics','ESPN 2','21h30',
'25/11/2022','Utah Jazz x Golden State Warriors','ESPN 2','0h',
'26/11/2022','Los Angeles Lakers x San Antonio Spurs','ESPN 2','22h',
'27/11/2022','Dallas Mavericks x Milwaukee Bucks','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','22h',
'28/11/2022','Indiana Pacers x Los Angeles Lakers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h30',
'29/11/2022','Golden State Warriors x Dallas Mavericks','Amazon Prime Video','21h30',
'30/11/2022','Chicago Bulls x Phoenix Suns','ESPN 2','23h',
'02/12/2022','Los Angeles Lakers x Milwaukee Bucks','ESPN 2','21h30',
'03/12/2022','Milwaukee Bucks x Charlotte Hornets','ESPN 2','20h',
'04/12/2022','Boston Celtics x Brooklyn Nets','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','20h',
'05/12/2022','Phoenix Suns x Dallas Mavericks','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','22h30',
'06/12/2022','Los Angeles Lakers x Cleveland Cavaliers','Amazon Prime Video','21h30',
'07/12/2022','Atlanta Hawks x New York Knicks','ESPN 2','21h30',
'09/12/2022','Los Angeles Lakers x Philadelphia 76ers','ESPN 2','21h30',
'10/12/2022','Boston Celtics x Golden State Warriors','ESPN 2','22h30',
'12/12/2022','Boston Celtics x Los Angeles Clippers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h30',
'13/12/2022','Golden State Warriors x Milwaukee Bucks','Amazon Prime Video','21h30',
'14/12/2022','New York Knicks x Chicago Bulls','ESPN 2','21h30',
'16/12/2022','Golden State Warriors x Philadelphia 76ers','ESPN 2','21h30',
'17/12/2022','Miami Heat x San Antonio Spurs','ESPN 2','19h',
'18/12/2022','Washington Wizards x Los Angeles Lakers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h30',
'19/12/2022','Los Angeles Lakers x Phoenix Suns','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h',
'20/12/2022','Golden State Warriors x New York Knicks','Amazon Prime Video','21h30',
'21/12/2022','Golden State Warriors x Brooklyn Nets','ESPN 2','21h30',
'23/12/2022','Memphis Grizzlies x Phoenix Suns','ESPN 2','0h',
'25/12/2022','Philadelphia 76ers x New York Knicks','ESPN 2','14h',
'26/12/2022','Charlotte Hornets x Portland Trail Blazers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h',
'27/12/2022','Los Angeles Clippers x Toronto Raptors','Amazon Prime Video','21h30',
'28/12/2022','Los Angeles Lakers x Miami Heat','ESPN 2','21h30',
'30/12/2022','Miami Heat x Denver Nuggets','ESPN 2','23h',
'01/01/2023','Boston Celtics x Denver Nuggets','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','22h',
'02/01/2023','Atlanta Hawks x Golden State Warriors','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h30',
'03/01/2023','Washington Wizards x Milwaukee Bucks','Amazon Prime Video','22h',
'04/01/2023','Milwaukee Bucks x Toronto Raptors','ESPN 2','21h30',
'05/01/2023','Boston Celtics x Dallas Mavericks','Amazon Prime Video','21h30',
'06/01/2023','Chicago Bulls x Philadelphia 76ers','ESPN 2','21h30',
'07/01/2023','New Orleans Pelicans x Dallas Mavericks','Amazon Prime Video','22h',
'08/01/2023','Atlanta Hawks x Los Angeles Clippers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h',
'09/01/2023','Los Angeles Lakers x Denver Nuggets','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h',
'10/01/2023','Detroit Pistons x Philadelphia 76ers','Amazon Prime Video','21h30',
'11/01/2023','Milwaukee Bucks x Atlanta Hawks','ESPN 2','21h30',
'12/01/2023','Boston Celtics x Brooklyn Nets','Amazon Prime Video','21h30',
'13/01/2023','Golden State Warriors x San Antonio Spurs','ESPN 2','21h30',
'14/01/2023','Milwaukee Bucks x Miami Heat','ESPN 2','15h',
'15/01/2023','Philadelphia 76ers x Los Angeles Lakers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h30',
'16/01/2023','Houston Rockets x Los Angeles Lakers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h30',
'17/01/2023','Toronto Raptors x Milwaukee Bucks','Amazon Prime Video','21h30',
'18/01/2023','Atlanta Hawks x Dallas Mavericks','ESPN 2','21h30',
'19/01/2023','Golden State Warriors x Boston Celtics','Amazon Prime Video','21h30',
'20/01/2023','Miami Heat x Dallas Mavericks','ESPN 2','21h30',
'21/01/2023','Milwaukee Bucks x Cleveland Cavaliers','Amazon Prime Video','21h30',
'22/01/2023','Brooklyn Nets x Golden State Warriors','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','22h30',
'23/01/2023','Charlotte Hornets x Utah Jazz','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h',
'24/01/2023','Boston Celtics x Miami Heat','Amazon Prime Video','21h30',
'25/01/2023','Brooklyn Nets x Philadelphia 76ers','ESPN 2','21h30',
'26/01/2023','Chicago Bulls x Charlotte Hornets','Amazon Prime Video','21h30',
'27/01/2023','Memphis Grizzlies x Minnesota Timberwolves','ESPN 2','21h30',
'28/01/2023','Denver Nuggets x Philadelphia 76ers','ESPN 2','17h',
'30/01/2023','Toronto Raptors x Phoenix Suns','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h',
'31/01/2023','Los Angeles Lakers x New York Knicks','Amazon Prime Video','21h30',
'01/02/2023','Brooklyn Nets x Boston Celtics','ESPN 2','21h30',
'02/02/2023','Memphis Grizzlies x Cleveland Cavaliers','Amazon Prime Video','21h30',
'04/02/2023','Los Angeles Clippers x New York Knicks','Amazon Prime Video','21h',
'05/02/2023','Philadelphia 76ers x New York Knicks','ESPN 2','20h',
'06/02/2023','Milwaukee Bucks x Portland Trail Blazers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h',
'07/02/2023','Atlanta Hawks x New Orleans Pelicans','Amazon Prime Video','21h30',
'08/02/2023','Philadelphia 76ers x Boston Celtics','ESPN 2','21h30',
'09/02/2023','Chicago Bulls x Brooklyn Nets','Amazon Prime Video','21h30',
'10/02/2023','Charlotte Hornets x Boston Celtics','ESPN 2','21h30',
'11/02/2023','Chicago Bulls x Cleveland Cavaliers','Amazon Prime Video','22h',
'12/02/2023','Memphis Grizzlies x Boston Celtics','ESPN 2','16h',
'13/02/2023','Washington Wizards x Golden State Warriors','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','0h',
'14/02/2023','Boston Celtics x Milwaukee Bucks','Amazon Prime Video','21h30',
'15/02/2023','Miami Heat x Brooklyn Nets','ESPN 2','21h30',
'16/02/2023','Milwaukee Bucks x Chicago Bulls','Amazon Prime Video','21h30',
'23/02/2023','Memphis Grizzlies x Philadelphia 76ers','Amazon Prime Video','21h30',
'24/02/2023','Miami Heat x Milwaukee Bucks','ESPN 2','21h30',
'25/02/2023','Denver Nuggets x Memphis Grizzlies','Amazon Prime Video','22h',
'26/02/2023','Phoenix Suns x Milwaukee Bucks','ESPN 2','15h',
'28/02/2023','Washington Wizards x Atlanta Hawks','Amazon Prime Video','21h30',
'01/03/2023','Cleveland Cavaliers x Boston Celtics','ESPN 2','21h30',
'02/03/2023','Philadelphia 76ers x Dallas Mavericks','Amazon Prime Video','21h30',
'03/03/2023','Brooklyn Nets x Boston Celtics','ESPN 2','21h30',
'04/03/2023','Atlanta Hawks x Miami Heat','Amazon Prime Video','22h',
'05/03/2023','Phoenix Suns x Dallas Mavericks','ESPN 2','15h',
'06/03/2023','Toronto Raptors x Denver Nuggets','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h',
'07/03/2023','Philadelphia 76ers x Minnesota Timberwolves','Amazon Prime Video','21h30',
'08/03/2023','Dallas Mavericks x New Orleans Pelicans','ESPN 2','21h30',
'09/03/2023','Brooklyn Nets x Milwaukee Bucks','Amazon Prime Video','21h30',
'10/03/2023','Toronto Raptors x Los Angeles Lakers','ESPN 2','0h30',
'11/03/2023','Dallas Mavericks x Memphis Grizzlies','Amazon Prime Video','22h',
'12/03/2023','New York Knicks x Los Angeles Lakers','ESPN 2','22h',
'13/03/2023','Memphis Grizzlies x Dallas Mavericks','ESPN 2','20h30',
'14/03/2023','Denver Nuggets x Toronto Raptors','Amazon Prime Video','20h30',
'15/03/2023','Philadelphia 76ers x Cleveland Cavaliers','ESPN 2','20h30',
'16/03/2023','Denver Nuggets x Detroit Pistons','Amazon Prime Video','20h',
'17/03/2023','Dallas Mavericks x Los Angeles Lakers','ESPN 2','23h30',
'18/03/2023','Golden State Warriors x Memphis Grizzlies','Amazon Prime Video','21h',
'19/03/2023','Orlando Magic x Los Angeles Lakers','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','22h30',
'21/03/2023','Cleveland Cavaliers x Brooklyn Nets','Amazon Prime Video','20h30',
'22/03/2023','Golden State Warriors x Dallas Mavericks','ESPN 2','20h30',
'23/03/2023','New York Knicks x Orlando Magic','Amazon Prime Video','20h',
'24/03/2023','Philadelphia 76ers x Golden State Warriors','ESPN 2','23h',
'25/03/2023','Brooklyn Nets x Miami Heat','Amazon Prime Video','21h',
'26/03/2023','Minnesota Timberwolves x Golden State Warriors','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','21h30',
'27/03/2023','Chicago Bulls x Los Angeles Clippers','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h30',
'28/03/2023','Miami Heat x Toronto Raptors','Amazon Prime Video','20h30',
'29/03/2023','Dallas Mavericks x Philadelphia 76ers','ESPN 2','20h30',
'30/03/2023','Boston Celtics x Milwaukee Bucks','Amazon Prime Video','20h30',
'31/03/2023','Los Angeles Clippers x Memphis Grizzlies','ESPN 2','21h',
'01/04/2023','Dallas Mavericks x Miami Heat','ESPN 2','20h30',
'02/04/2023','Philadelphia 76ers x Milwaukee Bucks','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','21h',
'04/04/2023','Boston Celtics x Philadelphia 76ers','Amazon Prime Video','21h',
'05/04/2023','Chicago Bulls x Milwaukee Bucks','ESPN 2','20h30',
'06/04/2023','Miami Heat x Philadelphia 76ers','Amazon Prime Video','20h30',
'07/04/2023','Phoenix Suns x Los Angeles Lakers','ESPN 2','23h30',
'08/04/2023','Denver Nuggets x Utah Jazz','ESPN 2','16h30',
'09/04/2023','Golden State Warriors x Portland Trail Blazers','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','16h30',
'18/10/2022','Los Angeles Lakers x Golden State Warriors','Amazon Prime Video','23h',
'19/10/2022','Dallas Mavericks x Phoenix Suns','ESPN 2','23h',
'20/10/2022','Los Angeles Clippers x Los Angeles Lakers','Amazon Prime Video','23h',
'21/10/2022','Denver Nuggets x Golden State Warriors','ESPN 2','23h',
'25/10/2022','Golden State Warriors x Phoenix Suns','Amazon Prime Video','23h',
'26/10/2022','Los Angeles Lakers x Denver Nuggets','ESPN 2','23h',
'28/10/2022','New Orleans Pelicans x Phoenix Suns','ESPN 2','23h',
'01/11/2022','Minnesota Timberwolves x Phoenix Suns','Amazon Prime Video','23h',
'02/11/2022','Memphis Grizzlies x Portland Trail Blazers','ESPN 2','23h',
'04/11/2022','Milwaukee Bucks x Minnesota Timberwolves','ESPN 2','23h',
'09/11/2022','Los Angeles Lakers x Los Angeles Clippers','ESPN 2','0h',
'15/11/2022','New York Knicks x Utah Jazz','Amazon Prime Video','0h',
'16/11/2022','Golden State Warriors x Phoenix Suns','ESPN 2','0h',
'18/11/2022','New York Knicks x Golden State Warriors','ESPN 2','0h',
'22/11/2022','Los Angeles Lakers x Phoenix Suns','Amazon Prime Video','0h',
'23/11/2022','Los Angeles Clippers x Golden State Warriors','ESPN 2','0h',
'29/11/2022','Los Angeles Clippers x Portland Trail Blazers','Amazon Prime Video','0h',
'02/12/2022','Chicago Bulls x Golden State Warriors','ESPN 2','0h',
'06/12/2022','Dallas Mavericks x Denver Nuggets','Amazon Prime Video','0h',
'07/12/2022','Boston Celtics x Phoenix Suns','ESPN 2','0h',
'09/12/2022','Milwaukee Bucks x Dallas Mavericks','ESPN 2','0h',
'13/12/2022','Boston Celtics x Los Angeles Lakers','Amazon Prime Video','0h',
'14/12/2022','Minnesota Timberwolves x Los Angeles Clippers','ESPN 2','0h',
'16/12/2022','Denver Nuggets x Los Angeles Lakers','ESPN 2','0h',
'20/12/2022','Memphis Grizzlies x Denver Nuggets','Amazon Prime Video','0h',
'25/12/2022','Los Angeles Lakers x Dallas Mavericks','ESPN 2','16h30',
'27/12/2022','Charlote Hornets x Golden State Warriors','Amazon Prime Video','0h',
'04/01/2023','Miami Heat x Los Angeles Lakers','ESPN 2','0h',
'05/01/2023','Los Angeles Clippers x Denver Nuggets','Amazon Prime Video','0h',
'06/01/2023','Miami Heat x Phoenix Suns','ESPN 2','0h',
'07/01/2023','Orlando Magic x Golden State Warriors','ESPN 2','22h30',
'11/01/2023','Houston Rockets x Sacramento Kings','ESPN 2','0h',
'13/01/2023','Denver Nuggets x Los Angeles Clippers','ESPN 2','0h',
'14/01/2023','Boston Celtics x Charlotte Hornets','Amazon Prime Video','21h',
'17/01/2023','Philadelphia 76ers x Los Angeles Clippers','Amazon Prime Video','0h',
'18/01/2023','Minnesota Timberwolves x Denver Nuggets','ESPN 2','0h',
'19/01/2023','Brooklyn Nets x Phoenix Suns','Amazon Prime Video','0h',
'20/01/2023','Memphis Grizzlies x Los Angeles Lakers','ESPN 2','0h',
'24/01/2023','Los Angeles Clippers x Los Angeles Lakers','Amazon Prime Video','0h',
'25/01/2023','Memphis Grizzlies x Golden State Warriors','ESPN 2','0h',
'26/01/2023','Dallas Mavericks x Phoenix Suns','Amazon Prime Video','0h',
'28/01/2023','New York Knicks x Brooklyn Nets','ESPN 2','19h30',
'31/01/2023','New Orleans Pelicans x Denver Nuggets','Amazon Prime Video','0h',
'01/02/2023','Atlanta Hawks x Phoenix Suns','ESPN 2','0h',
'02/02/2023','Los Angeles Clippers x Milwaukee Bucks','Amazon Prime Video','0h',
'04/02/2023','Dallas Mavericks x Golden State Warriors','ESPN 2','22h30',
'05/02/2023','Denver Nuggets x Minnesota Timberwolves','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','21h',
'07/02/2023','Minnesota Timberwolves x Denver Nuggets','Amazon Prime Video','0h',
'08/02/2023','Dallas Mavericks x Los Angeles Clippers','ESPN 2','0h',
'09/02/2023','Milwaukee Bucks x Los Angeles Lakers','Amazon Prime Video','0h',
'10/02/2023','Cleveland Cavaliers x New Orleans Pelicans','ESPN 2','0h',
'11/02/2023','Los Angeles Lakers x Golden State Warriors','ESPN 2','22h30',
'14/02/2023','Golden State Warriors x Los Angeles Clippers','Amazon Prime Video','0h',
'15/02/2023','New Orleans Pelicans x Los Angeles Lakers','ESPN 2','0h',
'16/02/2023','Los Angeles Clippers x Phoenix Suns','Amazon Prime Video','0h',
'23/02/2023','Golden State Warriors x Los Angeles Lakers','Amazon Prime Video','0h',
'24/02/2023','Brooklyn Nets x Chicago Bulls','ESPN 2','0h',
'25/02/2023','Boston Celtics x Philadelphia 76ers','ESPN 2','22h30',
'26/02/2023','Los Angeles Lakers x Dallas Mavericks','ESPN 2','17h30',
'28/02/2023','Minnesota Timberwolves x Los Angeles Clippers','Amazon Prime Video','0h',
'01/03/2023','New Orleans Pelicans x Portland Trail Blazers','ESPN 2','0h',
'02/03/2023','Los Angeles Clippers x Golden State Warriors','Amazon Prime Video','0h',
'03/03/2023','Memphis Grizzlies x Denver Nuggets','ESPN 2','0h',
'04/03/2023','Philadelphia 76ers x Milwaukee Bucks','ESPN 2','22h30',
'05/03/2023','Golden State Warriors x Los Angeles Lakers','ESPN 2','17h30',
'07/03/2023','Memphis Grizzlies x Los Angeles Lakers','Amazon Prime Video','0h',
'08/03/2023','Toronto Raptors x Los Angeles Clippers','ESPN 2','0h',
'09/03/2023','Golden State Warriors x Memphis Grizzlies','Amazon Prime Video','0h',
'11/03/2023','Milwaukee Bucks x Golden State Warriors','ESPN 2','22h30',
'13/03/2023','Phoenix Suns x Golden State Warriors','ESPN 2','23h',
'14/03/2023','Milwaukee Bucks x Phoenix Suns','Amazon Prime Video','23h',
'15/03/2023','Golden State Warriors x Los Angeles Clippers','ESPN 2','23h',
'16/03/2023','Orlando Magic x Phoenix Suns','Amazon Prime Video','23h',
'21/03/2023','Boston Celtics x Sacramento Kings','Amazon Prime Video','23h',
'22/03/2023','Phoenix Suns x Los Angeles Lakers','ESPN 2','23h',
'23/03/2023','Oklahoma City Thunder x Los Angeles Clippers','Amazon Prime Video','23h30',
'25/03/2023','Milwaukee Bucks x Denver Nuggets','ESPN 2','22h',
'28/03/2023','New Orleans Pelicans x Golden State Warriors','Amazon Prime Video','23h',
'29/03/2023','Minnesota Timberwolves x Phoenix Suns','ESPN 2','23h',
'30/03/2023','New Orleans Pelicans x Denver Nuggets','Amazon Prime Video','23h',
'01/04/2023','Los Angeles Clippers x New Orleans Pelicans','Amazon Prime Video','21h30',
'05/04/2023','Los Angeles Lakers x Los Angeles Clippers','ESPN 2','23h',
'06/04/2023','Denver Nuggets x Phoenix Suns','Amazon Prime Video','23h',
'08/04/2023','Portland Trail Blazers x Los Angeles Clippers','Amazon Prime Video','17h',
'25/12/2022','Milwaukee Bucks x Boston Celtics','ESPN 2','19h',
'28/01/2023','Los Angeles Clippers x Atlanta Hawks','Amazon Prime Video','21h30',
'26/02/2023','Minnesota Timberwolves x Golden State Warriors','ESPN 2','21h30',
'05/03/2023','Charlotte Hornets x Brooklyn Nets','TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','20h',
'13/03/2023','Milwaukee Bucks x Sacramento Kings','Band / TNT / SporTV 2 / Gaules / Facebook da CNN Brasil','23h',
'25/12/2022','Memphis Grizzlies x Golden State Warriors','ESPN 2','22h',
'28/01/2023','Los Angeles Lakers x Boston Celtics','ESPN 2','22h30',
'26/02/2023','Los Angeles Clippers x Denver Nuggets','ESPN 2','0h',
'05/03/2023','New York Knicks x Boston Celtics','ESPN 2','21h30',
'25/12/2022','Phoenix Suns x Denver Nuggets','ESPN 2','0h30',
'05/03/2023','Memphis Grizzlies x Los Angeles Clippers','ESPN 2','0h',
]

function checkTransmissao(){
for (var i = 0;  ; i += 4){
  data = dados[i]
  if ( typeof data === "undefined") break

if (data == getToday()){
  hora = dados[i+1]
  jogo = dados[i+2]
  canal = dados[i+3]
  var msg = "Transmissão de " + getToday() + ": " + hora + " | " + jogo + " | " + canal + "#NBA #NBAnaESPN #NBAnoPrimeVideo #NBAnaBand #NBAnaTNTSports #NBAnoGaules #NBAnoSporTV"

console.log(msg)

T.post('statuses/update', { status: msg }, function(err, data, response) { console.log(data) })

}}}

checkTransmissao();
setInterval(checkTransmissao, 24 * 60 * 60 *1000);
