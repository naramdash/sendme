import { CosmosClient } from "@azure/cosmos";

function getLinkContainer() {
  const CONNECTION_STRING = process.env.CONNECTION_STRING!;
  const client = new CosmosClient(CONNECTION_STRING);

  const DATABASE_STRING = "sendme";
  const database = client.database(DATABASE_STRING);

  const CONTAINER_STRING = "link";
  const container = database.container(CONTAINER_STRING);

  return container;
}

export { getLinkContainer };
