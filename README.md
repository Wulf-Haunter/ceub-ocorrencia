Projeto de registro de ocorrência

Por ser tratar de um projeto node, o arquivo de entrada, o main/server, é o aquivo index.js que está na raiz do projeto.

Quase todas as configurações iniciais e que de fato ira caracterizar o servidor web é feito ai

Lembrando que é utilizado o EJS (https://ejs.co) como engine de manipulação de scriplets a serem embutidos nas páginas html e assim trafegar dados do cliente pro servior e de volta do cliente para o servidor.

Quanto ao banco de dados é preciso configurar a string de conexão no configuracoes.js

<b>projeto/src/configuracoes.js</b>

Mais precisamente no trecho:

<code>
// Máquina da Isabelle
//const config_banco_servidor = 'ISABELLE\\SQLEXPRESS'
// Máquina do Augusto
// const config_banco_servidor = 'DESKTOP-DUAAAQ5\\SQLEXPRESS'
// Maquina trabalho
const config_banco_servidor = '172.17.3.116\\SQLEXPRESS';

const config_banco_usuario = 'isabelle';
const config_banco_senha = 'isabelle';
const config_banco_nomebanco = 'OCODB';
</code>

Feito isso, execute os script contidos nos arquivos 

 - bancodados_scriptCriacao.sql
 - bancodados_scriptCriacao Prucedures e Funcoes.sql

image.png