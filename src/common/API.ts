import * as Routes from "../common/Route";
import { Countersign, CountersignWithId } from "../common/Countersign";

export async function getCountersigns(): Promise<CountersignWithId[]> {
  return await (await fetch(Routes.COUNTERSIGNS)).json();
}

export async function createCountersign(countersign: Countersign) {
  return await fetch(Routes.COUNTERSIGNS, {
    method: "POST",
    body: JSON.stringify(countersign),
  });
}

export async function deleteCountersign(id: string, challenge: string) {
  return await fetch(Routes.COUNTERSIGNS, {
    method: "DELETE",
    body: JSON.stringify({ id, challenge }),
  });
}
