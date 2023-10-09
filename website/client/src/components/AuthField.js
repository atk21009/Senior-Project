import React from "react";

export default function BookingField({
  input,
  label,
  meta: { error, touched },
}) {
  var e = document.getElementById(label);
  if (touched && error) {
    e.classList.add("error");
  } else if (touched && !error) {
    e.classList.remove("error");
  }
  return (
    <>
      <input
        {...input}
        className="inputField"
        placeholder={(touched && error) || label}
        id={label}
      />
    </>
  );
}
