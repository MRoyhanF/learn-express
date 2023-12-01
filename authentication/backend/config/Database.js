import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'root', '',{
    host: "locathost",
    dialect: "mysql"
});

export default db;