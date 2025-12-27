import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event, context) => {
  const url = process.env.API_URL;
  const officeIds = process.env.OFFICE_IDS.split(',');
  const region = process.env.REGION;
  const TableName = process.env.TABLE_NAME;
  
  const client = new DynamoDBClient({ region });
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  let res = [];
  const curDate = new Date();
  const reqTime = curDate.toISOString().slice(0, 13);
  for (const id of officeIds) {
    try {
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      //waitTime might not be the correct key
      if (data?.waitTime) {
        await ddbDocClient.send(
          new PutCommand({
            TableName,
            Item: {
              id,
              officeName: data.officeName,
              waitTime: data.waitTime,
              date: reqTime
            },
          })
        );
        res.push(`${id} success`)
      }
    } catch (err) {
      res.push(`${id}: ` + err.message);
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};
