# minasList

**Overview:** 
The app is built on the Meteor framework. Meteor is an open-source JavaScript web application framework written using Node.js. Meteor allows for rapid prototyping and produces cross-platform (web, Android, iOS) code. Read more about Meteor at meteor.com
We are using the following Meteor packages: 

accounts-password     1.1.4  Password support for accounts  
aldeed:collection2    2.8.0  Automatic validation of insert and update operations on the client and server  
aldeed:simple-schema  1.5.3  A simple schema validation object with reactivity. Used by collection2 and autoform  
blaze-html-templates  1.0.1  Compile HTML templates into reactive UI with Meteor Blaze  
ecmascript            0.1.6* Compiler plugin that supports ES2015+ in all .js files  
es5-shim              4.1.14  Shims and polyfills to improve ECMAScript 5 support  
grigio:overlay        1.0.2  A little wrapper to manage a fullscreen animated overlay  
iron:router           1.0.12  Routing specifically designed for Meteor  
jquery                1.11.4  Manipulate the DOM using CSS selectors  
meteor-base           1.0.1  Packages that every Meteor app needs  
mobile-experience     1.0.1  Packages for a great mobile user experience  
mongo                 1.1.3  Adaptor for using MongoDB and Minimongo over DDP  
session               1.1.1  Session variable  
standard-minifiers    1.0.2  Standard minifiers used with Meteor apps by default.  
tracker               1.0.9  Dependency tracker to allow reactive callbacks

**How the app is structured:**
An admin account creates accounts for the political candidates with an email address and temporary password. The admin can also remove accounts. Candidates can then login to create their profiles and upload information about their campaign. Each candidate also has a Paypal account linked to their profile, so that they are able to accept donations (Candidates must set up their Paypal account separately and provide the appropriate donation button id). Non-candidate users of the app have the opportunity to look through all the profiles, filtering by country, name, etc., and easily making a donation to the campaign via Paypal.

The *app* folder contains everything the app needs.   
The *client* folder contains the html, js, and css files for each page.   
The *lib* folder contains the routing logic.
The *server* folder contains the methods and publication files, which direct the backend logic.  
The *public* folder contains images used in the app.

*app/client/about*
About page with information from minaslist.org

*app/client/admin*
Administrator's page where admin can create new accounts for candidates and also remove accounts.

*app/client/app*
Home page of the app, provides brief overview of what Mina's List is about.

*app/client/editProfile*
Allows candidates to enter their campaign information.

*app/client/footer*
Footer template

*app/client/header*
Header template

*app/client/login*
Page where admin and candidates can sign in. Has option for users to request to reset their password if need be.

*app/client/profile*
Displays campaign information of one candidate. Includes candidates Paypal donate button. 

*app/client/profiles*
Lists all registered candidates. Allows for filtering of profiles by country and name. Clicking on one of the profiles will take user to that candidate's profile page. 

*app/client/resetPassword*
Allows registered user to change their password

*app/client/resetSent*
Lets a user know that an email has been sent to them to reset their password, if that email exists in the Accounts database

*app/client/setPassword*
Allows a registered user to set their password for the first time. 




