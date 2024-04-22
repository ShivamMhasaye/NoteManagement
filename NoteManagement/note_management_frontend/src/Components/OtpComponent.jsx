import React, {useState} from "react";

const OtpComponent = ({ onComplete }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index === otp.length - 1 && onComplete) {
      onComplete(newOtp.join("")); // Join the numbers for full OTP
    }
  };
  return otp.map((val, index) => (
    <div className="col-3" key={index}>
      <input
        type="text"
        className="form-control text-center"
        maxLength={1}
        value={val}
        onChange={(e) => handleChange(index, e.target.value)}
        onFocus={(e) => e.target.select()} // Select input on focus
      />
    </div>
  ));
};

export default OtpComponent;
