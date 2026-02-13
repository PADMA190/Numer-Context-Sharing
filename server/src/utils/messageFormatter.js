const messageFormatter = ({ from, to, context, mode, location }) => {
  const timestamp = new Date().toLocaleString();

  return `
📌 *Numer Reference*

👤 *From:* ${from}
👥 *To:* ${to}

📝 *Context:*
"${context}"

🕒 *Time:* ${timestamp}
*Location:* ${location || "Not Provided"}

— Sent via Numer.me
`;
};

export default messageFormatter;
