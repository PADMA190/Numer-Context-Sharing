import dotenv from "dotenv";
import Twilio from "twilio";

dotenv.config();

const client = new Twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

const sendMessage = async (to, body) => {
  try {

    const message = await client.messages.create({
      body,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`
    });

    return message;

  } catch (error) {
    console.error("Full Twilio Error:", error);
    throw error;
  }
};

export default sendMessage;
