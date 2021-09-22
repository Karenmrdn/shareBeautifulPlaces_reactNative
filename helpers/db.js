import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

const createSqlPromise = (sqlQuery, argumentsArr = []) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sqlQuery,
        argumentsArr,
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const init = () => {
  const promise = createSqlPromise(
    "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);"
  );

  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = createSqlPromise(
    "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)",
    [title, imageUri, address, lat, lng]
  );

  return promise;
};

export const fetchPlaces = () => {
  const promise = createSqlPromise("SELECT * FROM places");

  return promise;
};
