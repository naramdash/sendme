const CHALLENGE_NAME = "challenge";
const PASSWORD_NAME = "password";

class CounterSignForm extends HTMLElement {
  constructor() {
    super();

    const [challengeLabel, challengeInput] = createInputWithLabel(
      CHALLENGE_NAME,
      "text"
    );
    const [passwordLabel, passwordInput] = createInputWithLabel(
      PASSWORD_NAME,
      "url"
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

customElements.define("countersign-form", CounterSignForm);

function createInputWithLabel(
  labelName: string,
  type: string
): [HTMLLabelElement, HTMLInputElement] {
  const label = document.createElement("label");
  const input = document.createElement("input");
  label.insertAdjacentText("afterbegin", labelName);
  input.setAttribute("type", type);
  input.setAttribute("name", labelName);
  input.setAttribute("required", "true");
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

    await fetch("/api/countersigns", {
      method: "POST",
      body: JSON.stringify(request),
    });
  };
}
