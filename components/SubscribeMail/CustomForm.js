import MailchimpSubscribe from "react-mailchimp-subscribe";
import SimpleForm from "./SimpleForm";
const url =
  "https://gmail.us5.list-manage.com/subscribe/post?u=9ca225e5e1195230331603867&amp;id=38c0a7c892";
  
const CustomForm = () => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <>
        <SimpleForm onSubmitted={(formData) => subscribe(formData)} />
        {status === "sending" && (
          <div style={{ color: "blue" }}>sending...</div>
        )}
        {status === "error" && (
          <div
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div style={{ color: "green" }}>Subscribed !</div>
        )}
      </>
    )}
  />
);

export default CustomForm;
