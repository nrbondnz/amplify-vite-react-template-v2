// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { schema as generatedSqlSchema } from './schema.sql';

const sqlSchema = generatedSqlSchema.authorization(allow => allow.authenticated());

const testSchema = a.schema({
    Todo: a
        .model({
            content: a.string(),
            isDone: a.boolean(),
        })
        .authorization(allow => allow.authenticated()),
});

const combinedSchema = a.combine([sqlSchema, testSchema]);

console.log("Combined schema: ", combinedSchema);

export type Schema = ClientSchema<typeof combinedSchema>;

export const data = defineData({
    schema: combinedSchema,
    authorizationModes: {
    },
});