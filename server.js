import { ApolloServer } from "@apollo/server";


const server = new ApolloServer({});

server.listen().then(({ url }) => {
    console.log(`running on ${url}`);
});