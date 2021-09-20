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
  const challenge = req.query.challenge;
  const sqlQuery = challenge
    ? makeQueryByChallenge(challenge)
    : "SELECT * FROM countersign c";

  const countersigns = getCountersignContainer();
  const { resources: results } = await countersigns.items
    .query<CountersignWithId>(sqlQuery)
    .fetchAll();

  context.res = {
    status: results.length > 0 ? StatusCodes.Ok : StatusCodes.NotFound,
    body: results.map((r) => mapToCountersignWithId(r)),
  };
};

export default httpTrigger;
