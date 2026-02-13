import sendMessage from "../services/whatsappService.js";
import messageFormatter from "../utils/messageFormatter.js";

const createNumer = async (req, res) => {
  const { from, to, context, mode, location } = req.body;

  const message = messageFormatter({
    from,
    to,
    context,
    mode,
    location
  });

  const deliveredTo = [];

  try {
    // If shared mode → send to recipient first
    if (mode === "shared") {
      console.log("cominggg");
      const recipientResult = await sendMessage(to, message);
      deliveredTo.push(to);
    }

    // Always send to sender
    const senderResult = await sendMessage(from, message);
    deliveredTo.push(from);

    return res.status(200).json({
      success: true,
      message: "Numer delivered successfully",
      deliveredTo,
      mode
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Numer delivery failed"
    });
  }
};

export default createNumer;
