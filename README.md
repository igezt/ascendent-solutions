# Introduction

This project was made for a take-home assessment as part of the interview process for Reddot Engineering Pte Ltd.
It works as a backend API that has two seperate overarching endpoints that serves as an interface for **Clients** and **Cases** in a client-management software service.

# Setup and running in development

## Installation

As with all NPM projects, the first step is to install all your dependencies.

First, run

> npm i

or

> yarn install

or

> pnpm i

or

> bun i

depending on which package manager you prefer.

## Env setup

Now, set up your .env file in your project using the .env.sample file provided in the repo. The details of what fields to include are in the [.env.sample] file.

## IMPORTANT: Set up Prisma

The project relies heavily on Prisma's auto typing system. So first make sure that you have a .prisma directory with a schema.prisma included. Next, run

> npx prisma migrate dev

This will create the tables required in the database you have linked, auto generate the Prisma Client which provides the types and models used in this code base as well as link up your database with Prisma.

When prompted to what to name your migration, just click enter or name it whatever you want

If all goes well, it should say that it has generated the **Prisma Client** and that the database is synced with Prisma.

For more troubleshooting, contact me at pierce.nws@gmail.com. Or read more about Prisma's strong migration tool [here](https://www.prisma.io/docs/concepts/components/prisma-migrate)

## Running the dev environment

In order to run the dev environment, simply run

> npm run dev

or

> yarn run dev

depending on your package manager. And the server should print:

> Server running on port ####

where #### is replaced by the port you defined in your .env file. For more details about how to use the server and api, refer to the [API documentation section]().

# Tech Stack

The backend was created using Nodejs and ExpressJS. Mainly for my familiarity with it, but also for its robust community support.
For the database, MySQL was chosen for its ease of use, large community support and relatively higher speeds as compared to psql.
The ORM that I chose was Prisma. Prisma provides an easy interface to interact with the database while also intergrating well with typescript with its auto-generated types and also its rapid ability to iterate using its strong migration tool.

# Libraries

Some non-trivial libraries I ended up using were:

- Joi (along with some of its variants)

I used Joi for its strong validation library that would help sanitize content at the router level using middleware.

# API Endpoints

## Overview

### Clients

- POST /api/client - Creates a new client
- DELETE /api/client/:clientId - Deletes the client with clientId
- GET /api/client/:clientId - Gets the information about a client with clientId
- UPDATE /api/client/:clientId - Updates the information about a client with clientId
- GET /api/client - Gets all the clients.

### Case

- GET /api/case/client/:clientId - Gets all cases raised by client of clientId
- GET /api/case/staff/:staffId - Gets all cases handled by a staff member with staffId
- GET /api/case/completed - Gets all completed cases
- GET /api/case/outstanding - Gets all completed cases
- POST /api/case - Creates a new case
- UPDATE /api/case/:caseId - Updates the case with cid equals to caseId
- DELETE /api/case/:caseId - Deletes the case with cid equals to caseId
- GET /api/case/:caseId - Gets the case with cid equals to caseId
- GET /api/case - Gets all the cases.

<br>
<br>

## API Documentation

<hr>

### Case API

<br>

#### GET /api/case/client/:clientId

##### Description

Gets all cases raised by a client of clientId.

##### Params

clientId (URL Parameter): The ID of the client.

##### Example API Call

> curl -X GET http://localhost:8000/api/case/client/1

##### Example API Response

```json
{
  "cases": [
    {
      "id": 26,
      "status": "COMPLETED",
      "creation_date": "2023-10-04T08:00:00.000Z",
      "request_message": "I need help with alskdjalksjaslkdj",
      "cid": 1,
      "eid": 2
    },
    {
      "id": 29,
      "status": "OUTSTANDING",
      "creation_date": "2023-10-07T05:23:10.871Z",
      "request_message": "I need help with...",
      "cid": 1,
      "eid": null
    },
    {
      "id": 30,
      "status": "OUTSTANDING",
      "creation_date": "2023-10-07T08:18:53.828Z",
      "request_message": "I need help with...",
      "cid": 1,
      "eid": null
    }
  ]
}
```

