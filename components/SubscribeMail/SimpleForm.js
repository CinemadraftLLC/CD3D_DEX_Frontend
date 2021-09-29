import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useState } from "react";
import { InputBase, Button } from "@mui/material";
import styles from "../../styles/simpleForm.module.css";
const url =
  "https://gmail.us5.list-manage.com/subscribe/post?u=9ca225e5e1195230331603867&amp;id=38c0a7c892";

// simplest form (only email)
// const SimpleForm = () => <MailchimpSubscribe url={url} />;
const SimpleForm = ({ status, message, onSubmitted }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      onSubmitted({
        EMAIL: email,
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        {status === "sending" && (
          <div style={{ color: "blue", margin: 0, width: "200px" }}>
            sending...
          </div>
        )}
        {status === "error" && (
          <div
            style={{ color: "red", margin: 0 }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div style={{ color: "green", margin: 0, width: "200px" }}>
            Subscribed !
          </div>
        )}
        <InputBase
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="Enter email for CD3D updates from CinemaDraft"
          isRequired
        />

        <Button
          className={styles.formButton}
          formValues={email}
          type={"submit"}
          variant="contained"
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default SimpleForm;
