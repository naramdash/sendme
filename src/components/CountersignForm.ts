import { createCountersign } from "../common/API";
import CountersignTable, {
  TAG_NAME as COUNTERSIGN_TABLE_TAG_NAME,
} from "./CountersignTable";

const CHALLENGE_NAME = "challenge";
const PASSWORD_NAME = "password";

const CHALLENGE_EXAMPLE = "good-game";
const PASSWORD_EXAMPLE = "https://store.steampowered.com/app/470310/_/";

const TAG_NAME = "countersign-form";

class CounterSignForm extends HTMLElement {
  constructor() {
    super();

    const [challengeLabel, challengeInput] = createInputWithLabel(
      CHALLENGE_NAME,
      "text",
      CHALLENGE_EXAMPLE
    );
    challengeInput.addEventListener("input", function () {
      this.value = this.value
        .replaceAll(" ", "-")
        .replaceAll(/[~!@#$%^&*()_+={}[\]|\\:;'\"<>,.?\/]/g, "")
        .toLocaleLowerCase();
    });

    const [passwordLabel, passwordInput] = createInputWithLabel(
      PASSWORD_NAME,
      "url",
      PASSWORD_EXAMPLE
    );

    const submitButton = document.createElement("button");
    submitButton.insertAdjacentText("afterbegin", "submit");

    const form = document.createElement("form");
    form.append(challengeLabel, passwordLabel, submitButton);
    form.onsubmit = createOnSubmitCreateCountersign(
      challengeInput,
      passwordInput
    );

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(form);
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, CounterSignForm);
}

function createInputWithLabel(
  labelName: string,
  type: string,
  placeholder: string
): [HTMLLabelElement, HTMLInputElement] {
  const label = document.createElement("label");
  const input = document.createElement("input");
  label.insertAdjacentText("afterbegin", labelName);
  input.setAttribute("type", type);
  input.setAttribute("name", labelName);
  input.setAttribute("required", "");
  input.setAttribute("placeholder", placeholder);
  label.appendChild(input);

  return [label, input];
}

function createOnSubmitCreateCountersign(
  challengeInput: HTMLInputElement,
  passwordInput: HTMLInputElement
) {
  return async function (event: Event) {
    event.preventDefault();

    const request = {
      challenge: challengeInput.value,
      password: passwordInput.value,
    };

    await createCountersign(request);

    const table = document.getElementsByTagName(
      COUNTERSIGN_TABLE_TAG_NAME
    )[0] as CountersignTable;
    table.updateCountersigns();
  };
}
