import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  CountersignWithId,
  getCountersignContainer,
  makeQueryByChallenge,
  mapToCountersignWithId,
} from "../common/Countersign";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const challenge = req.params.challenge;

  if (typeof challenge === "undefined" || challenge.length == 0) {
    context.res = {
      status: StatusCodes.BadRequest,
    };
    return;
  }

  const countersigns = getCountersignContainer();
  const { resources: results } = await countersigns.items
    .query<CountersignWithId>(makeQueryByChallenge(challenge))
    .fetchNext();

  if (results.length <= 0) {
    context.res = {
      status: StatusCodes.NotFound,
    };
    return;
  }

  context.res = {
    status: StatusCodes.Ok /* Defaults to 200 */,
    body: mapToCountersignWithId(results[0]),
  };
};

export default httpTrigger;
