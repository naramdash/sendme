import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getCountersignContainer } from "../common/Countersign";

const SECRET = process.env.SECRET!;

type DeleteCountersignRequestBody = {
  id: string;
  challenge: string;
  secret: string;
};

function isValidRequestBody(req: any): req is DeleteCountersignRequestBody {
  const hasId = typeof req.id === "string" && req.id.length > 0;
  const hasChallenge =
    typeof req.challenge === "string" && req.challenge.length > 0;
  const hasSecret = typeof req.secret === "string" && req.secret.length > 0;

  return hasId && hasChallenge && hasSecret;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (!isValidRequestBody(req.body)) {
    context.res = {
      status: StatusCodes.BadRequest,
    };
    return;
  }

  if (SECRET !== req.body.secret) {
    context.res = {
      status: StatusCodes.Forbidden,
    };
    return;
  }

  const countersigns = getCountersignContainer();
  try {
    await countersigns.item(req.body.id, req.body.challenge).delete();
    context.res = {
      status: StatusCodes.Ok /* Defaults to 200 */,
    };
    return;
  } catch {
    context.res = {
      status: StatusCodes.NotFound,
    };
  }
};

export default httpTrigger;
