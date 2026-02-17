import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from 'next/server';

const region = process.env.AWS_REGION;
const endpoint = process.env.DYNAMODB_ENDPOINT;

const client = new DynamoDBClient({ region, endpoint });
const docClient = DynamoDBDocumentClient.from(client);
const TableName = process.env.TABLE_NAME;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const officeId = searchParams.get('officeId');

  //TODO: controllers for queried fetch?
  try {
    //TODO: does this route ever get used?
    if (officeId) {
      const params = {
        TableName,
        KeyConditionExpression: 'officeId = :officeId',
        ExpressionAttributeValues: {
          ':officeId': officeId,
        },
      };
      //await?
      const result = await docClient.send(new QueryCommand(params));
      return NextResponse.json({ items: result.Items });
    } else {
      const result = await docClient.send(new ScanCommand({ TableName }));
      return NextResponse.json({ items: result.Items });
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

