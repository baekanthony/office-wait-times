import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import offices from './offices.json';

export const handler = async (event, context) => {
  const url = process.env.API_URL;
  const officeIds = Object.keys(offices);
  const region = process.env.REGION;
  const TableName = process.env.TABLE_NAME;
  
  const client = new DynamoDBClient({ region });
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  let res = [];
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

  //TODO: look into Batch writes (probably fine since small # of writes)
  async function insertWaitTime(data, officeId) {
    if (data?.waitTimeManualSeconds) {
      await ddbDocClient.send(
        new PutCommand({
          TableName,
          Item: {
            officeId,
            officeName: data.officeName,
            waitTimeSeconds: data.waitTimeManualSeconds,
            date: reqTime
          },
        })
      );
      return `${officeId}:${reqTime} success`;
    }
  }

  async function handleFetchedData(data, officeId) {
    return data.error ? data : await insertWaitTime(data, officeId);
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const firstData = await fetchWaitTimeAPI(officeIds[0]);

  //Should stop fetching since if 1 office is on holiday, all are
  if (firstData?.isHoliday) {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Holiday, stopped fetches" }),
    };
  }
  res.push(await handleFetchedData(firstData, officeIds[0]));

  const promises = officeIds.slice(1).map((officeId, i) => {
    const delayMs = (i + 1) * 60000;
    return delay(delayMs).then(async () => {
      const data = await fetchWaitTimeAPI(officeId);
      res.push(await handleFetchedData(data, officeId));
    });
  });

  await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};
