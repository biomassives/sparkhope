// src/lib/DataManager.js
/**
 * DataManager - Base class for handling local JSON and Supabase data
 * Uses lattice security method for data protection
 */
class DataManager {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.localData = null;
    this.supabaseClient = null;
    this.lattice = null;
  }

  /**
   * Initialize with local JSON data
   */
  async loadLocal(jsonData) {
    this.localData = jsonData;
    return this;
  }

  /**
   * Initialize Supabase connection
   */
  async initSupabase(supabaseUrl, supabaseKey) {
    // TODO: Initialize Supabase client when ready
    this.supabaseClient = {
      url: supabaseUrl,
      key: supabaseKey,
      connected: false
    };
    return this;
  }

  /**
   * Initialize lattice security
   */
  async initLattice(latticeConfig) {
    this.lattice = {
      config: latticeConfig,
      encrypt: (data) => data, // TODO: Implement lattice encryption
      decrypt: (data) => data, // TODO: Implement lattice decryption
    };
    return this;
  }

  /**
   * Get all records
   */
  async getAll() {
    if (this.supabaseClient?.connected) {
      return this._fetchFromSupabase();
    }
    return this._fetchFromLocal();
  }

  /**
   * Get record by ID
   */
  async getById(id) {
    const all = await this.getAll();
    return all.find(item => 
      item.id === id || 
      item[`${this.collectionName}_id`] === id ||
      item.batch_id === id
    );
  }

  /**
   * Filter records
   */
  async filter(predicate) {
    const all = await this.getAll();
    return all.filter(predicate);
  }

  /**
   * Create new record
   */
  async create(data) {
    const secured = this.lattice ? this.lattice.encrypt(data) : data;
    
    if (this.supabaseClient?.connected) {
      return this._createInSupabase(secured);
    }
    return this._createInLocal(secured);
  }

  /**
   * Update record
   */
  async update(id, data) {
    const secured = this.lattice ? this.lattice.encrypt(data) : data;
    
    if (this.supabaseClient?.connected) {
      return this._updateInSupabase(id, secured);
    }
    return this._updateInLocal(id, secured);
  }

  /**
   * Delete record
   */
  async delete(id) {
    if (this.supabaseClient?.connected) {
      return this._deleteInSupabase(id);
    }
    return this._deleteInLocal(id);
  }

  // Private methods for local data
  _fetchFromLocal() {
    return Promise.resolve(this.localData || []);
  }

  _createInLocal(data) {
    if (!this.localData) this.localData = [];
    const newItem = { ...data, id: this._generateId() };
    this.localData.push(newItem);
    return Promise.resolve(newItem);
  }

  _updateInLocal(id, data) {
    const index = this.localData.findIndex(item => 
      item.id === id || item[`${this.collectionName}_id`] === id
    );
    if (index !== -1) {
      this.localData[index] = { ...this.localData[index], ...data };
      return Promise.resolve(this.localData[index]);
    }
    return Promise.reject(new Error('Item not found'));
  }

  _deleteInLocal(id) {
    const index = this.localData.findIndex(item => 
      item.id === id || item[`${this.collectionName}_id`] === id
    );
    if (index !== -1) {
      const deleted = this.localData.splice(index, 1)[0];
      return Promise.resolve(deleted);
    }
    return Promise.reject(new Error('Item not found'));
  }

  // Private methods for Supabase (placeholder)
  async _fetchFromSupabase() {
    // TODO: Implement Supabase fetch
    return [];
  }

  async _createInSupabase(data) {
    // TODO: Implement Supabase create
    return data;
  }

  async _updateInSupabase(_id, data) {
    // TODO: Implement Supabase update
    return data;
  }

  async _deleteInSupabase(_id) {
    // TODO: Implement Supabase delete
    return { id };
  }

  _generateId() {
    return `${this.collectionName}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}

// Export for use
export default DataManager;

