/* eslint-disable camelcase */
require("dotenv").config({});

const TelegramBot = require("node-telegram-bot-api");
const api = require("./services/api");

const token = process.env.TOKEN || "ERROR_NO_TOKEN_PROVIDED";

const bot = new TelegramBot(token, {
  polling: true,
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);
  bot.sendMessage(
    chatId,
    "Bem vindo ao bot de atendimento. Começe digitando: <code>Doctor</code> ",
    {
      parse_mode: "HTML",
    }
  );
});

bot.on("message", (msg) => {
  if (msg.text.toString().toLowerCase().includes("doctor")) {
    const digits = msg.text
      .toString()
      .split(":")
      .map((str) => str.trim());

    if (digits.length === 1 && digits[0].toLowerCase() === "doctor") {
      bot.sendMessage(
        msg.chat.id,
        `Eis oque o <strong>DR</strong> pode fazer:
        <code></code>
        1 criar novo usuário: <code> /Create name:elias </code>, <code> age: 33</code>.
        2 listar os dados do usuário : <code> /index id:1 </code>.
        3 Deletar usuário: <code> /delete id:1</code>.
        4 Atualizar dados do usuário : <code> /update id:1 name:elias </code>, <code> age: 33</code>.
      `,
        {
          parse_mode: "HTML",
        }
      );
    }
  }

  // /create name=elias age=33
  // ["/create", "name=elias", "age=22"]
  if (msg.text.toString().toLowerCase().includes("create")) {
    const digits = msg.text
      .toString()
      .split(" ")
      .map((str) => str.trim());

    if (digits.length >= 2) {
      const [method, name, age] = digits;
      const langs = String(method).toLowerCase();

      console.log("Digist: " + digits);
      console.log("method: " + langs);

      if (langs.includes("/create")) {
        const separateName = String(name).trim().split("=");
        const separateAge = String(age).trim().split("=");
        const [use, nome] = separateName;
        const [use_, idade] = separateAge;
        api
          .post("/users", { name: nome, age: idade })
          .then((response) => {
            bot.sendMessage(
              msg.chat.id,
              `*state*: ${response.data.state}, *id*: ${response.data.id}`,
              {
                parse_mode: "Markdown",
              }
            );
          })
          .catch((error) => {
            bot.sendMessage(msg.chat.id, `${error.message}`, {
              parse_mode: "Markdown",
            });
            return console.log(error.message);
          });
      }
    }

    if (digits.length == 2) {
      const [method, name, age] = digits;
      const langs = String(method).toLowerCase();

      console.log("Digist: " + digits);
      console.log("method: " + langs);

      if (langs.includes("/delete")) {
        api
          .post("/users", { name: nome, age: idade })
          .then((response) => {
            bot.sendMessage(
              msg.chat.id,
              `*state*: ${response.data.state}, *id*: ${response.data.id}`,
              {
                parse_mode: "Markdown",
              }
            );
          })
          .catch((error) => {
            bot.sendMessage(msg.chat.id, `${error.message}`, {
              parse_mode: "Markdown",
            });
            return console.log(error.message);
          });
      }
    }
  }

  if (msg.text.toString().toLowerCase().includes("/delete")) {
    const digits = msg.text
      .toString()
      .split(" ")
      .map((str) => str.trim());

    const [method, serializedId] = digits;

    const separateId = String(serializedId).trim().split("=");
    const [use, id] = separateId;

    if (digits.length === 2) {
      const langs = String(method).toLowerCase();

      if (langs.includes("/delete")) {
        api
          .delete(`/users/${id}`)
          .then((response) => {
            bot.sendMessage(
              msg.chat.id,
              `*state*: ${response.data.state}, *modificações*: ${response.data.total}`,
              {
                parse_mode: "Markdown",
              }
            );
          })
          .catch((error) => {
            bot.sendMessage(msg.chat.id, `${error.message}`, {
              parse_mode: "Markdown",
            });
            return console.log(error.message);
          });
      }
    }
  }

  if (msg.text.toString().toLowerCase().includes("/index")) {
    const digits = msg.text
      .toString()
      .split(" ")
      .map((str) => str.trim());

    const [method, serializedId] = digits;

    const separateId = String(serializedId).trim().split("=");
    const [use, id] = separateId;

    if (digits.length === 2) {
      const langs = String(method).toLowerCase();

      if (langs.includes("/index")) {
        api
          .get(`/users/${id}`)
          .then((response) => {
            bot.sendMessage(
              msg.chat.id,
              `*Id*: ${response.data[0].id}, *Name*: ${response.data[0].name}, *Age*: ${response.data[0].age}`,
              {
                parse_mode: "Markdown",
              }
            );
          })
          .catch((error) => {
            bot.sendMessage(msg.chat.id, `${error.message}`, {
              parse_mode: "Markdown",
            });
            return console.log(error.message);
          });
      }
    }
  }

  if (msg.text.toString().toLowerCase().includes("/update")) {
    const digits = msg.text
      .toString()
      .split(" ")
      .map((str) => str.trim());

    if (digits.length >= 2) {
      const [method, id, name, age] = digits;
      const langs = String(method).toLowerCase();

      if (langs.includes("/update")) {
        const separateId = String(id).trim().split("=");
        const separateName = String(name).trim().split("=");
        const separateAge = String(age).trim().split("=");
        const [_use, idx] = separateId;
        const [use, nome] = separateName;
        const [use_, idade] = separateAge;
        api
          .put(`/users/${idx}`, { name: nome, age: idade })
          .then((response) => {
            bot.sendMessage(
              msg.chat.id,
              `*state*: ${response.data.state}, *id*: ${response.data.id}, *Modificações*: ${response.data.total}`,
              {
                parse_mode: "Markdown",
              }
            );
          })
          .catch((error) => {
            bot.sendMessage(msg.chat.id, `${error.message}`, {
              parse_mode: "Markdown",
            });
            return console.log(error.message);
          });
      }
    }

    if (digits.length == 2) {
      const [method, name, age] = digits;
      const langs = String(method).toLowerCase();

      console.log("Digist: " + digits);
      console.log("method: " + langs);

      if (langs.includes("/delete")) {
        api
          .post("/users", { name: nome, age: idade })
          .then((response) => {
            bot.sendMessage(
              msg.chat.id,
              `*state*: ${response.data.state}, *id*: ${response.data.id}`,
              {
                parse_mode: "Markdown",
              }
            );
          })
          .catch((error) => {
            bot.sendMessage(msg.chat.id, `${error.message}`, {
              parse_mode: "Markdown",
            });
            return console.log(error.message);
          });
      }
    }
  }

  if (msg.text.toString().toLowerCase().includes("dr.close")) {
    bot.sendMessage(msg.chat.id, "Flw! ❤❣");
    bot.closeWebHook();
  }
});
