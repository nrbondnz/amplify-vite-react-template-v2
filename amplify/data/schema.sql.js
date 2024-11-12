/* eslint-disable */
/* THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import { a } from "@aws-amplify/data-schema";
import { configure } from "@aws-amplify/data-schema/internals";
import { secret } from "@aws-amplify/backend";
export const schema = configure({
    database: {
        identifier: "IDKqHBfCxHbSCsl0OIO7GcFg",
        engine: "mysql",
        connectionUri: secret("SQL_CONNECTION_STRING"),
        vpcConfig: {
            vpcId: "vpc-720a3e15",
            securityGroupIds: [
                "sg-86ef94f9"
            ],
            subnetAvailabilityZones: [
                {
                    subnetId: "subnet-7428a72c",
                    availabilityZone: "ap-southeast-2c"
                },
                {
                    subnetId: "subnet-7a1b1233",
                    availabilityZone: "ap-southeast-2a"
                },
                {
                    subnetId: "subnet-6ac3df0d",
                    availabilityZone: "ap-southeast-2b"
                }
            ]
        }
    }
}).schema({
    "action_states": a.model({
        id: a.integer().required(),
        LOADED: a.string().required(),
        appPage: a.string(),
        appCommand: a.string(),
        entityId: a.integer(),
        entityName: a.string(),
        parentId: a.integer(),
        parentName: a.string()
    }).identifier([
        "id"
    ]),
    "locations": a.model({
        id: a.integer().required(),
        entityName: a.string()
    }).identifier([
        "id"
    ]),
    "machines": a.model({
        id: a.integer().required(),
        entityName: a.string().required(),
        displayNum: a.integer().required(),
        idLocation: a.integer().required()
    }).identifier([
        "id"
    ]),
    "exercises": a.model({
        id: a.integer().required(),
        entityName: a.string().required(),
        idMachine: a.integer().required(),
        description: a.string().required(),
        idUser: a.integer(),
        displayNum: a.integer()
    }).identifier([
        "id"
    ]),
    "muscles": a.model({
        id: a.integer().required(),
        entityName: a.string().required(),
        displayNum: a.integer().required(),
        description: a.string().required(),
        idParent: a.integer()
    }).identifier([
        "id"
    ]),
    "settings": a.model({
        id: a.integer().required(),
        value: a.string(),
        entityId: a.integer(),
        entityType: a.string(),
        name: a.string()
    }).identifier([
        "id"
    ]),
    "user_details": a.model({
        id: a.integer().required(),
        name: a.string().required(),
        email: a.string().required(),
        phoneNumber: a.string(),
        idLocation: a.integer().required(),
        roles: a.json().required()
    }).identifier([
        "id"
    ]),
    "workouts": a.model({
        id: a.integer().required(),
        idUser: a.integer().required(),
        entityName: a.string().required()
    }).identifier([
        "id"
    ]),
    "session_workouts": a.model({
        id: a.integer().required(),
        idUser: a.integer().required(),
        idWorkout: a.integer().required(),
        complete: a.integer(),
        entityName: a.string()
    }).identifier([
        "id"
    ]),
    "session_workout_exercises": a.model({
        id: a.integer().required(),
        idSessionWorkout: a.integer().required(),
        idExercise: a.integer(),
        entityName: a.string()
    }).identifier([
        "id"
    ]),
    "workout_exercises": a.model({
        id: a.integer().required(),
        entityName: a.string().required(),
        idUser: a.integer().required(),
        idWorkout: a.integer().required(),
        idMachine: a.integer().required(),
        idExercise: a.integer().required(),
        max: a.string().required()
    }).identifier([
        "id"
    ])
});