'use strict';

import { promises as fs } from 'fs';

const veryTinyDB = {};

veryTinyDB.insert = async (filename, content) => {
  try {
    const data = await readFile(filename);
    const { key, value } = content;
    data[key] = value;
    await writeFile(filename, data);
  } catch (error) {
    console.error(error);
  }
};
veryTinyDB.remove = async (filename, key) => {
  try {
    const data = await readFile(filename);
    delete data[key];
    await writeFile(filename, data);
  } catch (error) {
    console.error(error);
  }
};
veryTinyDB.get = async (filename, key) => {
  try {
    const data = await readFile(filename);
    return data[key];
  } catch (error) {
    console.error(error);
  }
};

async function readFile(filename) {
  const data = await fs.readFile(filename, 'utf-8');
  if (!data) { throw 'readFileError'; }
  return JSON.parse(data);
}

async function writeFile(filename, data) {
  await fs.writeFile(filename, JSON.stringify(data));
}

export default veryTinyDB;

const vtb = veryTinyDB;
await vtb.remove('myDB.json', 'a');