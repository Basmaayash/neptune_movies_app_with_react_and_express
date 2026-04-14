import db from './db.js';

export const movieRepository = {

    // Load all movies (from memory or file)
    async getAll() {
        if (db.movies.length === 0) await db.read(); // load if memory is empty
        return db.movies;
    },
    
    // Get a movie by ID
    async getById(id) {
        if (db.movies.length === 0) await db.read();
        return db.movies.find(m => m.id === id) || null;
    },

    // Create a new movie
    async create(movie) {
        if (db.movies.length === 0) await db.read();
        db.movies.push(movie);      // add to memory
        await db.write();           // persist
        return movie;
    },

    // Update a movie by ID
    async update(id, data) {
        if (db.movies.length === 0) await db.read();
        const index = db.movies.findIndex(m => m.id === id);
        if (index === -1) return null; // not found
        const old_data = db.movies[index];
        db.movies[index] = { ...old_data, ...data }; // new data object overwrite the old
        await db.write(); // save changes
        return db.movies[index];
    },

    // Delete a movie by ID
    async delete(id) {
        if (db.movies.length === 0) await db.read();
        const index = db.movies.findIndex(m => m.id === id);
        if (index === -1) return null; 
        const deleted = db.movies.splice(index, 1)[0];
        await db.write();
        return deleted;
    },

    async getLastId() {
        if (db.meta.length === 0) {
            await db.readMeta();
        }

        return db.meta.last_id ?? 0;
    },

    async getNextId() {
        if (db.meta.length === 0) await db.readMeta();
        const nextId = (db.meta.last_id ?? 0) + 1;
        db.meta.last_id = nextId;
        await db.writeMeta();

        return nextId;
    },
};

export const externalDataRepository = {

  // get all external data
  async getAllExternalData() {
    if (db.externalData.length === 0) {
      await db.readExternalData();
    }
    return db.externalData;
  },

  // update full dataset
  async updateExternalData(array) {
    if (!Array.isArray(array)) {
      throw new Error('External data must be an array');
    }

    db.externalData = array;
    await db.writeExternalData();

    return db.externalData;
  },

  // get single record by imdb_id
  async getDataByImdbID(imdb_id) {
    if (!db.externalData.length) {
      await db.readExternalData();
    }

    return (
      db.externalData.find(item => item.imdb_id === imdb_id) || null
    );
  },

  // upsert (create or update)
  async upsertByImdbID(newItem) {
    if (!db.externalData.length) {
      await db.readExternalData();
    }

    const index = db.externalData.findIndex(
      item => item.imdb_id === newItem.imdb_id
    );

    if (index === -1) {
      db.externalData.push(newItem);
    } else {
      db.externalData[index] = {
        ...db.externalData[index],
        ...newItem
      };
    }

    await db.writeExternalData();

    return newItem;
  },

  // delete by imdb_id
  async deleteByImdbID(imdb_id) {
    if (!db.externalData.length) {
      await db.readExternalData();
    }

    const before = db.externalData.length;

    db.externalData = db.externalData.filter(
      item => item.imdb_id !== imdb_id
    );

    if (db.externalData.length === before) {
      return null; // not found
    }

    await db.writeExternalData();

    return true;
  }
};