<br>

#### GET /api/case/staff/:staffId

##### Description

Gets all cases handled by a staff member with staffId.

##### Params

staffId (URL Parameter): The ID of the staff member.

##### Example API Call

> curl -X GET http://localhost:8000/api/case/staff/3

##### Example API Response

```json
{
  "cases": [
    {
      "id": 1,
      "cid": 2,
      "eid": 3,
      "status": "COMPLETED",
      "creation_date": "2022-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "cid": 3,
      "eid": 3,
      "status": "OUTSTANDING",
      "creation_date": "2022-01-02T00:00:00.000Z"
    }
  ]
}
```

<br>

#### GET /api/case/completed

##### Description

Gets all completed cases.

##### Example API Call

> curl -X GET http://localhost:8000/api/case/completed

##### Example API Response

```json
{
  "cases": [
    {
      "id": 26,
      "status": "COMPLETED",
      "creation_date": "2023-10-04T08:00:00.000Z",
      "request_message": "I need help with alskdjalksjaslkdj",
      "cid": 1,
      "eid": 2
    },
    {
      "id": 27,
      "status": "COMPLETED",
      "creation_date": "2023-10-04T08:00:00.000Z",
      "request_message": "I need help with alskdjalksjaslkdj",
      "cid": 2,
      "eid": 1
    }
  ]
}
```

<br>

#### GET /api/case/outstanding

##### Description

Gets all outstanding cases.

##### Example API Call

> curl -X POST http://localhost:8000/api/case/outstanding

##### Example API Response

```json
{
  "cases": [
    {
      "id": 29,
      "status": "OUTSTANDING",
      "creation_date": "2023-10-07T05:23:10.871Z",
      "request_message": "I need help with...",
      "cid": 1,
      "eid": null
    },
    {
      "id": 30,
      "status": "OUTSTANDING",
      "creation_date": "2023-10-07T08:18:53.828Z",
      "request_message": "I need help with...",
      "cid": 1,
      "eid": null
    }
  ]
}
```

<br>

#### POST /api/case

##### Description

Creates a new case.

##### Body

The data for the new case. It should include the following fields:

