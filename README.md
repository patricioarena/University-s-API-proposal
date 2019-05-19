# node-red-template-embedded
A template project for running Node-Red in "embedded" mode which is great if you want to run multiple instances of Node-Red or work collaboratively with others. Also lets you take control of the ExpressJS server.

The present project is a branch of the Julian Knight project which is why the vast majority of the documentation is identical and can be found at https://github.com/TotallyInformation/node-red-template-embedded.

However, the authentication system has been implemented to be able to use the upload of the project to Heroku, as indicated in the official documentation of Node-Red
http://nodered.org/docs/security.html#generating-the-password-hash

The current password is **@123qwe.** it can be changed using
`node -e "console.log (require ('bcryptjs'). hashSync (process.argv [1], 8));" your-password-here`