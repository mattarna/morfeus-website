"use client";

import { useEffect } from "react";

const MARF_CHATBOT_SCRIPT_ID = "marf-chatbot-loader";
const MARF_CHATBOT_SRC = "https://api.marf.app/embed/v1/loader.js";
const MARF_CHATBOT_AGENT = "69f937f8d138ca6479b3ce6a";
const MARF_CHATBOT_KEY = "pk_live_TUvcYAn8QsHjlsWvQXDHmvRWX6WWm89R";

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
