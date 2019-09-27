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
     * @param {string} config.scope - the scope of information you want to get from the user (user name and email)
     *  Developer Account page
     * @param {string} privateKeyLocation - Private Key Location / the key itself
     * @param {string} privateKeyMethod - Private Key Method (can be either 'file' or 'text')
     */

    constructor(config, privateKey, privateKeyMethod) {
        if (typeof config == 'object') {
            if (Buffer.isBuffer(config)) {
                this._config = JSON.parse(config.toString());
            } else {
                this._config = config;
            }
        } else {
            this._config = JSON.parse(config);
        }
        this._state = "";
        this._tokenGenerator = new AppleClientSecret(this._config, privateKey, privateKeyMethod);
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
                    + "response_type=code%20id_token"
                    + "&client_id=" + this._config.client_id
                    + "&redirect_uri=" + this._config.redirect_uri
                    + "&state=" + this._state
                    + "&scope=" + this._config.scope
	 	    + "&response_mode=form_post"
        return url;
    }

    /**
     * Get the access token from the server
     * based on the grant code
     * @param {string} code 
     * @returns {Promise<object>} Access Token object
     */
    
    accessToken(code) {
        return new Promise (
            (resolve, reject) => {
                this._tokenGenerator.generate().then((token) => {
                    const payload = {
                        grant_type: 'authorization_code',
                        code,
                        redirect_uri: this._config.redirect_uri,
                        client_id: this._config.client_id,
                        client_secret: token,
                    };
                    axios({
                        method: 'POST',
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        data: qs.stringify(payload),
                        url: 'https://appleid.apple.com/auth/token'
                    }).then((response) => {
                        resolve(response.data);
                    }).catch((response) => {
                        reject("AppleAuth Error - An error occurred while getting response from Apple's servers: " + response);
                    });
                }).catch((err) => {
                    reject(err);
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

    refreshToken(refreshToken) {
        return new Promise (
            (resolve, reject) => {
                this._tokenGenerator.generate().then((token) => {
                    const payload = {
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken,
                        redirect_uri: this._config.redirect_uri,
                        client_id: this._config.client_id,
                        client_secret: token,
                    };
                    axios({
                        method: 'POST',
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        data: qs.stringify(payload),
                        url: 'https://appleid.apple.com/auth/token'
                    }).then((response) => {
                        resolve(response.data);
                    }).catch((err) => {
                        reject("AppleAuth Error - An error occurred while getting response from Apple's servers: " + err);
                    });
                }).catch((err) => {
                    reject(err);
                });
            }
        );
    }

}

module.exports = AppleAuth;
