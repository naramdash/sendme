import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getCountersignContainer } from "../common/Countersign";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const id = req.params.id!;
  const countersigns = getCountersignContainer();

  await countersigns.item(id).delete();

  context.res = {
    status: 200 /* Defaults to 200 */,
  };
};

export default httpTrigger;
