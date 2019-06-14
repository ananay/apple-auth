#  Sign in with Apple for Node.js

<a href="https://twitter.com/intent/follow?screen_name=ananayarora"><img src="https://img.shields.io/twitter/follow/ananayarora.svg?label=Follow%20@ananayarora" alt="Follow @ananayarora"></img></a>
<img src="https://img.shields.io/npm/dt/apple-auth.svg"></img>
<img src="https://img.shields.io/npm/v/apple-auth.svg"></img>
</p>

An easy-to-use Node.js library for Signing in with Apple!

Apple has starteed to issue access tokens and show the Sign in with Apple flow, but the access token is only reserved for future use. As of now, you cannot fetch any information from that access token but in the future it will be possible.

## Setup

Begin by installing the library:
```npm install apple-auth```

The configurations for Sign in with Apple are quite extensive so I've made an extensive SETUP.md file that you can read
https://github.com/ananay/apple-auth/blob/master/SETUP.md

## Example

I've created an example of how to use this library with Express! Check it out here:

https://github.com/ananay/apple-auth-example

**Example live on https://apple.ananay.dev**

## Usage

Initialize it using the following code:
```
const fs = require('fs');
const AppleAuth = require('apple-auth');
const config = fs.readFileSync("./config/config");
const auth = new AppleAuth(config, './config/AuthKey.p8');
```

Methods:
- ```auth.loginURL()``` - Creates the Login URL that your users will use to login to
- ```auth.accessToken(grantCode)``` - Gets the access token from the grant code received
- ```auth.refreshToken(refreshToken)``` - Gets the access token from a refresh token


## Questions / Contributing

Feel free to open issues and pull requests. If you would like to be one of the core creators of this library, please reach out to me at i@ananayarora.com or message me on twitter @ananayarora!

<h4> Created with ❤️ by <a href="https://ananayarora.com">Ananay Arora</a></h4>
