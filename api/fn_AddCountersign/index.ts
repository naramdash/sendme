import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  Countersign,
  getCountersignContainer,
  isCounterSign,
} from "../common/Countersign";

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

  const result = await container.items.create(req.body);

  context.res = {
    status: 200,
    body: {
      challenge: result.resource?.challenge,
      password: result.resource?.password,
    },
  };
};

export default httpTrigger;
