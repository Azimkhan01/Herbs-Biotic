"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  MapPin,
  Phone,
  Clock3,
  MessageCircle,
} from "lucide-react";

export default function Mail() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useGSAP(
    () => {
      gsap.from(".contact-animate", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("✅ Message sent successfully!");

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setMessage(
          result.message || "❌ Failed to send message."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      ref={containerRef}
      className="bg-[#F7F7F7] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
          {/* LEFT */}
          <div className="contact-animate">
            <h2 className="mb-10 text-3xl font-bold text-teal-900">
              Contact Details
            </h2>

            <div className="space-y-8">
              <div>
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  <MapPin size={18} />
                  Address
                </div>

                <p className="text-gray-600">
                  11 Kifissou Avenue
                  <br />
                  Rentis
                  <br />
                  ZIP Code 182 33
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  <Phone size={18} />
                  Orders & Information
                </div>

                <p className="text-gray-600">
                  +91 9876543210
                </p>

                <p className="text-gray-600">
                  info@example.com
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  <Clock3 size={18} />
                  Opening Hours
                </div>

                <p className="text-gray-600">
                  Monday - Saturday
                </p>

                <p className="text-gray-600">
                  09:00 AM - 08:00 PM
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-medium transition hover:translate-x-1"
                >
                  <MessageCircle
                    size={22}
                    className="text-green-500"
                  />
                  WhatsApp +91 9876543210
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 font-medium transition hover:translate-x-1"
                >
                  <MessageCircle
                    size={22}
                    className="text-purple-500"
                  />
                  Viber +91 9876543210
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-animate">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-white px-5 py-4 outline-none transition focus:border-teal-700"
              />

              <input
                type="email"
                required
                placeholder="Email *"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-white px-5 py-4 outline-none transition focus:border-teal-700"
              />

              <input
                type="tel"
                placeholder="Contact Telephone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-white px-5 py-4 outline-none transition focus:border-teal-700"
              />

              <textarea
                required
                rows={6}
                placeholder="Your Message *"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                className="w-full resize-none rounded-xl border bg-white px-5 py-4 outline-none transition focus:border-teal-700"
              />

              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  required
                  className="mt-1"
                />

                <span>
                  By submitting this form, I accept
                  the Terms of Use and Privacy Policy.
                </span>
              </label>

              {message && (
                <div
                  className={`font-medium ${
                    message.includes("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    rounded-full
                    bg-[#E1E53F]
                    px-10
                    py-4
                    font-semibold
                    text-black
                    transition-all
                    hover:scale-105
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Sending..."
                    : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}