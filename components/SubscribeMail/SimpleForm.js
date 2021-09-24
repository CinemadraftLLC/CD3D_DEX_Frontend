import MailchimpSubscribe from "react-mailchimp-subscribe";

const url =
  "https://gmail.us5.list-manage.com/subscribe/post?u=9ca225e5e1195230331603867&amp;id=38c0a7c892";

// simplest form (only email)
const SimpleForm = () => <MailchimpSubscribe url={url} />;

export default SimpleForm;
