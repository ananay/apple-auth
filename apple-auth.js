/**
 * Apple Auth Library that implements the 'Sign in with Apple' in NodeJS. 
 * Official Documentation: https://developer.apple.com/sign-in-with-apple/
 * @author: Ananay Arora <i@ananayarora.com>
 */

const axios = require('axios');
const AppleClientSecret = require("./token");
const crypto = require('crypto');
const qs = require('querystring');

class AppleAuth {
    
    /**
     * Configure the parameters of the Apple Auth class
     * @param {object} config - Configuration options
     * @param {string} config.client_id – Client ID (also known as the Services ID
     *  in Apple's Developer Portal). Example: com.ananayarora.app
     * @param {string} config.team_id – Team ID for the Apple Developer Account
     *  found on top right corner of the developers page
     * @param {string} config.redirect_uri – The OAuth Redirect URI
     * @param {string} config.key_id – The identifier for the private key on the Apple
     *  Developer Account page
     * @param {string} privateKeyLocation - Location to the private key
     */

    constructor(config, privateKeyLocation) {
        this._config = JSON.parse(config);
        this._state = "";
        this._tokenGenerator = new AppleClientSecret(this._config, privateKeyLocation);
        this.loginURL = this.loginURL.bind(this);
    }

    /**
     * Return the state for the OAuth 2 process
     * @returns {string} state – The state bytes in hex format
     */

    get state () {
        return this._state;
    }

    /**
     * Generates the Login URL
     * @returns {string} url – The Login URL
     */

    loginURL() {
        this._state = crypto.randomBytes(5).toString('hex');
        const url = "https://appleid.apple.com/auth/authorize?"
                    + "response_type=code"
                    + "&client_id=" + this._config.client_id
                    + "&redirect_uri=" + this._config.redirect_uri
                    + "&state=" + this._state
        return url;
    }

    /**
     * Get the access token from the server
     * based on the grant code
     * @param {string} code 
     * @returns {object} Access Token object
     */
    
    async accessToken(code) {
        return new Promise (
            (resolve, reject) => {
                const payload = {
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: this._config.redirect_uri,
                    client_id: this._config.client_id,
                    client_secret: this._tokenGenerator.generate(),
                };
                axios({
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(payload),
                    url: 'https://appleid.apple.com/auth/token'
                }).then((response) => {
                    resolve(response.data);
                }).catch((response) => {
                    reject(response);
                });
            }
        );
    }

    /**
     * Get the access token from the server
     * based on the refresh token
     * @param {string} refreshToken 
     * @returns {object} Access Token object
     */

    async refreshToken(refreshToken) {
        return new Promise (
            (resolve, reject) => {
                const payload = {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    redirect_uri: this._config.redirect_uri,
                    client_id: this._config.client_id,
                    client_secret: this._tokenGenerator.generate(),
                };
                axios({
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(payload),
                    url: 'https://appleid.apple.com/auth/token'
                }).then((response) => {
                    resolve(response.data);
                }).catch((response) => {
                    reject(response);
                });
            }
        );
    }

}

module.exports = AppleAuth;