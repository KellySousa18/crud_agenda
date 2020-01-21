
class ContatoRepository {
    
    constructor(conexao) {
       this._conexao = conexao;
    }

    porTelefone(telefone, callback ) {
        this._conexao.query(`select * from contato where telefone = ${telefone}`, callback);
    }


    todos(callback ) {
        this._conexao.query('select * from contato', callback);
    }

   
    salva(contato, callback) {

        if ( (contato.hasOwnProperty('id')) && (contato.nome > 0) ) {
               this._conexao.query('update contato set ? where telefone = ' + contato.telefone, contato, callback);

        } else {
            this._conexao.query('insert into contato set ?', contato, callback);
        }    
    }

    remove(contato, callback) {
        this._conexao.query('delete from contato where telefone = ' + contato.telefone, callback);
    }

} 

module.exports = () => { return ContatoRepository };