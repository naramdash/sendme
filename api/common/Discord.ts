import { Countersign } from "./Countersign";
import * as https from "https";

const DISCORD_WEBHOOK_CREATED = process.env.DISCORD_WEBHOOK_CREATED!;

function sendCountersignCreatedAlert(countersign: Countersign) {
  const body = JSON.stringify({
    content: `=============\r\nAT ${new Date().toISOString()}: \r\nFROM ${
      countersign.challenge
    } \r\nTO ${countersign.password}`,
  });

  const request = https.request(DISCORD_WEBHOOK_CREATED, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  });
  request.write(body);
  request.end();
}

export { sendCountersignCreatedAlert };
