---
title: Items Microservice
publishDate: 2020-03-02 00:00:00
img: /assets/stock-1.jpg
img_alt: Iridescent ripples of a bright blue and pink liquid
description: |
  Example microservice in .NET 6.
tags:
  - Design
  - Dev
  - User Testing
---

# ItemsMicroservice

Example microservice in .NET 6.

## Stack

* .NET 6
* Postgres
* Entity Framework Core
* Docker
* Redis
* RabbitMQ

## Getting Started

Run command:

```console
docker compose up
```

Ports map:
* 80 & 443 - API
* 5432 - PostgresSQL
* 6379 - Redis
* 5672 & 15672 - RabbitMQ

## Proposed architecture

![Architecture Diagram](assets/architecture.png)

## API Documentation

After opening the app in the browser, go to */api* to display Swagger documentation.

![Swagger Doc](assets/swagger.png)

## Testing endpoints

To test endpoints, open *ItemsMicroservice.rest* file in Visual Studio Code with REST extension to test endpoints.

![REST Extension](assets/REST-extension.png)

## User stories

API Calls are listed in *ItemsMicroservice.rest* file.

1. As a logged in user I can view a list of all items.
   1. Use 1st call to get user's JWT token.
   2. Use 4th call with generated token to get list of items.
2. As a logged in user with role "Zarządzanie Items - administracja" I can add new item.
   1. Use 2nd call to get admin user's JWT token.
   2. Use 3rd call to get available colors dictionary.
   3. Use 6th call with generated token to create an item.
3. As a logged in user with role "Zarządzanie Items - administracja" I can edit existing item.
   1. Use 2nd call to get admin user's JWT token.
   2. Use 3rd call to get available colors dictionary.
   3. Use 4th call with code of edited item as parameter to get current item state.
   4. Use 7th call with generated token to update an item.
4. As a logged in user I can access Colors dictionary.
   1. Use 1st call to get user's JWT token.
   2. Use 3rd call with generated token to get list of colors. 
5. As a user I want Items to be resistent for changes in Colors dictionary.
   * In database, color is stored as a string instead of relation to Colors table.

## Implemented features:

- [x] Log in
- [x] User roles
- [x] Exception handling
- [x] RabbitMQ messages
- [x] Redis Caching
- [x] Pagination
- [ ] Sorting
- [ ] Filtering
- [x] Response caching
- [x] Logging
