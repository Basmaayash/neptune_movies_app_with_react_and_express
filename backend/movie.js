import { movieRepository } from './repository.js'

export class Movie {

  constructor(data) {
    this.id = data.id || 'N/A';
    this.title = data.title || '';
    this.vote_average = data.vote_average || 0;
    this.vote_count = data.vote_count || 0;
    this.status = data.status || '';
    this.release_date = data.release_date || null; // "YYYY-MM-DD"
    this.revenue = data.revenue || 0;
    this.runtime = data.runtime || 0;
    this.adult = data.adult || false;
    this.budget = data.budget || 0;
    this.imdb_id = data.imdb_id || '';
    this.original_language = data.original_language || '';
    this.original_title = data.original_title || '';
    this.overview = data.overview || '';
    this.popularity = data.popularity || 0;
    this.tagline = data.tagline || '';
    this.genres = data.genres || []; 
    this.production_companies = data.production_companies || [];
    this.production_countries = data.production_countries || [];
    this.spoken_languages = data.spoken_languages || [];
    this.keywords = data.keywords || [];
  }

  static async idGenerator (id = undefined) {
    const err = new Error ();
    err.code = 409;
    if (id !==undefined && id !==null) {
      const numeric_id = Number(id);
      if (!Number.isInteger(numeric_id)) {
        err.message = 'movie id must be integer value';
        throw err;
      }
      // id not used before
      const dbMov = await movieRepository.getById(Number(id));
      if (dbMov) {
        err.message = 'movie alreay exist';
        throw err;
      }
      return Number(id);
    }else {
      //there no id generate new one not conflict with add external_ids and next ids
      const MAX_ATTEMPS = 5;
      let attemps = 0;
     while (attemps < MAX_ATTEMPS) {
      const next_id = await movieRepository.getNextId();
      const dbMov = await movieRepository.getById(Number(next_id));
      if (!dbMov) {
        return Number(next_id);
      }
      attepms++;
     }
     throw new Error('Failed to generate unique ID');
    }
  }

  // ---- Business rules & functions ----

  // Calculate ROI (Return on Investment)
  getROI() {
    if (this.budget <= 0) return null;
    return (this.revenue - this.budget) / this.budget;
  }

  // Check if movie is a blockbuster (based on revenue threshold)
  isBlockbuster(minRevenue = 100_000_000) {
    return this.revenue >= minRevenue;
  }

  // Short description helper
  getShortOverview(maxLength = 100) {
    if (!this.overview) return '';
    return this.overview.length > maxLength
      ? this.overview.slice(0, maxLength) + '...'
      : this.overview;
  }

  // Add keyword (no duplicates)
  addKeyword(keyword) {
    if (!keyword || typeof keyword !== 'string') return;
    if (!this.keywords.includes(keyword)) {
      this.keywords.push(keyword.trim());
    }
  }

  // Remove keyword
  removeKeyword(keyword) {
    this.keywords = this.keywords.filter(k => k !== keyword);
  }

  // Update release date (ensures format "YYYY-MM-DD")
  setReleaseDate(date) {
    if (!date) return;
    const d = new Date(date);
    if (!isNaN(d)) {
      this.release_date = d.toISOString().split('T')[0];
    }
  }

  // Update rating
  setRating(rating) {
    if (typeof rating === 'number' && rating >= 0 && rating <= 10) {
      this.vote_average = rating;
    }
  }
}