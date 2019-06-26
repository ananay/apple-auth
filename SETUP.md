# Table of contents
- Apple Developer Account Configurations
    - <a href="https://github.com/ananay/apple-auth/blob/master/SETUP.md#create-a-new-app-id">Create a new App ID</a>
    - <a href="https://github.com/ananay/apple-auth/blob/master/SETUP.md#create-a-services-id">Create a services ID</a>
    - <a href="https://github.com/ananay/apple-auth/blob/master/SETUP.md#create-a-key">Create a key</a>
- <a href="https://github.com/ananay/apple-auth/blob/master/SETUP.md#configuring-the-library">Configuring the Library</a>

# Apple Developer Account configurations

## Create a new App ID
![image](https://user-images.githubusercontent.com/5569219/59017558-6d643600-8861-11e9-927b-a4952b56f34e.png)

You need to create this even if you don't have an iOS or a Mac app
![image](https://user-images.githubusercontent.com/5569219/59460984-f967f600-8e3d-11e9-926e-ef39aa1f8e48.png)

Scroll down to "Capabilities", and find "Sign in with Apple" and check it.
![image](https://user-images.githubusercontent.com/5569219/59017720-dea3e900-8861-11e9-898e-f486c093edd8.png)

Hit continue and then register.

## Create a services ID
![image](https://user-images.githubusercontent.com/5569219/59017808-16ab2c00-8862-11e9-8beb-4da7bb509b0c.png)

Fill out the details here, and click configure on "Sign in with Apple".
![image](https://user-images.githubusercontent.com/5569219/59017915-5540e680-8862-11e9-8fd0-e26c425348db.png)

Add your domain that you'll use in the "Domains" section and the redirect url that you want to allow
![image](https://user-images.githubusercontent.com/5569219/59018072-a7820780-8862-11e9-9e79-a8c7bb71ca45.png)

Click Continue and Register.

Now, you need to verify this domain and in order to do that, click on the Service ID that you just created, again, and click configure on "Sign in with Apple". When you do that, you should be able to see that there is a download and a verify button.

![image](https://user-images.githubusercontent.com/5569219/59018636-f54b3f80-8863-11e9-919e-be685f171f95.png)

Hit download, and upload it to the root directory of your website. Once that is done, visit https://yourwebsite.com/.well-known/apple-developer-domain-association.txt and see if it actually works. Once that is done you can hit verify and you're good to go.

## Create a key

Go to the "Keys" section in your Developer account and create one like this:

![image](https://user-images.githubusercontent.com/5569219/59018970-be295e00-8864-11e9-9129-3619ea3a5af3.png)

Click on configure on the "Sign in with Apple" option and make sure it is assigned to the correct App ID. Click continue and register. Now, click on Download and *MAKE SURE YOU KEEP THE FILE SAFE AND SECURE! YOU CANNOT REDOWNLOAD IT ONCE YOU HAVE ALREADY DOWNLOADED IT*

# Configuring the library

Make a folder called "config" and add two files:
- The private key file that you just downloaded
- A new file called ```config.json```

![image](https://user-images.githubusercontent.com/5569219/59019341-7e16ab00-8865-11e9-8408-958621d545b2.png)


Inside of config.json, paste the following sample:
```
{
    "client_id": "",
    "team_id": "",
    "redirect_uri": "",
    "key_id": "",
    "scope": ""
}
```
The ```scope```field is to set what information we want to gather from the user. We can set ```email``` and/or ```name```. This information is still not provided by Apple because this feature is still in Beta - but if you provide it the first time, when Apple finally releases it, your application will already have this permission provided. Otherwise the user has to revoke permissions to your application and log in again to be prompted for the new information request.

The ```client_id``` is actually called the "Service ID" that you will create in the 'Identifiers' section

![image](https://user-images.githubusercontent.com/5569219/59019687-24fb4700-8866-11e9-8302-291a0d63006b.png)


The ```team_id``` is the 10 character code on the top left of the developer page next to your name.
![image](https://user-images.githubusercontent.com/5569219/59019533-dcdc2480-8865-11e9-9db3-3e8f613a4f57.png)

The ```redirect_uri``` is the return url you added in the developer portal
![image](https://user-images.githubusercontent.com/5569219/59018636-f54b3f80-8863-11e9-919e-be685f171f95.png)

The ```key_id``` is the identifier for the private key you generated
![image](https://user-images.githubusercontent.com/5569219/59019916-87544780-8866-11e9-94d8-f454741dcbc6.png)

You can now save this as config.json in the config folder.
