import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../utils/appUrls";
// import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import firebase from "../firebase.config";
import { errorPopUp, succesPopUp } from "../utils/Toaster";

const SimpleSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
  });

  // console.log(auth);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  // const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [hasFilled, setHasFilled] = useState(false);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  //
  const [verificationId, setVerificationId] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("studentToken");
    if (authToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
    console.log(value);
  };

  // const onCaptchaVerify = async () => {
  //   try {
  //     console.log("captcha function call hua");
  //     // auth.settings.appVerificationDisabledForTesting = true;
  //     const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
  //     const confirmation = await signInWithPhoneNumber(
  //       auth,
  //       phoneNumber,
  //       recaptcha
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSend = () => {
  //   console.log("hanlde send call hua");
  //   setHasFilled(true);
  //   onCaptchaVerify();
  //   let appVerifier = window.recaptchaVerifier;
  //   console.log("ye lo ji app verifier", appVerifier);
  //   const formatPh = phoneNumber;
  //   console.log(formatPh);
  //   signInWithPhoneNumber(auth, formatPh, appVerifier)
  //     .then((confirmationResult) => {
  //       console.log("then ke andr aa gye", confirmationResult);
  //       window.confirmationResult = confirmationResult;
  //       toast.success("Otp send successfully");
  //     })
  //     .catch((error) => {
  //       toast.error("Something went wrong");
  //       console.log("error aa gya");
  //       console.log(error);
  //     });
  // };

  // const verifyOtp = async (e) => {
  //   let otp = e.target.value;
  //   setOtp(otp);
  //   try {
  //     const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
  //     await auth.signInWithCredential(credential);
  //     setIsPhoneVerified(true);
  //     alert("Phone number verified!");
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     alert("Invalid OTP. Please try again.");
  //   }
  // };

  // const verifyOtp = (event) => {
  //   let otp = event.target.value;
  //   setOtp(otp);

  //   if (otp.length === 6) {
  //     let confirmationResult = window.confirmationResult;
  //     confirmationResult
  //       .confirm(otp)
  //       .then((result) => {
  //         let user = result.user;
  //         console.log(user);
  //         alert("User signed in successfully");
  //       })
  //       .catch((error) => {
  //         alert("User couldn't sign in (bad verification code?)");
  //       });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isPhoneVerified) {
    //   alert("Please verify your phone number first.");
    //   return;
    // }
    try {
      const res = await axios.post(
        url.student.register,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          course: formData.course,
          phone:phoneNumber
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res?.data?.message);
      succesPopUp(res?.data?.message)

      // if (res.status === 201) {
      //   alert("Registration successful! Please wait for admin approval.");
      //   navigate("/login");
      // } else {
      //   alert("Registration failed. Please try again.");
      // }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response && error.response.status === 400) {
        // alert("Email already exists. Please login or use a different email.");
        errorPopUp("Email already exists. Please login or use a different email.")
      } else {
        // alert("Something went wrong. Please try again later.");
        errorPopUp("Something went wrong. Please try again later.")
      }
    }
  };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const res = await axios.post(
//             url.student.register,
//             {
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password,
//                 course: formData.course,
//                 phone: phoneNumber,
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         console.log(res?.data?.message);

//         succesPopUp(res?.data?.message || "Signup successful. Please verify your email.");

//     } catch (error) {
//         console.error("Error during signup:", error);

//         if (error.response) {
//             if (error.response.status === 400) {
//                 errorPopUp("Email already exists. Please login or use a different email.");
//             } else if (error.response.status === 500) {
//                 errorPopUp("Internal server error. Please try again later.");
//             } else {
                
//                 errorPopUp(error.response.data.message || "Something went wrong. Please try again later.");
//             }
//         } else {
//             errorPopUp("Unable to connect to the server. Please check your internet connection.");
//         }
//     }
// };


  // const handleSendOtp = () => {
  //   if (recaptchaRef.current) {
  //     recaptchaRef.current.innerHTML = '<div id="recaptcha-container"></div>';
  //   }
  //   const verifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //     }
  //   );

  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(phoneNumber, verifier)
  //     .then((confirmationResult) => {
  //       setVerificationId(confirmationResult.verificationId);
  //       console.log("otp send");
  //     })
  //     .catch((error) => {
  //       alert("Something went wrong");
  //       console.log("getting error", error);
  //     });
  // };

  return (
    <div className="signup-container">
      <h2>Student Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BTech">BTech</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            defaultCountry="IN"
          />
          {/* <div ref={recaptchaRef}></div>
          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button> */}
        </div>

        {/* {hasFilled && (
          <div className="form-group">
            <label>Enter OTP</label>
            <OtpInput
            
              shouldAutoFocus
              inputType="number"
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            <button type="button">
              Verify OTP
            </button>
          </div>
        )} */}

        <button type="submit" onSubmit={handleSubmit}>
          Sign Up
        </button>
         <p onClick={()=>navigate('/login')} className="already">Already have an account? <strong>Login</strong></p>
      </form>
    </div>
  );
};

export default SimpleSignup;
