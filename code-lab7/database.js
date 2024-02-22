// database.js
import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('moment.db');

export function init() {
  database.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS moments (
        id INTEGER PRIMARY KEY NOT NULL,
        qoute TEXT NOT NULL,
        imageUri TEXT NOT NULL
      );`,
      [],
      () => {
        console.log('Table Created');
      },
      (error) => {
        console.error(error);
      }
    );
  });
}

export function insertMoment(qoute, imageUri) {
  database.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO moments (qoute, imageUri) VALUES (?, ?)',
      [qoute, imageUri],
      () => console.log('Data saved successfully'),
      (error) => {
        console.error(error);
      }
    );
  });
}

export function fetchMoment(callbackData) {
  database.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM moments',
      [],
      (_, { rows }) => {
        if (rows.length > 0) {
          const { id, qoute, imageUri } = rows.item(0);
          callbackData({ id, qoute, imageUri });
        } else {
          callbackData(null);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  });
}

export function dropTable() {
  database.transaction((tx) => {
    tx.executeSql(
      'DROP TABLE IF EXISTS moments;',
      [],
      () => {
        console.log('Table Dropped');
      },
      (_, error) => {
        console.error(error);
      }
    );
  });
}
