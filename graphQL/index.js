const express = require('express');
const app = express();

// require schema
const schema = require('./graphQL/schema');
const { graphqlHTTP } = require('express-graphql');

app.use(express.json());

app.use('/graphql',

    graphqlHTTP({
        schema,
        graphiql: true
    })

)
// database 
require('./config/db');

// CREATE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server run on port :- ${PORT}`);
});
