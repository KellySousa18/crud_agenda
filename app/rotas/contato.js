module.exports = function(app) {
  app.get("/contato", function(req, resp) {
    let conexao = new app.infra.ConnectionFactory().getConexao();
    let contato = new app.repositorio.ContatoRepository(conexao);

    contato.todos(function(erros, resultado) {
      if (erros) {
        console.log(erros);
      }
      resp.render("contato/listagem", { lista: resultado });
    });
    conexao.end();
  });

  app.get("/contato/form", function(req, resp) {
    resp.render("contato/form-cadastro", { errosValidacao: null, contato: {} });
  });

  app.post("/contato", function(req, resp) {
    let contato = req.body;
    console.log(contato);

    req.assert("nome", "Nome do contato é obrigatório.").notEmpty();
    req.assert("telefone", "Telefone do contato é obrigatório.").notEmpty();
    req.assert("operadora", "Operadora do contato é obrigatório.").notEmpty();

    let erros = req.validationErrors();

    if (erros) {
      resp.render("contato/form-cadastro", {
        errosValidacao: erros,
        contato: contato
      });
      return;
    }

    let conexao = new app.infra.ConnectionFactory().getConexao();
    let contatos = new app.repositorio.ContatoRepository(conexao);
    console.log('salva: ', contato );
    contatos.salva(contato, function(erros, resultados) {
      resp.redirect("/contato");
    });

    conexao.end();
  });

  app.post("/contato/remove/(:telefone)", function(req, resp) {
    let contato = {
      telefone: req.params.telefone
    };

    let conexao = new app.infra.ConnectionFactory().getConexao();
    let contatos = new app.repositorio.ContatoRepository(conexao);

    contatos.remove(contato, function(erros, resultados) {
      resp.redirect("/contato");
    });
  });

  app.get("/contato/edita/(:telefone)", function(req, resp) {
    let conexao = new app.infra.ConnectionFactory().getConexao();
    let contato = new app.repositorio.ContatoRepository(conexao);

    contato.porTelefone(req.params.telefone, function(erros, resultado) {
      if (erros) {
        console.log(erros);
      }
      resp.render("contato/form-cadastro", {
        errosValidacao: erros,
        contato: {
          nome: resultado[0].nome,
          telefone: resultado[0].telefone,
          operadora: resultado[0].operadora
        }
      });
      console.log({ resultado });
    });
    conexao.end();
  });
};
