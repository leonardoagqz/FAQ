const sqlite3 = require("sqlite3");
const { open } = require("sqlite")

module.exports = () => 
    open({
        filename: './src/db/banco.sqlite', //caminho banco de dados
        driver: sqlite3.Database,
    });