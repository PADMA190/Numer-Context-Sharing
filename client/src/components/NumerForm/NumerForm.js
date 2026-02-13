import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import sendNumer from "../../services/api.js";
import getCityName from "../../utils/getLocation.js";
import SuccessCard from "../SuccessCard/SuccessCard.js";
import "./Numer.scss";

const NumerForm = () => {
  const defaultState = {
    from: undefined,   // IMPORTANT: not ""
    to: undefined,     // IMPORTANT: not ""
    context: "",
    mode: "one-way",
    location:""
  };

  const [form, setForm] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  /* =============================
     VALIDATION
  ============================== */
  const validate = () => {
    if (!form.from || !form.to || !form.context.trim()) {
      return "All fields are required";
    }

    if (!isValidPhoneNumber(form.from)) {
      return "Invalid sender phone number";
    }

    if (!isValidPhoneNumber(form.to)) {
      return "Invalid receiver phone number";
    }

    if (form.from === form.to) {
      return "Sender and receiver numbers cannot be the same";
    }

    return null;
  };

  /* =============================
     SUBMIT
  ============================== */
  const handleSubmit = async () => {
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const city = await getCityName();
    console.log("city is",city);
    try {
      const res = await sendNumer({
        ...form,
        location:city||""
      });
      setSuccess(res.data);
      setForm(defaultState);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
const isFormValid =
  form.from &&
  isValidPhoneNumber(form.from) &&
  form.to &&
  isValidPhoneNumber(form.to) &&
  form.context.trim() &&
  form.from !== form.to;
  return (
  <div className="numer-wrapper">
    {success ? (
      <SuccessCard
        data={success}
        onReset={() => setSuccess(null)}
      />
    ) : (
      <div className="numer-card">
        <h3>Send a Numer</h3>
        <p className="subtitle">
          You met someone, save the context before it fades
        </p>

        {/* FROM */}
        <div className="input-group">
          <label style={{ fontSize: "14px", fontWeight: 400 }}>
            <b>From Number</b>
          </label>
          <PhoneInput
            defaultCountry="IN"
            international
            value={form.from}
            onChange={(value) =>
              setForm({ ...form, from: value })
            }
          />
        </div>

        {/* TO */}
        <div className="input-group">
          <label style={{ fontSize: "14px", fontWeight: 400 }}>
            <b>To Number</b>
          </label>
          <PhoneInput
            defaultCountry="IN"
            international
            value={form.to}
            onChange={(value) =>
              setForm({ ...form, to: value })
            }
          />
        </div>

        {/* CONTEXT */}
        <div className="input-group">
          <label style={{ fontSize: "14px", fontWeight: 400 }}>
            <b>Context</b>
          </label>
          <textarea
            placeholder="Met at product meetup near Indiranagar..."
            value={form.context}
            onChange={(e) =>
              setForm({
                ...form,
                context: e.target.value
              })
            }
          />
        </div>

        {/* MODE SECTION */}
        <div className="mode-section">
          <h3>Delivery Mode</h3>
          <div className="mode-cards">
            <div
              className={`mode-card ${
                form.mode === "one-way" ? "active" : ""
              }`}
              onClick={() =>
                setForm({ ...form, mode: "one-way" })
              }
            >
              <strong>One-way Context</strong>
            </div>

            <div
              className={`mode-card ${
                form.mode === "shared" ? "active" : ""
              }`}
              onClick={() =>
                setForm({ ...form, mode: "shared" })
              }
            >
              <strong>Shared Context</strong>
            </div>
          </div>
        </div>

        {/* MODE SUMMARY */}
        <div className="mode-summary">
          Selected Mode:{" "}
          <strong>
            {form.mode === "one-way"
              ? "One-way (Only you receive it)"
              : "Shared (Both receive it)"}
          </strong>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="submit-clear">
          <button
            className="submit-btn"
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
          >
            {loading ? "Sending..." : "Send Numer"}
          </button>
          <button
          
            className="clear-btn"
            onClick={() => setForm(defaultState)}
          >
            Clear
          </button>
        </div>

        <p className="privacy">
          🔒 Timestamp auto-attached. Location added if permitted.
        </p>
      </div>
    )}
  </div>
);
};

export default NumerForm;
