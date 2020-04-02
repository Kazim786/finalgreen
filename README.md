
			         		Breaking Barriers
 This website is a site designed around the events of the recent virus outbreak. It is a donation site allowing for users to submit items for donation to NON profit orgs, while allowing those same orgs to sell the donations for charity.

It used JavaScript,Jquery, Ejs, postSQL, and authentication. The Javascript portion was used for EJS for views, routs, and models. This allowed us to easily integrate the various parts of our app into a cohesive, user friendly application. SQL databases were used to store tables for users and the items lised. Users were stored in one table and given different admin levels depending if they were and ORG or not. We integrated it into the website via EJS script to allow for CRUD operations from admins and users. 
					Problems
Our main issue was authentication, making sure passwords were secure and that a username can only be used once.

						Solutions
This was handled by making use of Bcrypt and SALT_Rounds to encrypt the password and make sure it was not stored as plain text anywhere in our database or site. After that we simply had to do various test runs with various usernames and passwords. Once they all passed we tested the site thoroughly and later added a sign up page for both orgs and donaters. 


Nicholas Nwanochie
