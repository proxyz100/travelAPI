<div align="center" id="readme-top">
  <h1 align="center">Travel API 🌎✈️</h1>

  <p align="center">
    An awesome <b>Travel API</b> with many destinations, categories, users and more to use in your next project!
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#meet-the-team">Meet the team</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
       <ul>
          <li><a href="#models">Models</a></li>
          <li><a href="#basic-flow">Basic flow</a></li>
	  <li><a href="#testing">Testing</a></li>
       </ul>
    </li>
    <li><a href="#resources">Resources</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Travel API is the next great API you can use in your projects! Here you will find many data about destinations, categories, users, types of users and favorites. And of course the endpoints needed to work with this data!

### Built with
* [![JavaScript][JavaScript.js]][JavaScript-url]
* [![Nodejs][Nodejs.js]][Nodejs-url]
* [![Express][Express.js]][Express-url]
* [![Sequelize][Sequelize.js]][Sequelize-url]
* [![GitHub][GitHub.js]][GitHub-url]
* [![Railway][Railway.js]][Railway-url]
* [![Postgresql][Postgresql.js]][Postgresql-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

##  Meet the team
- [Alma Lovera](https://github.com/almalst)
- [Francisco Solís](https://github.com/francisco-solis99)
- [Marcela Contreras](https://github.com/proxyz100/)
- [Maribel Melendez](https://github.com/marmelendez)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting started
### Prerequisites
Make sure you have Nodejs and NPM installed in your local device.
> [Install Nodejs and NPM](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)

### Installation
1. Clone the repo `git clone https://github.com/proxyz100/travelAPI`
2. Move to directory `cd travelAPI`
3. Install npm packages `npm i`
4. Open the folder and create a **.env** file. Add the data with the .env-example variables.
5. Run the app `npm run dev`

> Check this [tutorial](https://youtu.be/6jLiPRCX_GE) to run the app!
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage
### Models
We have five entities with the following properties and methods

|| User      | Type | Destination      | Category |Favorite |
|----| ----------- | ----------- | ----------- | ----------- | ----------- |
|Properties| name, surname, email, password, typeId      | name       | name, description, cost, image, categoryId  | landscape, icon, description | destinationId, favoriteId |
|Methods| signUp, logIn, update, delete, get, getById     | get, create, update, delete       | get, getById, create, update, delete  | get, getById, create, update, delete  | get, create, getByUser, getByDestination, delete|

> There's only three types of users: Admin (access to all methods), Premium (access to favorites methods) and Basic.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Basic flow
1. First you have to sign up
```
{
	"name": "Francisco",
	"surname": "Solis",
	"email": "fransoli@hotmail.com",
	"password": "fransolis",
	"TypeId": 1
}
```

2. Then log in with the email and password
```
{
	"email": "fran4@hotmail.com",
	"password": "fransolis"
}
```
3. You'll get a token, with this token you'll have access to the services based on the User Type.
4. And that's it! Start testing all the methods the user has access to 🥳



⚠️  **Considerations**
- You can only have a maximium of 3 Types of user. There's only 1-Admin, 2-Premium, 3-Basic.
- Before you create a new Destination, you have to create the Category you'll add to it.
- You need to get a valid token to access some methods, if not you'll get an _401 Unauthorized_ error

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Testing
_For more examples, check the [Documentation](https://travelapi-production.up.railway.app/docs/) and [Insomia Tests](https://drive.google.com/drive/folders/15LJ8IVtF68ONnJ0krMJ2elo4sYEC0Q3U?usp=sharing)._

There's already some users and types in the database you can test with the API. But you can still create new users (with the defined types).

**Types**
|id|name|
|----|----|
|1|Admin|
|2|Premium|
|3|Basic|



**Users**

|email|password|typeId|
|----|----|----|
|marcon@hotmail.com|SVNJn994M$|1|
|frasol@hotmail.com|57PEGdR#9@|2|
|almlov@hotmail.com|xxY*8tq39A|2|
|marmel@hotmail.com|y7z2Vj7%TG|2|
|serurb@hotmail.com|veZq7$82!!|2|
|petfra@hotmail.com|*qQ4!38T2Q|2|
|hecsif@hotmail.com|3Bs4k!3HEy|2|
|carsan@hotmail.com|kx*T86X2A2|2|
|margue@hotmail.com|nM99K7$e6%|3|
|jazrey@hotmail.com|92#jSB35p%|3|
|leogal@hotmail.com|!9FFv3y89j|3|
|luzqui@hotmail.com|gRR6$H74Qe|3|
|sebher@hotmail.com|66%CDRgce6|3|
|frigut@hotmail.com|4#GJp$84Xx|3|


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Resources
- Tracking: [Trello](https://trello.com/b/RmM26nwg/travel-around-the-globe-api-%F0%9F%8C%8E)
- Database: models and relations
<img src="https://user-images.githubusercontent.com/57516503/194740799-653f2261-d190-4404-8b5b-134f45e0e6ac.jpg" alt="diagrams" width="400"/>


<p align="right">(<a href="#readme-top">back to top</a>)</p>


[JavaScript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://www.javascript.com/
[Nodejs.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Nodejs-url]: https://nodejs.org/en/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[Sequelize.js]: https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue
[Sequelize-url]: https://sequelize.org/
[GitHub.js]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&Color=green
[GitHub-url]: https://github.com/
[Railway.js]: https://img.shields.io/badge/Railway-323330?style=for-the-badge&logoColor=blue
[Railway-url]: https://railway.app/
[Postgresql.js]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Postgresql-url]: https://www.postgresql.org/
