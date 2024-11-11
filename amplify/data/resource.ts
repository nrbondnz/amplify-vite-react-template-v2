"use client";
import {  defineData } from "@aws-amplify/backend";
import { schema as generatedSqlSchema } from './schema.sql';

// Apply global authorization rule to allow all authenticated users
const sqlSchema = generatedSqlSchema.authorization(allow => allow.authenticated());

// Add relationships to the globally authorized schema
//const sqlSchemaWithRelationships = sqlSchema;
/*models => [
    models.machines.relationships({
       
        location: a.hasOne("locations", "idLocation")
    }),
    models.locations.relationships({
        machines: a.hasMany("machines", "idLocation")  // Corresponding id to idLocation
    })
]*/


// Additional test schema
/*const testSchema = a.schema({
    Todo: a
        .model({
            content: a.string(),
            isDone: a.boolean()
        })
        .authorization(allow => allow.authenticated())
});*/

// Combine all schemas
//const combinedSchema = a.combine([sqlSchema, testSchema]);

console.log("Combined schema: ", sqlSchema);

//export type Schema = ClientSchema<typeof combinedSchema>;

export const data = defineData({
    schema: sqlSchema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey", // Default mode
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        }
    },
});

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema from "@/amplify/data/resource";

const client = generateClient<Schema>(); // use this Data client for CRUDL requests
*/

/*
Fetch records from the database and use them in your frontend component.
For example, in a React component, you can use this snippet in your function's RETURN statement:

const { data: todos } = await client.models.Todo.list();

return (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.content}</li>
    ))}
  </ul>
);
*/