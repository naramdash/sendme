import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CountersignWithId } from "../common/Countersign";

type ResponseBody = {
  challenge: string;
  password: string;
  expired: string;
  id: string;
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  countersigns: CountersignWithId[]
): Promise<void> {
  const challenge = req.params.challenge;
  if (typeof challenge === "undefined" || countersigns.length === 0) {
    context.res = {
      status: StatusCodes.BadRequest,
    };
    return;
  }

  const resBody: ResponseBody = {
    challenge: countersigns[0].challenge,
    password: countersigns[0].password,
    expired: countersigns[0].expired,
    id: countersigns[0].id,
  };

  context.res = {
    status: StatusCodes.Ok /* Defaults to 200 */,
    body: resBody,
  };
};

export default httpTrigger;
