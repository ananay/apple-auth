/**
 * Generates a client secret for Apple auth
 * using the private key.
 * @author: Ananay Arora <i@ananayarora.com>
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');

class AppleClientSecret {
    
    /**
     * 
     * @param {object} config 
     * @param {string} config.client_id 
     * @param {string} config.team_id 
     * @param {string} config.redirect_uri 
     * @param {string} config.key_id 
     * @param {*} privateKeyLocation 
     */
    constructor(config, privateKeyLocation) {
        this._config = config;
        this._privateKeyLocation = privateKeyLocation;
        this.generate = this.generate.bind(this);
        this._generateToken = this._generateToken.bind(this);
    }
    
    /**
     * Generates the JWT token
     * @param {string} clientId 
     * @param {string} teamId 
     * @param {string} privateKey 
     * @param {int} expiration 
     * @returns {Promise<string>} token 
     */
    _generateToken(clientId, teamId, privateKey, exp, keyid) {
        return new Promise (
            (resolve, reject) => {
                // Curate the claims
                const claims = {
                    iss: teamId,
                    iat: Math.floor(Date.now() / 1000),
                    exp,
                    aud: 'https://appleid.apple.com',
                    sub: clientId,
                };
                // Sign the claims using the private key
                jwt.sign(claims, privateKey, {
                    algorithm: 'ES256',
                    keyid
                }, (err, token) => {
                    if (err) {
                        reject("AppleAuth Error – Error occurred while signing: " + err);
                    }
                    resolve(token);
                });
            }
            );
        }
        
    /**
     * Reads the private key file calls 
     * the token generation method
     * @returns {Promise<string>} token - The generated client secret
     */
    generate() {
        return new Promise (
            (resolve, reject) => {
                fs.readFile(this._privateKeyLocation, (err, privateKey) => {
                    if (err) {
                        reject("AppleAuth Error - Couldn't read your Private Key file: " + err);
                    }
                    let exp = Math.floor(Date.now() / 1000) + ( 86400 * 180 ); // Make it expire within 6 months
                    this._generateToken(
                        this._config.client_id, 
                        this._config.team_id, 
                        privateKey,
                        exp, 
                        this._config.key_id
                    ).then((token) => {
                        resolve(token);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            }
        );
    }
}
module.exports = AppleClientSecret;