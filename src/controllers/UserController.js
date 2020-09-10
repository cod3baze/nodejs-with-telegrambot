const Connection = require("../database/index");

module.exports = {
  // pega todos os usuários
  async index(_, response) {
    const mysql = "SELECT * FROM users";

    Connection.query(mysql, (err, rows, filds) => {
      if (err) {
        console.error({ error: err.message });
        return response.status(400).json({ error: err.message });
      }

      return response.json(rows);
    });
  },

  // criar novo usuário
  async store(request, response) {
    const { name, age } = request.body;

    if (!name || !age) {
      return response
        .status(400)
        .json({ error: "preencha com informações corretas" });
    }

    try {
      const mysql = "INSERT INTO users() values (default, ?, ?)";
      Connection.query(mysql, [name, age], (err, rows, filds) => {
        if (err) {
          console.error({ error: err.message });
          return response.status(400).json({ error: err.message });
        }

        return response.json({ state: "Usuário criado", id: rows.insertId });
      });
    } catch (err) {
      console.error({ error: err.message });
      return response.status(400).json({ error: err.message });
    }
  },

  // editar usuário
  async update(request, response) {
    const { name, age } = request.body;
    const { id } = request.params;

    if (!name || !age || !id) {
      return response
        .status(400)
        .json({ error: "preencha com informações corretas" });
    }

    try {
      const mysql = `UPDATE users SET name='${name}', age='${age}' WHERE id='${id}'`;
      Connection.query(mysql, (err, rows, filds) => {
        if (err) {
          console.error({ error: err.message });
          return response.status(400).json({ error: err.message });
        }

        return response.json({
          id,
          state: "Usuário atualizado",
          total: rows.affectedRows,
        });
      });
    } catch (err) {
      console.error({ error: err.message });
      return response.status(400).json({ error: err.message });
    }
  },

  // excluir usuário
  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ error: "preencha com informações corretas" });
    }

    try {
      const mysql = `DELETE FROM users WHERE id='${id}'`;
      Connection.query(mysql, (err, rows, filds) => {
        if (err) {
          console.error({ error: err.message });
          return response.status(400).json({ error: err.message });
        }

        return response.json({
          id,
          state: "Usuário Deletado",
          total: rows.affectedRows,
        });
      });
    } catch (err) {
      console.error({ error: err.message });
      return response.status(400).json({ error: err.message });
    }
  },

  // pegar dados de 1 único usuário
  async one(request, response) {
    const { id } = request.params;

    try {
      const mysql = `SELECT * FROM users WHERE id=${id}`;

      Connection.query(mysql, (err, rows, filds) => {
        if (err) {
          console.error({ error: err.message });
          return response.status(400).json({ error: err.message });
        }

        return response.json(rows);
      });
    } catch (err) {
      console.error({ error: err.message });
      return response.status(400).json({ error: err.message });
    }
  },
};
