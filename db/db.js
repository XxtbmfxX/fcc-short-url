

const { MongoClient } = require('mongodb');

class Database {
  constructor() {
    if (!Database.instance) {
      this.url = process.env.DB_URL;
      this.dbName = process.env.DB_NAME;

      this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
      this.db = null;

      Database.instance = this;
    }

    return Database.instance;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName); // Utiliza this.dbName en lugar de dbName
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
    }
  }

  getDB() {
    return this.db;
  }
}

const database = new Database();

module.exports = database;
