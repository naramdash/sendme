import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  CountersignWithId,
  getCountersignContainer,
  makeQueryByChallenge,
} from "../common/Countersign";
import { mapTo } from "../common/Functions";

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
    status: StatusCodes.Ok,
    body: results.map((r) => mapTo<CountersignWithId>(r)),
  };
};

export default httpTrigger;
