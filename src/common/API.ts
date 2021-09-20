import * as Routes from "../common/Route";
import { CountersignWithId } from "../common/Countersign";

export async function getCountersigns(): Promise<CountersignWithId[]> {
  return await (await fetch(Routes.COUNTERSIGNS)).json();
}

const UNLIMITED_DATE_ISOSTRING = new Date("9999-01-01").toISOString();

export async function createCountersign(
  challenge: string,
  password: string,
  ttlAsSecond: number
) {
  const expiredDateISOString =
    ttlAsSecond === -1
      ? UNLIMITED_DATE_ISOSTRING
      : new Date(
          new Date().setSeconds(new Date().getSeconds() + ttlAsSecond)
        ).toISOString();
  return await fetch(Routes.COUNTERSIGNS, {
    method: "POST",
    body: JSON.stringify({
      challenge,
      password,
      expired: expiredDateISOString,
      ttl: ttlAsSecond,
    }),
  });
}

export async function deleteCountersign(
  id: string,
  challenge: string,
  secret: string
) {
  return await fetch(Routes.COUNTERSIGNS, {
    method: "DELETE",
    body: JSON.stringify({ id, challenge, secret }),
  });
}
