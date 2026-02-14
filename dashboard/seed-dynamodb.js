import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const region = process.env.AWS_REGION;
const endpoint = process.env.DYNAMODB_ENDPOINT;
const tableName = process.env.TABLE_NAME;

const client = new DynamoDBClient({ region, endpoint });
const docClient = DynamoDBDocumentClient.from(client);

const mockData = {"items":[{"date":"2025-12-30T19","officeName":"North Vancouver - North Shore","waitTimeSeconds":2700,"officeId":"5911"},{"date":"2025-12-30T20","officeName":"North Vancouver - North Shore","waitTimeSeconds":2700,"officeId":"5911"},{"date":"2025-12-30T21","officeName":"North Vancouver - North Shore","waitTimeSeconds":2700,"officeId":"5911"},{"date":"2025-12-30T22","officeName":"North Vancouver - North Shore","waitTimeSeconds":2700,"officeId":"5911"},{"date":"2025-12-30T23","officeName":"North Vancouver - North Shore","waitTimeSeconds":2700,"officeId":"5911"},{"date":"2025-12-31T18","officeName":"North Vancouver - North Shore","waitTimeSeconds":900,"officeId":"5911"},{"date":"2025-12-31T20","officeName":"North Vancouver - North Shore","waitTimeSeconds":2700,"officeId":"5911"},{"date":"2025-12-31T22","officeName":"North Vancouver - North Shore","waitTimeSeconds":900,"officeId":"5911"},{"date":"2025-12-30T19","officeName":"Richmond","waitTimeSeconds":900,"officeId":"5912"},{"date":"2025-12-30T20","officeName":"Richmond","waitTimeSeconds":1800,"officeId":"5912"},{"date":"2025-12-30T21","officeName":"Richmond","waitTimeSeconds":1800,"officeId":"5912"},{"date":"2025-12-30T22","officeName":"Richmond","waitTimeSeconds":900,"officeId":"5912"},{"date":"2025-12-30T23","officeName":"Richmond","waitTimeSeconds":900,"officeId":"5912"},{"date":"2025-12-31T18","officeName":"Richmond","waitTimeSeconds":900,"officeId":"5912"},{"date":"2025-12-31T20","officeName":"Richmond","waitTimeSeconds":900,"officeId":"5912"},{"date":"2025-12-31T22","officeName":"Richmond","waitTimeSeconds":1800,"officeId":"5912"},{"date":"2025-12-30T19","officeName":"Richmond","waitTimeSeconds":4500,"officeId":"5003"},{"date":"2025-12-30T20","officeName":"Richmond","waitTimeSeconds":4500,"officeId":"5003"},{"date":"2025-12-30T21","officeName":"Richmond","waitTimeSeconds":4500,"officeId":"5003"},{"date":"2025-12-30T22","officeName":"Richmond","waitTimeSeconds":3600,"officeId":"5003"},{"date":"2025-12-30T23","officeName":"Richmond","waitTimeSeconds":3600,"officeId":"5003"},{"date":"2025-12-31T18","officeName":"Richmond","waitTimeSeconds":2700,"officeId":"5003"},{"date":"2025-12-31T20","officeName":"Richmond","waitTimeSeconds":3600,"officeId":"5003"},{"date":"2025-12-31T22","officeName":"Richmond","waitTimeSeconds":1800,"officeId":"5003"},{"date":"2025-12-30T19","officeName":"Vancouver","waitTimeSeconds":6300,"officeId":"5001"},{"date":"2025-12-30T20","officeName":"Vancouver","waitTimeSeconds":5400,"officeId":"5001"},{"date":"2025-12-30T21","officeName":"Vancouver","waitTimeSeconds":5400,"officeId":"5001"},{"date":"2025-12-30T22","officeName":"Vancouver","waitTimeSeconds":5400,"officeId":"5001"},{"date":"2025-12-30T23","officeName":"Vancouver","waitTimeSeconds":5400,"officeId":"5001"},{"date":"2025-12-31T18","officeName":"Vancouver","waitTimeSeconds":2700,"officeId":"5001"},{"date":"2025-12-31T20","officeName":"Vancouver","waitTimeSeconds":1800,"officeId":"5001"},{"date":"2025-12-31T22","officeName":"Vancouver","waitTimeSeconds":900,"officeId":"5001"},{"date":"2025-12-30T19","officeName":"Vancouver East","waitTimeSeconds":900,"officeId":"5922"},{"date":"2025-12-30T20","officeName":"Vancouver East","waitTimeSeconds":900,"officeId":"5922"},{"date":"2025-12-30T21","officeName":"Vancouver East","waitTimeSeconds":3600,"officeId":"5922"},{"date":"2025-12-30T22","officeName":"Vancouver East","waitTimeSeconds":3600,"officeId":"5922"},{"date":"2025-12-30T23","officeName":"Vancouver East","waitTimeSeconds":3600,"officeId":"5922"},{"date":"2025-12-31T18","officeName":"Vancouver East","waitTimeSeconds":900,"officeId":"5922"},{"date":"2025-12-31T20","officeName":"Vancouver East","waitTimeSeconds":900,"officeId":"5922"},{"date":"2025-12-31T22","officeName":"Vancouver East","waitTimeSeconds":900,"officeId":"5922"},{"date":"2025-12-30T19","officeName":"Vancouver - Sinclair","waitTimeSeconds":900,"officeId":"5908"},{"date":"2025-12-30T20","officeName":"Vancouver - Sinclair","waitTimeSeconds":900,"officeId":"5908"},{"date":"2025-12-30T21","officeName":"Vancouver - Sinclair","waitTimeSeconds":2700,"officeId":"5908"},{"date":"2025-12-30T22","officeName":"Vancouver - Sinclair","waitTimeSeconds":1800,"officeId":"5908"},{"date":"2025-12-30T23","officeName":"Vancouver - Sinclair","waitTimeSeconds":1800,"officeId":"5908"},{"date":"2025-12-31T18","officeName":"Vancouver - Sinclair","waitTimeSeconds":900,"officeId":"5908"},{"date":"2025-12-31T22","officeName":"Vancouver - Sinclair","waitTimeSeconds":900,"officeId":"5908"},{"date":"2025-12-30T19","officeName":"Vancouver (West Broadway)","waitTimeSeconds":900,"officeId":"5823"},{"date":"2025-12-30T20","officeName":"Vancouver (West Broadway)","waitTimeSeconds":900,"officeId":"5823"},{"date":"2025-12-30T21","officeName":"Vancouver (West Broadway)","waitTimeSeconds":3600,"officeId":"5823"},{"date":"2025-12-30T22","officeName":"Vancouver (West Broadway)","waitTimeSeconds":4500,"officeId":"5823"},{"date":"2025-12-30T23","officeName":"Vancouver (West Broadway)","waitTimeSeconds":4500,"officeId":"5823"},{"date":"2025-12-31T18","officeName":"Vancouver (West Broadway)","waitTimeSeconds":900,"officeId":"5823"},{"date":"2025-12-31T20","officeName":"Vancouver (West Broadway)","waitTimeSeconds":1800,"officeId":"5823"},{"date":"2025-12-31T22","officeName":"Vancouver (West Broadway)","waitTimeSeconds":900,"officeId":"5823"}]};

