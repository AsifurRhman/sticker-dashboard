import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneCountryInput = ({ disabled, value, onChange }) => {
  return (
    <PhoneInput
      disabled={disabled}
      className="custom-phone "
      placeholder="Enter phone number"
      international
      countryCallingCodeEditable={false}
      style={{
        marginTop: "12px",
      }}
      defaultCountry="BD" // Country code for Bangladesh
      value={value?.toString()}
      onChange={onChange}
    />
  );
};

export default PhoneCountryInput;
