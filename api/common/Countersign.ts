import { getContainer } from "./CosmosConnector";

const CONTAINER_COUNTERSIGN_STRING = "countersign";

type Countersign = {
  challenge: string;
  password: string;
  expired: string;
};

type CountersignWithId = Countersign & { id: string };

function isCounterSign(o: any): o is Countersign {
  const hasChallenge = "challenge" in o && typeof o.challenge === "string";
  const hasPassword = "password" in o && typeof o.password === "string";
  const hasExpired = "expired" in o && typeof o.expired === "string";

  return hasChallenge && hasPassword && hasExpired;
}

function getCountersignContainer() {
  return getContainer(CONTAINER_COUNTERSIGN_STRING);
}

export {
  Countersign,
  CountersignWithId,
  isCounterSign,
  getCountersignContainer,
};
