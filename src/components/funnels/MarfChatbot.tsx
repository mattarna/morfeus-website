"use client";

import { useEffect } from "react";

const MARF_CHATBOT_SCRIPT_ID = "marf-chatbot-loader";
const MARF_CHATBOT_SRC = "https://marf.alexcarofiglio.com/embed/v1/loader.js";
const MARF_CHATBOT_AGENT = "69f9dd4b1deae57521710783";
const MARF_CHATBOT_KEY = "pk_live_hIJMNy9GApRQ2PQFs5brpEvWGkWJrnJT";

export function MarfChatbot() {
  useEffect(() => {
    if (document.getElementById(MARF_CHATBOT_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = MARF_CHATBOT_SCRIPT_ID;
    script.src = MARF_CHATBOT_SRC;
    script.dataset.agent = MARF_CHATBOT_AGENT;
    script.dataset.key = MARF_CHATBOT_KEY;
    script.defer = true;

    document.body.appendChild(script);
  }, []);

  return null;
}
