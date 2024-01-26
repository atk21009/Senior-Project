import xIcon from "../imgs/x-solid.svg";

// Error Handling ----------------------------------------------------
export default function ErrMessage(error) {
  if (error.response) {
    const root = document.getElementById("root");

    const errCtnr = document.createElement("div");
    errCtnr.classList.add("error-message");
    errCtnr.id = "ErrCtnr";

    function checkInside(event) {
      const ClickInside = errCtnr.contains(event.target);
      const button = event.target.localName === "button";

      if (!ClickInside && !button) {
        errCtnr.remove();
        document.removeEventListener("click", checkInside);
      }
    }

    document.addEventListener("click", checkInside);

    const h1 = document.createElement("h1");
    h1.innerText = "Error";

    function closeErr() {
      errCtnr.remove();
    }
    const img = document.createElement("img");
    img.src = xIcon;
    img.alt = "X";
    img.onclick = () => closeErr();

    const errMes = document.createElement("div");
    errMes.innerText = error.response.data;

    if (!document.getElementById("ErrCtnr")) {
      errCtnr.appendChild(h1);
      errCtnr.appendChild(img);
      errCtnr.appendChild(errMes);
      root.appendChild(errCtnr);
    }
  }
}
