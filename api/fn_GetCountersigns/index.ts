import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getCountersignContainer } from "../common/Countersign";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const challenge = req.query.challenge;
  const sqlQuery = challenge
    ? {
        query: "SELECT * FROM countersign c WHERE c.challenge = @challenge",
        parameters: [
          {
            name: "@challenge",
            value: challenge,
          },
        ],
      }
    : {
        query: "SELECT * FROM countersign c",
      };

  const countersigns = getCountersignContainer();
  const { resources: results } = await countersigns.items
    .query(sqlQuery)
    .fetchAll();

  context.res = {
    status: results.length > 0 ? StatusCodes.Ok : StatusCodes.NotFound,
    body: results.map((r) => ({
      challenge: r.challenge,
      password: r.password,
    })),
  };
};

export default httpTrigger;
