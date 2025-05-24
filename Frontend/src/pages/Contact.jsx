import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // clear form
      setStatus("Message sent successfully!");
    } catch (err) {
      alert("Failed to send message.");
      setStatus("Failed to send message. Please try again later.");
      console.error(err);
    }
  };
  
  

  return (
    <div className="w-full px-6 py-10 lg:px-20 dark:bg-black dark:text-white text-zinc-800 rounded-md">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">We'd Love to Hear From You</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Whether you have a question, feedback, or just want to say hello — our team is here to help.
        </p>
      </section>

      {/* Contact Info & Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-primary" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-zinc-600 dark:text-zinc-400">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-primary" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-zinc-600 dark:text-zinc-400">support@yourdomain.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary mt-1" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                123 Learning Lane,<br />
                Knowledge City, India 560001
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows="5"
              placeholder="Your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-md font-medium hover:scale-[1.02] transition"
          >
            Send Message
          </button>

          {/* Status Message */}
          {status && (
            <p className="text-sm text-center mt-2 dark:text-zinc-400 text-zinc-600">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
