import React from "react";

export default function CEFIELD({
  input,
  label,
  placeholder,
  type,
  name,
  id,
  meta: { error, touched },
}) {
  var e = document.getElementById(id);
  if (touched && error) {
    e.classList.add("error");
    e.classList.remove("no-error");
  } else if (touched && !error) {
    e.classList.remove("error");
    e.classList.add("no-error");
  }

  function ssnCheck(e) {
    const insert = e.nativeEvent.inputType === "insertText";
    const del = e.nativeEvent.inputType === "deleteContentBackward";

    const ss = document.getElementById("ss");
    const len = ss.value.length;
    const lenCon = len === 3 || len === 6;

    if ((lenCon && insert) || (lenCon && insert)) {
      ss.value += "-";
    }
    if ((lenCon && del) || (lenCon && del)) {
      ss.value = ss.value.substring(0, len - 1);
    }
  }

  function hrCheck(e) {
    const insert = e.nativeEvent.inputType === "insertText";

    const hr = document.getElementById("hr");
    const len = hr.value.length;
    const lenCon = len === 1;

    if ((lenCon && insert) || (lenCon && insert)) {
      hr.value = "$" + hr.value;
    }
  }

  function showSSN() {
    const ss = document.getElementById("ss");
    const lock = document.getElementById("lock");
    if (ss.type === "password") {
      ss.type = "text";
      lock.classList.remove("fa-lock");
      lock.classList.add("fa-lock-open");
    } else {
      ss.type = "password";
      lock.classList.remove("fa-lock-open");
      lock.classList.add("fa-lock");
    }
  }

  if (id === "ss") {
    return (
      <>
        <label key={label}>{label}</label>
        <div>
          <input
            {...input}
            className="inputField no-error"
            type={type}
            placeholder={(touched && error) || placeholder}
            id={id}
            key={label + "1"}
            onInput={(e) => ssnCheck(e)}
            maxLength={11}
          />
          <i
            className="fa-solid fa-lock"
            id="lock"
            onClick={() => showSSN()}
          ></i>
        </div>
      </>
    );
  } else if (id === "hr") {
    return (
      <>
        <label key={label}>{label}</label>
        <input
          {...input}
          className="inputField no-error"
          type={type}
          placeholder={(touched && error) || placeholder}
          id={id}
          key={label + "1"}
          onInput={(e) => hrCheck(e)}
        />
      </>
    );
  } else {
    return (
      <>
        <label key={label}>{label}</label>
        <input
          {...input}
          className="inputField no-error"
          type={type}
          placeholder={(touched && error) || placeholder}
          id={id}
          key={label + "1"}
        />
      </>
    );
  }
}
