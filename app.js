const app = require('./config/express')();

const porta = 3000;

app.listen(porta, function() {
    console.log(`Servidor executando na porta ${porta}`);
});