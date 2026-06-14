import { DynamoDBClient, PutItemCommand, QueryCommand, UpdateItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"

const TABLE = process.env.DYNAMODB_TABLE_NAME || "querymind-sessions"

export const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function recordQuery(orgId: string, userId: string, queryId: string, naturalLanguage: string, executionMs: number) {
  const now = new Date().toISOString()
  const ttl = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 90
  await dynamo.send(new PutItemCommand({
    TableName: TABLE,
    Item: marshall({ PK: `ORG#${orgId}`, SK: `QUERY#${userId}#${now}`, queryId, naturalLanguage: naturalLanguage.slice(0, 200), userId, executionMs, createdAt: now, ttl }),
  }))
}

export async function getOrgHistory(orgId: string, limit = 50) {
  const result = await dynamo.send(new QueryCommand({
    TableName: TABLE,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :prefix)",
    ExpressionAttributeValues: marshall({ ":pk": `ORG#${orgId}`, ":prefix": "QUERY#" }),
    ScanIndexForward: false,
    Limit: limit,
  }))
  return (result.Items || []).map(unmarshall)
}

export async function checkRateLimit(orgId: string, limit: number): Promise<{ allowed: boolean; current: number }> {
  const month = new Date().toISOString().slice(0, 7)
  try {
    const result = await dynamo.send(new UpdateItemCommand({
      TableName: TABLE,
      Key: marshall({ PK: `ORG#${orgId}`, SK: `RATELIMIT#${month}` }),
      UpdateExpression: "ADD #count :inc",
      ConditionExpression: "attribute_not_exists(#count) OR #count < :limit",
      ExpressionAttributeNames: { "#count": "count" },
      ExpressionAttributeValues: marshall({ ":inc": 1, ":limit": limit }),
      ReturnValues: "ALL_NEW",
    }))
    const current = result.Attributes ? unmarshall(result.Attributes).count : 1
    return { allowed: true, current }
  } catch (err: any) {
    if (err.name === "ConditionalCheckFailedException") return { allowed: false, current: limit }
    throw err
  }
}

export async function cacheSchema(dataSourceId: string, schema: object) {
  const ttl = Math.floor(Date.now() / 1000) + 3600
  await dynamo.send(new PutItemCommand({
    TableName: TABLE,
    Item: marshall({ PK: `DS#${dataSourceId}`, SK: "SCHEMA", schema: JSON.stringify(schema), ttl }),
  }))
}

export async function getCachedSchema(dataSourceId: string): Promise<object | null> {
  try {
    const result = await dynamo.send(new GetItemCommand({
      TableName: TABLE,
      Key: marshall({ PK: `DS#${dataSourceId}`, SK: "SCHEMA" }),
    }))
    if (!result.Item) return null
    const item = unmarshall(result.Item)
    if (item.ttl < Math.floor(Date.now() / 1000)) return null
    return JSON.parse(item.schema)
  } catch { return null }
}
