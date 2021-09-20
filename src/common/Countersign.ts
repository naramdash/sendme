type Countersign = {
  challenge: string;
  password: string;
};

type CountersignWithId = Countersign & { id: string };

function isCounterSign(o: any): o is Countersign {
  const hasChallenge = "challenge" in o && typeof o.challenge === "string";
  const hasPassword = "password" in o && typeof o.password === "string";

  return hasChallenge && hasPassword;
}

export { Countersign, CountersignWithId, isCounterSign };
