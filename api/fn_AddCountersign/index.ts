import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  Countersign,
  CountersignWithId,
  getCountersignContainer,
  isCounterSign,
} from "../common/Countersign";
import { mapTo } from "../common/Functions";

type CreateRequest = Countersign & {};
function isCreateRequest(o: any): o is CreateRequest {
  return isCounterSign(o);
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const container = getCountersignContainer();

  if (!isCreateRequest(req.body)) {
    context.res = {
      status: StatusCodes.BadRequest,
      body: req,
    };
    return;
  }

  const result = await container.items.create(mapTo<Countersign>(req.body));

  fetch(process.env.DISCORD_WEBHOOK_CREATED!, {
    method: "POST",
    body: JSON.stringify({
      content: `${new Date().toISOString()}: FROM ${req.body.challenge} TO ${
        req.body.password
      }`,
    }),
  });

  context.res = {
    status: StatusCodes.Ok,
    body: mapTo<CountersignWithId>(result.resource!),
  };
};

export default httpTrigger;
