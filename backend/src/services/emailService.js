import "dotenv/config";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        from: "New Gen <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API Error:", data);
      return false;
    }

    console.log("Email sent:", data.id);

    return true;
  } catch (error) {
    console.error("Email service error:", error);
    return false;
  }
};


export const sendWelcomeEmail = async (email, username) => {
  return sendEmail({
    to: email,

    subject: "Welcome to NewGen 🎵",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 40px 20px;
        background: #080808;
        color: white;
      ">

        <h1 style="color: #c8f135;">
          Welcome to NewGen.
        </h1>

        <p>
          Hey ${username},
        </p>

        <p>
          You're officially part of the NewGen wave.
        </p>

        <p>
          We'll only show up in your inbox when there's
          something worth sending.
        </p>

        <p>
          No spam. Just music, culture and what's next.
        </p>

        <p style="color: #c8f135;">
          Stay locked in. 🎵
        </p>

      </div>
    `,
  });
};