import xIcon from "../imgs/x-solid.svg";

export default function PromptPassword(_this, type, data) {
  let isValid = false;
  switch (type) {
    case "delete":
      isValid = true;
      break;
    case "update":
      isValid = true;
      break;
    case "updateOrg":
      isValid = true;
      break;
    case "delOrg":
      isValid = true;
      break;
    default:
      isValid = false;
      break;
  }
  if (isValid) {
    const root = document.getElementById("root");

    const Ctnr = document.createElement("div");
    Ctnr.classList.add("error-message");
    Ctnr.id = "PromptPass";

    const h1 = document.createElement("h1");
    h1.innerText = "Enter Password";

    function closeErr() {
      Ctnr.remove();
    }
    const img = document.createElement("img");
    img.src = xIcon;
    img.alt = "X";
    img.onclick = closeErr;

    const div = document.createElement("div");
    div.classList.add("passPromptDetails");

    const inputCtnr = document.createElement("div");
    inputCtnr.classList.add("passPromptCtnr");

    const input = document.createElement("input");
    input.placeholder = "Enter password...";
    input.id = "PasswordInput";
    input.classList.add("passPromptInput");
    input.type = "password";

    const submitBtn = document.createElement("button");
    submitBtn.onclick = () =>
      _this.props.promptPass(input.value, _this, type, data);
    submitBtn.innerText = "Confirm";
    submitBtn.classList.add("passPromptBtn");

    const lock = document.createElement("i");
    lock.classList.add("fa-solid");
    lock.classList.add("fa-lock");
    lock.classList.add("passPromptI");
    lock.id = "lock";
    function showPass() {
      if (input.type === "password") {
        input.type = "text";
        lock.classList.remove("fa-lock");
        lock.classList.add("fa-lock-open");
      } else {
        input.type = "password";
        lock.classList.remove("fa-lock-open");
        lock.classList.add("fa-lock");
      }
    }
    lock.onclick = () => showPass();

    const passCtnr = document.createElement("div");
    passCtnr.classList.add("passPromptInputCtnr");

    passCtnr.appendChild(input);
    passCtnr.appendChild(lock);
    inputCtnr.appendChild(passCtnr);
    inputCtnr.appendChild(submitBtn);

    div.appendChild(inputCtnr);

    if (!document.getElementById("PromptPass")) {
      Ctnr.appendChild(h1);
      Ctnr.appendChild(img);
      Ctnr.appendChild(div);
      if (type === "delOrg") {
        const msg = document.createElement("div");
        msg.innerHTML = "Warning this action is irreversible";
        msg.classList.add("delete-msg");

        Ctnr.appendChild(msg);
      }
      root.appendChild(Ctnr);
    }

    function checkInside(event) {
      const isClickInside = Ctnr.contains(event.target);
      const button = event.target.localName === "button";
      if (!isClickInside && !button) {
        Ctnr.remove();
        document.removeEventListener("click", checkInside);
      }
    }

    document.addEventListener("click", checkInside);
  }
}
