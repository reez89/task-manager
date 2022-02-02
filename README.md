<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode and build the db
$ npm run start:dev 

# production mode
$ npm run start:prod
```
## API
```bash
# REGISTER (POST): 
http://localhost:3000/auth/login
# LOGIN (POST): 
http://localhost:3000/auth/login
# LOGOUT (POST): 
http://localhost:3000/auth/logout

# GET 
http://localhost:3000/permission
http://localhost:3000/role
http://localhost:3000/user
http://localhost:3000/client
http://localhost:3000/projects

# GET:ID

http://localhost:3000/permission/{id}
http://localhost:3000/role/{id}
http://localhost:3000/user/{id}
http://localhost:3000/client/{id}
http://localhost:3000/projects/{id}


# PUT
http://localhost:3000/permission/{id}
http://localhost:3000/role/{id}
http://localhost:3000/user/{id}
http://localhost:3000/client/{id}
http://localhost:3000/projects/{id}

# POST
http://localhost:3000/permission
http://localhost:3000/role
http://localhost:3000/user
http://localhost:3000/client
http://localhost:3000/projects

# DELETE
http://localhost:3000/permission/{id}
http://localhost:3000/role/{id}
http://localhost:3000/user/{id}
http://localhost:3000/client/{id}
http://localhost:3000/projects/{id} 
```

## SEEDING
```bash

# Users 
"seed:users": "ts-node src/seeding/users.seeder.ts",

# Projects
"seed:projects": "ts-node src/seeding/projects.seeder.ts",

#Tasks
"seed:tasks": "ts-node src/seeding/tasks.seeder.ts",

#Permissions and admin role permissions
"seed:permissions": "ts-node src/seeding/permissions.seeder.ts"
```