console.log(region, endpoint, tableName);

async function dropTableIfExists() {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    console.log(`Dropping table '${tableName}'...`);
    await client.send(new DeleteTableCommand({ TableName: tableName }));
    let deleted = false;
    while (!deleted) {
      try {
        await client.send(new DescribeTableCommand({ TableName: tableName }));
        await new Promise(res => setTimeout(res, 1000));
      } catch (err) {
        if (err.name === "ResourceNotFoundException") {
          deleted = true;
        } else {
          throw err;
        }
      }
    }
    console.log(`Table '${tableName}' deleted.`);
  } catch (err) {
    if (err.name === "ResourceNotFoundException") {
      console.log(`Table '${tableName}' does not exist, nothing to drop.`);
    } else {
      throw err;
    }
  }
}

async function createTable() {
    console.log(`Creating ${tableName} table`);
    await client.send(new CreateTableCommand({
    TableName: tableName,
    AttributeDefinitions: [
        { AttributeName: "officeId", AttributeType: "S" },
        { AttributeName: "date", AttributeType: "S" }
    ],
    KeySchema: [
        { AttributeName: "officeId", KeyType: "HASH" },
        { AttributeName: "date", KeyType: "RANGE" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
    }));
    console.log(`Table '${tableName}' created`);
}

async function seed() {
  await dropTableIfExists();
  await createTable();
  console.log("Seeding started");
  for (const item of mockData.items) {
    const params = {
      TableName: tableName,
      Item: item,
    };
    try {
      await docClient.send(new PutCommand(params));
      console.log('Seeded mock data into ', tableName);
    } catch (err) {
      console.error('Error seeding', err);
    }
  }
}

seed();
