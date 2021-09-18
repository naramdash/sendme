import { getContainer } from "./CosmosConnector";

const CONTAINER_COUNTERSIGN_STRING = "countersign";

type CounterSign = {
  challenge: string;
  password: string;
};

function isCounterSign(o: any): o is CounterSign {
  const hasChallenge = "challenge" in o && typeof o.challenge === "string";
  const hasPassword = "password" in o && typeof o.password === "string";

  return hasChallenge && hasPassword;
}

function getCountersignContainer() {
  return getContainer(CONTAINER_COUNTERSIGN_STRING);
}

export { CounterSign, isCounterSign, getCountersignContainer };
