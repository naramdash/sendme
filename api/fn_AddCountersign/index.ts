import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Countersign, isCounterSign } from "../common/Countersign";
import { sendCountersignCreatedAlert } from "../common/Discord";

type CreateRequest = Countersign & {};
function isCreateRequest(o: any): o is CreateRequest {
  return isCounterSign(o);
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (!isCreateRequest(req.body)) {
    context.res = {
      status: StatusCodes.BadRequest,
      body: req,
    };
    return;
  }

  const document: { challenge: string; password: string; expired: string } = {
    challenge: req.body.challenge,
    password: req.body.password,
    expired: req.body.expired,
  };
  context.bindings.countersignDocument = JSON.stringify(document);

  sendCountersignCreatedAlert(req.body);
  context.res = {
    status: StatusCodes.Ok,
    body: document,
  };
};

export default httpTrigger;
