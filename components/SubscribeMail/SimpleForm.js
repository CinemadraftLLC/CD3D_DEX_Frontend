import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useState } from "react";
import { Input } from "@mui/material";
const url =
  "https://gmail.us5.list-manage.com/subscribe/post?u=9ca225e5e1195230331603867&amp;id=38c0a7c892";

// simplest form (only email)
// const SimpleForm = () => <MailchimpSubscribe url={url} />;
const SimpleForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form className="mc__form">
      <Input
        label="Email"
        onChangeHandler={setEmail}
        type="email"
        value={email}
        placeholder="your@email.com"
        isRequired
      />

      {/* <Input label="subscribe" type="submit" formValues={email} /> */}
    </form>
  );
};

export default SimpleForm;
