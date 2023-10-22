import React from "react";

export default function COFIELD({
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
