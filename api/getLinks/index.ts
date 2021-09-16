import { StatusCodes } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getLinkContainer } from "../container";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const container = getLinkContainer();

  const linkQuery = req.query.link;
  const sqlQuery = linkQuery
    ? {
        query: "SELECT * FROM link l WHERE l.link = @link",
        parameters: [
          {
            name: "@link",
            value: linkQuery,
          },
        ],
      }
    : {
        query: "SELECT * FROM link l",
      };

  const { resources: results } = await container.items
    .query(sqlQuery)
    .fetchAll();

  context.res = {
    status: results.length > 0 ? StatusCodes.Ok : StatusCodes.NotFound,
    body: results,
  };
};

export default httpTrigger;
