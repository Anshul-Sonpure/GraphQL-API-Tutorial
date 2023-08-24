
## _GraphQL API Tutorial_

### Introduction to GraphQL

GraphQL is a query language and runtime for APIs that was developed by Facebook in 2012 and later released as an open-source project. It provides a more efficient, powerful, and flexible alternative to traditional REST APIs. GraphQL allows clients to request precisely the data they need, and nothing more, making it ideal for building modern web and mobile applications.

### What is GraphQL?

GraphQL is a query language for your API, enabling clients to request the exact data they need and get predictable results. It allows developers to define the structure of the data they want to retrieve and allows them to interact with the API in a more intuitive way.

## Use of GraphQL

- Efficient Data Fetching: Clients can request only the data they need, reducing the amount of data transferred over the network.
- Single Endpoint: Unlike REST APIs that have multiple endpoints for different resources, GraphQL has a single endpoint for all data requests.
- Strongly Typed: GraphQL schemas are strongly typed, which enables better tooling, autocompletion, and error checking.
- Rapid Development: With GraphQL, frontend and backend teams can work independently, as the schema acts as a contract between them.
- Versioning: Since clients specify the data they need, changes to the API won't break existing clients.

### Benefits of GraphQL over REST and SOAP

- Reduced Overfetching: GraphQL allows clients to request only the fields they need, eliminating overfetching of data.
- Elimination of Underfetching: Clients can get all the required data in a single request, reducing the number of round trips to the server.
- No Versioning: Since the schema serves as a contract between clients and the server, there's no need for versioning the API.
- Introspection: GraphQL provides introspection, allowing clients to discover the schema and available operations.
- Real-time Updates: GraphQL supports subscriptions, enabling real-time updates from the server.

### Key Concepts of GraphQL

- Schema: A GraphQL schema defines the data structure and types that clients can query. It includes objects, fields, and relationships between them.
- Query: The query is used to request data from the server. Clients can specify what data they need and the shape of the response they expect.
- Mutation: Mutations are used to modify data on the server, such as creating, updating, or deleting records.
- Resolver: Resolvers are functions that define how to fetch the data for each field in a GraphQL schema. They are responsible for retrieving the data from the data source.
- Subscription: Subscriptions allow clients to receive real-time updates from the server when specific events occur.

The Endpoint is hosted on Render: Cloud Application Hosting application<br> 
To access the endpoint --> https://graphql-api-ppql.onrender.com/graphql<br> 
For now we have userdata having firstName,lastName,gender,ipaddress.
And we have 
1. query -- getallUsers, here you can query as per your need.
2. mutation -- createUser, here you can create a user with your data.

### To Deploy locally
First Clone the repo, and open the workspace in Visual Code. Open Terminal and enter below command:
```sh
npm install express graphql express-graphql
npm start
```
Application will start on Port 8085, use the endpoint '/graphql' and you will see the graphql ui.
Now play around send your queries or mutations.

### Query and Mutation Commands--
SignUp Query:
Use this query to simulate a user signUp and get the username and authToken.

```
mutation {
  signUp(username: "AdminUser1", password: "Admin@User1") {
    username
    authToken
  }
}

```
The response will look something like:
```
{
  "data": {
    "login": {
      "username": "AdminUser1",
      "authToken": "your-generated-auth-token"
    }
  }
}

```
Sign-In Query:
Use this query to simulate a user sign-in with the username and authToken.
```
mutation {
  signIn(username: "AdminUser1", authToken: "your-generated-auth-token")
}

```
The response will be:
```
{
  "data": {
    "signIn": "Hello, AdminUser1!"
  }
}

```
To Query all users:
```
query{
  getAllUsers{
    firstName,id
  }
}
```
To Create a new user:
```
mutation{
  createUser(firstName:"Toby",lastName:"K",gender:"Male",ipaddress:"202.123.32.11")
  {firstName,id
    
  }
}
```
To Update a User:
```
mutation {
  updateUser(id:24, firstName: "Denver") {
    id
    firstName
    lastName
    email
    gender
    ipaddress
  }
}
```

To Delete a User:
```
mutation {
  deleteUser(id: 1) {
    id
    firstName
    lastName
    email
    gender
    ipaddress
  }
}
```

### _Note_: 
You can read my article here : https://medium.com/@theautobot/mastering-graphql-for-modern-api-development-step-by-step-guide-61c504a45030

Thank You\
Happy Coding,\
Learn,Code and Earn\
Stay Safe and Stay Positive :)

