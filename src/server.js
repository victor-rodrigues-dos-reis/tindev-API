const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const server =  express();  // Instancia o servidor

// Conecta com o banco no MongoBD Atlas
mongoose.connect('mongodb+srv://tindev:tindev@cluster0-k7eex.mongodb.net/tindev?retryWrites=true&w=majority', {
    useNewUrlParser: true,      // Habilita a utilização do novo "URL string parser"
    useUnifiedTopology: true,   // Habilita a utilização do novo "Server Discover" e "Monitoring engine"
});

server.use(express.json()); // Habilita compreensão de conteúdos tipo JSON
server.use(routes);         // Utiliza as rotas cridas

server.listen(3333);        // Escutar as requisições na porta 3333