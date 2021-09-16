import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getLinkContainer } from "../container";

type CreateLinkRequest = {
  link: string;
  alias: string;
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const container = getLinkContainer();

  const createLinkRequest = req.body as CreateLinkRequest;

  await container.items.create(createLinkRequest);

  context.res = {
    status: 200,
    // body: results,
  };
};

export default httpTrigger;
