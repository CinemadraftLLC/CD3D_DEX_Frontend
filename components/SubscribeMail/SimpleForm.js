import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useState } from "react";
import { InputBase, Button } from "@mui/material";
import styles from "../../styles/simpleForm.module.css";
const url =
  "https://gmail.us5.list-manage.com/subscribe/post?u=9ca225e5e1195230331603867&amp;id=38c0a7c892";

// simplest form (only email)
// const SimpleForm = () => <MailchimpSubscribe url={url} />;
const SimpleForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form>
      <div className={styles.formContainer}>
        <InputBase
          label="Email"
          onChange={(E) => setEmail(E.target.value)}
          type="email"
          value={email}
          placeholder="Enter email for CD3D updates from CinemaDraft"
          isRequired
        />

        <Button className={styles.formButton} variant="contained">
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default SimpleForm;
