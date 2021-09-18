import { CosmosClient } from "@azure/cosmos";

const CONNECTION_STRING = process.env.CONNECTION_STRING!;
const DATABASE_STRING = "sendme";

function getClient(connectionString: string) {
  return new CosmosClient(connectionString);
}

function getDatabase(client: CosmosClient, database: string) {
  return client.database(database);
}

function getContainer(container: string) {
  const client = getClient(CONNECTION_STRING);
  const database = getDatabase(client, DATABASE_STRING);

  return database.container(container);
}

export { getContainer };
