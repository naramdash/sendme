import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CountersignWithId } from "../common/Countersign";

type ResponseBody = {
  challenge: string;
  password: string;
  expired: string;
  id: string;
}[];

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  countersigns: CountersignWithId[]
): Promise<void> {
  const resBody: ResponseBody = countersigns.map((c) => ({
    challenge: c.challenge,
    password: c.password,
    expired: c.expired,
    id: c.id,
  }));
  context.res = {
    status: StatusCodes.Ok,
    body: resBody,
  };
};

export default httpTrigger;
