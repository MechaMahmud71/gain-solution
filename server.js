const express=require("express");
const { graphqlHTTP } = require('express-graphql');

const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config({ path: "./config/config.env" });

const connectDB = require('./config/db');
const graphQlShema=require("./schema/index.js");
const graphQlResovlers=require("./resolvers/index.js");


connectDB();

const app=express();
app.use(express.json());
app.use(cors());


app.use('/graphql', graphqlHTTP({
  schema:graphQlShema,
  rootValue:graphQlResovlers,
  graphiql: true,
}));


app.listen(5000,()=>{
  console.log("server is running");
})