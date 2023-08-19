const express = require('express');
const app = express();
const PORT = process.env.PORT||8085;
const graphql = require('graphql');
const { GraphQLScalarType, Kind, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const {graphqlHTTP} = require('express-graphql');



// Step 1: Define the custom scalar type for IPAddress
const IPAddress = new GraphQLScalarType({
  name: 'IPAddress',
  description: 'Custom scalar type for representing IP addresses',
  serialize(value) {
    // The 'value' here is the IP address from the data source (e.g., '26.71.214.239')
    // Return the serialized value as a string
    return value ? value.toString() : null; // Handle null or undefined values
  },
  parseValue(value) {
    // The 'value' here is the input value from the client (e.g., '26.71.214.239')
    // Return the parsed value as a valid IP address (e.g., '26.71.214.239')
    return value;
  },
  parseLiteral(ast) {
    // The 'ast' here represents the parsed AST of the input value from the client
    // Ensure the parsed AST node is of kind STRING
    if (ast.kind === Kind.STRING) {
      // Return the parsed value from the AST (e.g., '26.71.214.239')
      return ast.value;
    }
    // If the input is not a valid string, return null
    return null;
  },
});
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    ipaddress: { type: IPAddress }, // Step 2: Use the IPAddress scalar type here
  }),
});

const userData = require('./userdata.json');

const resolvers = {
  IPAddress: IPAddress, // Step 2: Include IPAddressResolver here
  Query: {
    getAllUsers: () => {
      return userData;
    },
  },
};

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      getAllUsers: {
        type: new GraphQLList(UserType),
        args: { id: { type: GraphQLInt } },
        resolve(parent, args) {
          return userData;
        },
      },
    },
  });
  
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createUser: {
        type: UserType,
          args: {
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            gender: { type: GraphQLString },
            ipaddress: { type: IPAddress }
          },
          resolve(parent, args) {
            userData.push({
              id: userData.length + 1,
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email,
              gender: args.gender,
              ipaddress:args.ipaddress
            });
            return args;
          },
      },
      updateUser: {
        type: UserType,
        args: {
          id: { type: GraphQLInt },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
          gender: { type: GraphQLString },
          ipaddress: { type: IPAddress },
        },
        resolve(parent, args) {
          const userIndex = userData.findIndex((user) => user.id === args.id);
          if (userIndex === -1) {
            throw new Error("User not found.");
          }
  
          userData[userIndex] = {
            ...userData[userIndex],
            ...args,
          };
  
          return userData[userIndex];
        },
      },
      deleteUser: {
        type: UserType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve(parent, args) {
          const userIndex = userData.findIndex((user) => user.id === args.id);
          if (userIndex === -1) {
            throw new Error("User not found.");
          }
  
          const deletedUser = userData.splice(userIndex, 1)[0];
          return deletedUser;
        },
      },
    },
  });

const schema = new graphql.GraphQLSchema({query:RootQuery,mutation:Mutation});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});