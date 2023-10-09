import React from "react";

export default function LoginField({
  input,
  label,
  type,
  name,
  meta: { error, touched },
}) {
  var e = document.getElementById(label);
  if (touched && error) {
    e.classList.add("error");
    e.classList.remove("no-error");
  } else if (touched && !error) {
    e.classList.remove("error");
    e.classList.add("no-error");
  }
  return (
    <>
      <label key={label}>{label}</label>
      <input
        {...input}
        className="inputField no-error"
        type={type}
        placeholder={(touched && error) || label}
        id={label}
        key={label + "1"}
      />
    </>
  );
}