| Field           | Description                                                                                     | Restrictions                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| request_message | The message of the request                                                                      | String                                                                                 |
| status          | The status of the case. (Refer to the [Status](##Status) section about what values are allowed) | String                                                                                 |
| cid             | The client's unique id                                                                          | Positive integer                                                                       |
| eid             | The staff's unique id                                                                           | Positive integer                                                                       |
| creation_date   | The date when the case was created                                                              | Refer to the [Date](#specific-information) section about how to format the date string |

##### Example API Call

> curl -X POST http://localhost:8000/api/case/

```json
{
  "cid": 1,
  "eid": 2,
  "status": "COMPLETED",
  "request_message": "I need help with...",
  "creation_date": "2023-10-07T12:12:12Z"
}
```

##### Example API Response

```json
{
  "case": {
    "id": 36,
    "status": "COMPLETED",
    "creation_date": "2023-10-07T12:12:12.000Z",
    "request_message": "I need help with...",
    "cid": 1,
    "eid": 2
  }
}
```

<br>

<br>

#### PUT /api/case/:caseId

##### Description

Updates the case with cid equals to caseId.

##### Params

caseId (URL Parameter): The ID of the case.

##### Body

The new data for the case. It should include the following fields:

| Field           | Description                                                                                     | Restrictions                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| request_message | The message of the request                                                                      | String                                                                                 |
| status          | The status of the case. (Refer to the [Status](##Status) section about what values are allowed) | String                                                                                 |
| cid             | The client's unique id                                                                          | Positive integer                                                                       |
| eid             | The staff's unique id                                                                           | Positive integer                                                                       |
| creation_date   | The date when the case was created                                                              | Refer to the [Date](#specific-information) section about how to format the date string |

##### Example API Call

> curl -X PUT http://localhost:8000/api/case/2

```json
{
  "cid": 2,
  "eid": 1,
  "request_message": "I need help with alskdjalksjaslkdj",
  "creation_date": "2023-10-04T08:00:00.000Z",
  "status": "COMPLETED"
}
```

##### Example API Response

```json
{
  "case": {
    "id": 28,
    "status": "COMPLETED",
    "creation_date": "2023-10-04T08:00:00.000Z",
    "request_message": "I need help with alskdjalksjaslkdj",
    "cid": 2,
    "eid": 1
  }
}
```

<br>

<hr>

## Clients API

<br>

#### POST /api/client

##### Description

Creates a new client.

##### Body

The data for the new Client. It should include the following fields:

| Field    | Description                              | Restrictions                                                                           |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| name     | Name of the client                       | String                                                                                 |
| address  | Address of the client. (company or home) | String                                                                                 |
| birthday | Birthday of the client.                  | Refer to the [Date](#specific-information) section about how to format the date string |
| company  | Company that the client belongs to       | String                                                                                 |

#### Example API Call

> curl -X POST http://localhost:8000/api/client/

```json
{
  "name": "Charles Barkley",
  "bday": "2023-09-08T08:00:00.100Z",
  "address": "ASLKDJ",
  "company": "HELLO"
}
```

##### Example API Response

```json
{
  "client": {
    "cid": 7,
    "name": "Charles Barkley",
    "bday": "2023-09-08T08:00:00.100Z",
    "address": "ASLKDJ",
    "company": "HELLO"
  }
}
```

<br>

#### DELETE /api/client/:clientId

##### Description

Deletes the client with the provided clientId.

**IMPORTANT** Note that when deleting a client, all linked cases will be deleted at the same time. Be mindful of what you delete.

##### Params

clientId: The ID of the client to be deleted.

##### Response

Returns the deleted client if successful. Else returns a err message stored in res.err.

##### Example API Call

> curl -X DELETE http://localhost:8000/api/case/7

##### Example API Response

```json
{
  "client": {
    "cid": 7,
    "name": "Charles Barkley",
    "bday": "2023-09-08T08:00:00.100Z",
    "address": "ASLKDJ",
    "company": "HELLO"
  }
}
```

<br>

#### GET /api/client/:clientId

##### Description

Gets the information about a client with the provided clientId.

##### Params

clientId: The ID of the client to retrieve information.

##### Example API Call

> curl -X GET http://localhost:8000/api/case/6

##### Example API Response

```json
{
  "client": {
    "cid": 6,
    "name": "Charles Barkley",
    "bday": "2023-09-08T08:00:00.100Z",
    "address": "ASLKDJ",
    "company": "HELLO",
    "age": 0
  }
}
```

<br>

#### PUT /api/client/:clientId

##### Description

Updates the information about a client with the provided clientId.

##### Params

clientId: The ID of the client to update.

##### Body

| Field    | Description                              | Restrictions                                                                           |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| name     | Name of the client                       | String                                                                                 |
| address  | Address of the client. (company or home) | String                                                                                 |
| birthday | Birthday of the client.                  | Refer to the [Date](#specific-information) section about how to format the date string |
| company  | Company that the client belongs to       | String                                                                                 |

##### Example API Call

> curl -X PUT http://localhost:8000/api/case/5

```json
{
  "name": "Charles Barkley",
  "bday": "2023-09-08T08:00:00.100Z",
  "address": "ASLKDJ",
  "company": "HELLO"
}
```

##### Example API Response

```json
{
  "client": {
    "cid": 5,
    "name": "Charles Barkley",
    "bday": "2023-09-08T08:00:00.100Z",
    "address": "ASLKDJ",
    "company": "HELLO"
  }
}
```

<br>

#### GET /api/client

##### Description

Gets all the clients.

##### Response

Returns an array of all client objects.

<br>

## Specific Information

### Dates

For the sake of cohesiveness, all dates (regardless if they use date etc) are taken in as datestrings with the same format:

> {YYYY-MM-DD}T{HH:mm:SS}.{sss}Z

I recommend following this format, but the APIs do allow for other formats that are accepted by Typescript's Date object.

### Examples

All API's have an example call writen in the example API call section of their respective documentation.

I recommend using an API testing service like Postman to send API calls to the server and observe the results on your own.

# Database design

With regards to the specific database design, I have included them in the [ER diagram](ER-Diagram.jpg).

Now lets talk about the specific design decisions I made

## Database design decisions

### Relations

First off, **Cases** are in a **many-to-one** relationship between both **Clients** and **Staffs**. i.e. A case can have only one client and staff (or none of both, which I will explain later) while Clients and Staffs can have many cases linked to them. This is in line with the requirements set out by the assessment.

### Optionality of both Client and Staff

For Staff, it is rather trivial why cases may not have a staff attached to them. This is because when a case is created, it is not likely that a staff will already be working on the case.

For Clients, it is not as simple. The reason why Cases are not deleted on cascade when a client is deleted, even though a case without a client doesn't make sense, is because it would be quite detrimental for a case's details to be destroyed if a client accidentally deletes their account etc.

However, on confirmation, I have verified that it should be cascade on delete for clients to case.

Hence, both the referenced staff is optional in a case but clients are required to be linked at all times.

## Client Model Decisions

A client has the following fields

- cid (Key of Client)
- name
- bday (Birthday abbreviated)
- address
- company

Some of these are quite trivial, so I will only touch on the decisions that are a bit less obvious.

### name

I made name a required field to ensure that there is some identifier that staff members can use when referring to a case. In the case of a web application, this name would be the username of the user making the case.

### age

You may notice that age is not a field in the Client Model. This is because it is usually never a good decision to add an age field to a table as it has to be frequently updated. Instead, in every GET call for **Clients**, the age of the client is calculated at run-time using their birthday instead of being stored in the database.

### bday

The only thing of note for bday is the format that it is saved in. I talk about it more at a seperate section about [Dates](#specific-information).

## Case Model Decisions

A **Case** has the following fields

- id (key)
- status (enum value between "COMPLETED" and "OUTSTANDING")
- creation_date
- request_message
- cid (Foreign key referencing Clients)
- eid (Foreign key referencing Staff)

I already touched about the design decision with regards to the one-to-many relations. I will just touch on specific fields again.

### creation_date

Uses the same format as noted in the Dates section. The creation_date field defaults to the current time when no creation_time is passed when creating a new case.

### status

This uses an enum value that only accepts the following two strings

- "COMPLETED"
- "OUTSTANDING

In the future, more statuses can be added in relatively simply by just using Prisma.

## Staff Model

A Staff has the following fields:

- eid (key, stands for employee id)
- name

Not much to talk about. The table was created mainly just to link staff members to Cases. I created three dummy staff members in the [dummy.sql](dummy.sql) file.

# Challenges Faced

Surprisingly, I had close to no challenges at the time of writing this. That isn't to say that everything was smooth sailing, but rather that there were far lesser challenges than I expected.

## Validation

This was the first time I had used Joi has a backend validation library. I mainly has experience with [class-validator](https://github.com/typestack/class-validator) and [class-transformer](https://github.com/typestack/class-transformer) due to my NestJS background.

It was however, rather easy to implement.
The real issue came with naming my schemas.
I had two seperate DTOs. One was the schemas that I created with the help of Joi and one that I had created for my services to use. I struggled for a good 20 minutes to name them XD

## File Structure

I had done this before, so it was not terribly difficult, the main challenge was just figuring out what needed a seperate directory and what didn't. I wanted to make sure that the code was easy to read and easy to find. I ended up grouping my controllers, services, validators, routes and dtos all seperately.

I did have the urge to group them based on what they were interfacing with, i.e. client and case. But I felt this file structure kept things a lot neater.

# Conclusion

This was a fun project that tested my understanding of backend servers and how to build a proper API. All in all, I enjoyed every moment I worked on it. A lesson I learnt was that its ok to repeat myself sometimes (Talking about DRY) because certain functionalities may look similar now, but they may not be the same later on.

```

```
