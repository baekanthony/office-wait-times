import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import offices from './offices.json' with { type: "json" };

export const handler = async (event, context) => {
  const url = process.env.API_URL;
  const officeIds = Object.keys(offices);
  const region = process.env.REGION;
  const TableName = process.env.TABLE_NAME;
  
  const client = new DynamoDBClient({ region });
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  const fetchResults = [];
  const curDate = new Date();
  const reqTime = curDate.toISOString().slice(0, 13);

  async function fetchWaitTimeAPI(officeId) {
    try {
      const response = await fetch(`${url}/${officeId}`);
      const data = await response.json();
      return data;
    } catch (err) {
      return { error: err.message, officeId };
    }
  }

  function formatData(fetchResults) {
    return fetchResults
      .filter(result => !result.error && result?.waitTimeManualSeconds)
      .map((data) => ({
        PutRequest: {
          Item: {
            officeId: data.posui,
            waitTimeSeconds: data.waitTimeManualSeconds,
            date: reqTime                        
          }
        }
      }));
  }

  async function batchWrite(batchItems) {
    try {
      const result = await ddbDocClient.send(
        new BatchWriteCommand({
          RequestItems: {
            [TableName]: batchItems
          }
        })
      );
      return { success: true, unprocessedItems: result.UnprocessedItems };
    } catch (err) {
      console.error('Batch write failed:', err);
      return { success: false, err: err.message };
    }
  }

  const firstData = await fetchWaitTimeAPI(officeIds[0]);

  // Should stop fetching since if 1 office is on holiday, all are
  // Also assumes if 1 office is close all are since they have same hours
  if (firstData?.isHoliday || firstData?.isClosed) {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Holiday, stopped fetches" }),
    };
  }
  fetchResults.push(firstData);

  for (let i = 1; i < officeIds.length; i++) {
    fetchResults.push(await fetchWaitTimeAPI(officeIds[i]));
  }

  const res = await batchWrite(formatData(fetchResults));
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};
