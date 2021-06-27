const express = require('express'); // importa o módulo express para a constante express
const route = require('./route'); // importa o arquivo route.js para o express conseguir acessar as rotas definidas 
const path = require('path'); // importa módulo path para encontrar caminhos de pastas mais dacilmente

const server = express(); // cria um server com o módulo express inicializado

server.set('view engine', 'ejs'); // configura o ejs com view engine do server para conseguir executar arquivos html
server.set('views', path.join(__dirname, 'view')); // por padrão os arquivos de visualização ficam na pasta views mas nesse caso configuramos um novo path para que a rota possa ser encontrada
server.use(express.static("public")); // configura o express para usar a pasta estática public

server.use(express.urlencoded({extended: true}));
server.use(route); // determina que o express deve usar o arquivo rotas para acessar os arquivos de visualização

server.listen(5000, () => console.log("Running")); // incia o servidor por meio da porta 3000 e executa uma arrow function