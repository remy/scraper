/**
 * Home Assistant API client
 * Provides methods to interact with Home Assistant state and service APIs
 */
export class HomeAssistantAPI {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'http://supervisor/core/api';
  }

  /**
   * Make an authenticated request to Home Assistant API
   * @private
   */
  async _request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      authorization: `Bearer ${this.token}`,
      'content-type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = new Error(
        `Home Assistant API error: ${response.status} ${response.statusText}`
      );
      error.status = response.status;
      throw error;
    }

    return response.json();
  }

  /**
   * Get the state of an entity
   * @param {string} entityId - The entity ID (e.g., 'light.living_room')
   * @returns {Promise<Object>} Entity state object with state and attributes
   */
  async getState(entityId) {
    return this._request(`/states/${entityId}`);
  }

  /**
   * Set the state of an entity
   * @param {string} entityId - The entity ID
   * @param {string} state - The new state value
   * @param {Object} attributes - Optional attributes to set
   * @returns {Promise<Object>} Updated entity state object
   */
  async setState(entityId, state, attributes = {}) {
    return this._request(`/states/${entityId}`, {
      method: 'POST',
      body: JSON.stringify({
        state,
        attributes,
      }),
    });
  }

  /**
   * Get all entity states
   * @returns {Promise<Array>} Array of all entities with their states
   */
  async getStates() {
    return this._request('/states');
  }

  /**
   * Call a Home Assistant service
   * @param {string} domain - Service domain (e.g., 'light')
   * @param {string} service - Service name (e.g., 'turn_on')
   * @param {Object} serviceData - Service data/parameters
   * @returns {Promise<Object>} Service call result
   */
  async callService(domain, service, serviceData = {}) {
    return this._request(`/services/${domain}/${service}`, {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  /**
   * Get the full Home Assistant config
   * @returns {Promise<Object>} Configuration object
   */
  async getConfig() {
    return this._request('/config');
  }
}

/**
 * Create and return a Home Assistant API client instance
 */
export default function createHomeAssistantAPI(token) {
  if (!token) {
    console.warn(
      'Home Assistant token not provided (SUPERVISOR_TOKEN not set)'
    );
    return null;
  }
  return new HomeAssistantAPI(token);
}
