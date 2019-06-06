<h1 align="center">Sign in with Apple for NodeJS</h1>

An easy-to-use Node.js library for Signing in with Apple!

## Setup

Begin by installing the library:
```npm install apple-auth```

Next, head over to <a href="https://developer.apple.com/account/">https://developer.apple.com/account/</a> and click on "Certificates, Identifiers & Profiles".

## Configuring
The Sign in with Apple feature requires a bunch of stuff, and for that you need an Apple Developer account. This library has tried simplify this process as much as possible by automating the creation of the client secret and adding simple params that you configure to get it working out of the box.

- client_id – This is actually called the "Service ID" that you will create in the 'Identifiers' section
- team_id – Located in the top left hand corner of the Apple Developer page (Format: XXXXXXXXXX)
- redirect_uri – The URL which will handle the response from Apple when the user hits "Allow" on Apple's website
- key_id – Listed when you click on one of the keys in the "keys" section of the Apple Developer page (Format: XXXXXXXXXX)

- Private Key – This is generated via the "keys" section on the Apple Developer page, and this is the key to which the "key_id" refers to.

## Contributing

Feel free to open issues and pull requests. If you would like to be one of the core creators of this library, please reach out to me at i@ananayarora.com or message me on twitter @ananayarora!

<h4>Created by <a href="https://ananayarora.com">Ananay Arora</a>&nbsp;<a href="https://twitter.com/intent/follow?screen_name=ananayarora">
    <img src="https://img.shields.io/twitter/follow/ananayarora.svg?label=Follow%20@ananayarora" alt="Follow @ananayarora" />
  </a></h4>
