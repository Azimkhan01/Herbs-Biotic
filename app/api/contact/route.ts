import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            name,
            email,
            phone,
            message,
        } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields",
                },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // EMAIL TO OWNER
        await transporter.sendMail({
            from: `"Herbsbiotic Website" <${process.env.SMTP_USER}>`,
            to: "info.herbsbiotic@gmail.com",
            subject: `🌿 New Lead - ${name}`,
            html: `
    <div
      style="
        background:#f4f6f8;
        padding:40px 20px;
        font-family:Arial,sans-serif;
      "
    >
      <div
        style="
          max-width:700px;
          margin:auto;
          background:#ffffff;
          border-radius:24px;
          overflow:hidden;
          box-shadow:0 10px 40px rgba(0,0,0,.08);
        "
      >
        <!-- Header -->
        <div
          style="
            background:#0f766e;
            padding:40px;
            text-align:center;
          "
        >
          <h1
            style="
              color:white;
              margin:0;
              font-size:30px;
            "
          >
            🌿 New Contact Form Submission
          </h1>

          <p
            style="
              color:#d1fae5;
              margin-top:10px;
              margin-bottom:0;
            "
          >
            Herbsbiotic Website Lead
          </p>
        </div>

        <!-- Content -->
        <div style="padding:35px;">
          <!-- Customer Info -->
          <div
            style="
              background:#f8fafc;
              border-radius:16px;
              padding:24px;
              margin-bottom:24px;
            "
          >
            <h2
              style="
                margin-top:0;
                color:#0f766e;
                font-size:20px;
              "
            >
              Customer Details
            </h2>

            <table
              style="
                width:100%;
                border-collapse:collapse;
              "
            >
              <tr>
                <td
                  style="
                    padding:10px 0;
                    font-weight:bold;
                  "
                >
                  Name
                </td>
                <td>${name}</td>
              </tr>

              <tr>
                <td
                  style="
                    padding:10px 0;
                    font-weight:bold;
                  "
                >
                  Email
                </td>
                <td>${email}</td>
              </tr>

              <tr>
                <td
                  style="
                    padding:10px 0;
                    font-weight:bold;
                  "
                >
                  Phone
                </td>
                <td>${phone || "Not Provided"}</td>
              </tr>
            </table>
          </div>

          <!-- Message -->
          <div
            style="
              background:#fffbea;
              border-left:6px solid #E1E53F;
              padding:24px;
              border-radius:16px;
            "
          >
            <h2
              style="
                margin-top:0;
                color:#0f766e;
                font-size:20px;
              "
            >
              Customer Message
            </h2>

            <p
              style="
                color:#444;
                line-height:1.8;
                margin:0;
              "
            >
              ${message}
            </p>
          </div>

          <!-- Actions -->
          <div
            style="
              margin-top:30px;
              text-align:center;
            "
          >
            <a
              href="mailto:${email}"
              style="
                display:inline-block;
                background:#0f766e;
                color:white;
                text-decoration:none;
                padding:14px 24px;
                border-radius:999px;
                font-weight:bold;
                margin-right:10px;
              "
            >
              Reply to Customer
            </a>

            ${phone
                    ? `
              <a
                href="tel:${phone}"
                style="
                  display:inline-block;
                  background:#E1E53F;
                  color:black;
                  text-decoration:none;
                  padding:14px 24px;
                  border-radius:999px;
                  font-weight:bold;
                "
              >
                Call Customer
              </a>
            `
                    : ""
                }
          </div>

          <!-- Timestamp -->
          <div
            style="
              margin-top:30px;
              background:#f8fafc;
              padding:20px;
              border-radius:12px;
              color:#666;
              font-size:14px;
            "
          >
            <strong>Submitted On:</strong>
            ${new Date().toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                })}
          </div>
        </div>

        <!-- Footer -->
        <div
          style="
            background:#f8fafc;
            padding:20px;
            text-align:center;
            color:#666;
            font-size:13px;
          "
        >
          This email was generated automatically from the
          Herbsbiotic contact form.
        </div>
      </div>
    </div>
  `,
        });
        // CONFIRMATION EMAIL TO USER
        await transporter.sendMail({
            from: `"Your Company" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "We received your message",
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello ${name},</h2>

          <p>
            Thank you for contacting us.
          </p>

          <p>
            We have successfully received your message and
            our team will get back to you as soon as possible.
          </p>

          <div
            style="
              background:#f5f5f5;
              padding:20px;
              border-radius:10px;
              margin-top:20px;
            "
          >
            <h3>Your Message</h3>

            <p>${message}</p>
          </div>

          <br />

          <p>
            Regards,
            <br />
            Your Company Team
          </p>
        </div>
      `,
        });

        return NextResponse.json({
            success: true,
            message: "Emails sent successfully",
        });
    } catch (error) {
        console.error("Email Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to send email",
            },
            {
                status: 500,
            }
        );
    }
}