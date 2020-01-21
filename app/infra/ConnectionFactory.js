let mysql = require("mysql");

class ConnectionFactory {
  constructor() {
    this._conexao = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "crud_agenda"
    });
  }

  getConexao() {
    return this._conexao;
  }
}

module.exports = () => {
  return ConnectionFactory;
};
