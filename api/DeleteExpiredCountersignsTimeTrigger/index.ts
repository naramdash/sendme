import { AzureFunction, Context } from "@azure/functions";
import {
  CountersignWithId,
  getCountersignContainer,
} from "../common/Countersign";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  const sqlQuery = "SELECT * FROM countersign c where c.expired > udf.now()";

  const countersigns = getCountersignContainer();
  const { resources: results } = await countersigns.items
    .query<CountersignWithId>(sqlQuery)
    .fetchAll();

  const deleteOrders = results.map((result) =>
    countersigns.item(result.id, result.challenge).delete()
  );

  await Promise.all(deleteOrders);

  context.log("DELETE_EXPIRED_COUNTERSIGNS_COMPLETE");
};

export default timerTrigger;
