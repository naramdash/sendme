import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  CounterSign,
  getCountersignContainer,
  isCounterSign,
} from "../common/Countersign";

type CreateRequest = CounterSign & {};
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
    body: result,
  };
};

export default httpTrigger;
