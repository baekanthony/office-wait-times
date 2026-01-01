import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from 'next/server';

const region = process.env.REGION;

const client = new DynamoDBClient({ region });
const docClient = DynamoDBDocumentClient.from(client);
const TableName = process.env.TABLE_NAME;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const officeId = searchParams.get('officeId');

  try {
    if (officeId) {
      const params = {
        TableName,
        KeyConditionExpression: 'officeId = :officeId',
        ExpressionAttributeValues: {
          ':officeId': officeId,
        },
      };
      const result = await docClient.send(new QueryCommand(params));
      return NextResponse.json({ items: result.Items });
    } else {
      const result = await docClient.send(new ScanCommand({ TableName }));
      return NextResponse.json({ items: result.Items });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

