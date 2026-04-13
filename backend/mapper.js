
// changes from db and dto 
const arrayFields = [
  'genres',
  'production_companies',
  'production_countries',
  'spoken_languages',
  'keywords'
];

// map between dto and (entity and db)
const dtoToDbMap = {
  rating: 'vote_average',
  year: 'release_date',
  description: 'overview',
  title: 'title',
  vote_count: 'vote_count',
  status: 'status',
  revenue: 'revenue',
  runtime: 'runtime',
  adult: 'adult',
  budget: 'budget',
  imdb_id: 'imdb_id',
  original_language: 'original_language',
  original_title: 'original_title',
  popularity: 'popularity',
  tagline: 'tagline',
  genres: 'genres',
  production_companies: 'production_companies',
  production_countries: 'production_countries',
  spoken_languages: 'spoken_languages',
  keywords: 'keywords'
};

const dbToDtoMap = Object.fromEntries(
  Object.entries(dtoToDbMap).map(([dtoKey, dbKey]) => [dbKey, dtoKey])
);


export class DTOMapper {
  static  fromDbToDTO (dbMovie) {
    const map = dbToDtoMap;
    const dto = {};
    if(dbMovie.id) dto['id'] = dbMovie.id;
    for (const key in dbMovie) {
      const targetKey = map[key];
      if (targetKey === undefined) continue;
      let value = dbMovie[key];
      //transform 
      if (arrayFields.includes(key)) value = commaTextToArray(value);
      dto[targetKey] = value;
    }
    return dto;
  }

  // in updating cases 
  static fromDtoToDB (dto) {
    const map = dtoToDbMap;
    const db = {};

    for (const key in dto) {
      const targetKey = map[key];
      if (targetKey === undefined) continue;
      let value = dto[key];
      if (value === undefined) continue;
      //transform 
      if (arrayFields.includes(key) && typeof dto[key] === 'string')
        value = commaTextToArray(value);
      db[targetKey] = value;
    }
    return db;
  } 

  // used in creation & update
  static fromDtoToEntity (dto) {
    const map = dtoToDbMap;
    const entity = {id:undefined};
    for (const key in dto) {
      const targetKey = map[key];
      let value = dto[key];

      entity[targetKey] = value;
    }
    return entity;
  }

}

export class EntityMapper {
  static fromEntityToDB (entityMovie) {
    const db = {};
    for (const key in entityMovie) {
      let value = entityMovie[key];

      if (arrayFields.includes(key)) {
        value = arrayToComma(value);
      }
      db[key] = value;
    }
    return db;
  }
  
  static fromDBToEntity (dbMovie) {
    const entity = {};
    for (const key in dbMovie) {
      let value = dbMovie[key];

      if (arrayFields.includes(key)) {
        value = commaTextToArray(value);
      }
      entity[key] = value;
    }
    return entity;
  }
}

//helpers for transformations 
function commaTextToArray(text) {
  if (!text || typeof text !== 'string') return [];
  return text.split(',').map(v => v.trim()).filter(Boolean);
}

function arrayToComma(arr) {
  if (!Array.isArray(arr)) return '';
  return arr.map(v => v.trim()).filter(Boolean).join(', ');
}
