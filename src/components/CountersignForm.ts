import { createCountersign } from "../common/API";
import CountersignTable, {
  TAG_NAME as COUNTERSIGN_TABLE_TAG_NAME,
} from "./CountersignTable";

const CHALLENGE_NAME = "challenge";
const PASSWORD_NAME = "password";
const EXPIRED_NAME = "expired";

const CHALLENGE_EXAMPLE = "good-game";
const PASSWORD_EXAMPLE = "https://store.steampowered.com/app/470310/_/";

const TAG_NAME = "countersign-form";

const OPTION_PRESETS = [
  {
    value: "",
    text: "unlimited",
  },
  {
    value: 1,
    text: "1 Hour",
  },
  {
    value: 3,
    text: "3 Hours",
  },
  {
    value: 12,
    text: "12 Hours",
  },
  {
    value: 24,
    text: "1 Day",
  },
  {
    value: 72,
    text: "3 Days",
  },
];

const UNLIMITED_DATE_ISOSTRING = new Date("9999-01-01").toISOString();

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

    const expiredLabel = document.createElement("label");
    expiredLabel.insertAdjacentText("afterbegin", EXPIRED_NAME);
    const expiredSelect = createOptionsWithExpiredSelect();
    expiredLabel.appendChild(expiredSelect);

    const submitButton = document.createElement("button");
    submitButton.insertAdjacentText("afterbegin", "submit");

    const form = document.createElement("form");
    form.append(challengeLabel, passwordLabel, expiredLabel, submitButton);
    form.onsubmit = createOnSubmitCreateCountersign(
      challengeInput,
      passwordInput,
      expiredSelect
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

function createOptionsWithExpiredSelect() {
  const options = OPTION_PRESETS.map((preset) => {
    const option = document.createElement("option");
    option.setAttribute("value", preset.value.toString());
    option.insertAdjacentText("afterbegin", preset.text);
    return option;
  });

  const select = document.createElement("select");
  select.append(...options);
  select.setAttribute("required", "");
  select.value = "";

  return select;
}

function createOnSubmitCreateCountersign(
  challengeInput: HTMLInputElement,
  passwordInput: HTMLInputElement,
  expiredSelect: HTMLSelectElement
) {
  return async function (event: Event) {
    event.preventDefault();

    const expiredDateISOString =
      expiredSelect.value === ""
        ? UNLIMITED_DATE_ISOSTRING
        : new Date(
            new Date().setHours(
              new Date().getHours() + parseInt(expiredSelect.value)
            )
          ).toISOString();

    const request = {
      challenge: challengeInput.value,
      password: passwordInput.value,
      expired: expiredDateISOString,
    };

    await createCountersign(request);

    const table = document.getElementsByTagName(
      COUNTERSIGN_TABLE_TAG_NAME
    )[0] as CountersignTable;
    table.updateCountersigns();
  };
}
