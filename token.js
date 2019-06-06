/**
 * Generates a client secret for Apple auth
 * using the private key.
 * @author: Ananay Arora <i@ananayarora.com>
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');

class AppleClientSecret {

  constructor(config, privateKeyLocation) {
    this._config = config;
    this._privateKeyLocation = privateKeyLocation;
    this.generate = this.generate.bind(this);
    this._generateToken = this._generateToken.bind(this);
  }

  /**
   * Generate the JWT token
   * @param {string} clientId 
   * @param {string} teamId 
   * @param {string} privateKey 
   * @param {int} expiration 
   */

  _generateToken(clientId, teamId, privateKey, exp, keyid) {
    // Curate the claims
    const claims = {
      iss: teamId,
      iat: Math.floor(Date.now() / 1000),
      exp,
      aud: 'https://appleid.apple.com',
      sub: clientId,
    };
    // Sign the claims using the private key
    const token = jwt.sign(claims, privateKey, {
      algorithm: 'ES256',
      keyid
    });
    return token;
  }

  /**
   * Configure params for generateToken and call it
   * @param {object} config 
   * @param {string} privateKeyLocation - Location
   */

  generate() {
    const privateKey = fs.readFileSync(this._privateKeyLocation);
    let exp = Math.floor(Date.now() / 1000) + ( 86400 * 180 ); // 6 months
    return this._generateToken(this._config.client_id, this._config.team_id, privateKey, exp, this._config.key_id);
  }
}


module.exports = AppleClientSecret;