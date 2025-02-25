import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendInviteEmail(email, categoryName) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Hello! You've been invited to Audio List!",
      // TODO: Add 3 separate emails for Invite + Share or just Share or Invite.
      html: `<p>Hello,</p><p>Your friend invited you to view the <b>${categoryName}</b> shopping list. Click the link below to access it.</p><p><a href=${process.env.APP_URL}>View List</a></p>`,
    });
  } catch (error) {
    console.log("Failed to send an email: ", error);
  }
}
