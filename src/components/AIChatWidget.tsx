import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Mail, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { easing, duration } from "@/lib/motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type VisitorContext = {
  primary_concern: string;
  recommended_treatment: string;
  created_at: string;
  conversation_summary: string;
  email?: string;
} | null;

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SUGGESTED_PROMPTS = [
  "Do I have low T?",
  "Find my ideal treatment",
  "What are your prices?",
  "How does TRT work?",
];

// Get or create a persistent session ID
const getSessionId = (): string => {
  const key = "elevare_chat_session";
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
};

const getDefaultGreeting = (): string => {
  return "Hi! I'm Nova, your Elevare Health assistant. I can help you find the right treatment based on your symptoms and goals. Want to take a quick quiz to discover your ideal treatment plan?";
};

const getReturningVisitorGreeting = (context: VisitorContext): string => {
  if (!context) return getDefaultGreeting();
  
  const treatmentName = context.recommended_treatment || "treatment";
  const concern = context.primary_concern || "your health goals";
  
  return `Welcome back! 👋 I remember we talked about ${concern} and I recommended our ${treatmentName} program. Have you had a chance to start your free assessment, or would you like to explore other options today?`;
};

// Detect if a recommendation was made in the conversation
const hasRecommendation = (messages: Message[]): boolean => {
  const lastAssistantMessages = messages
    .filter(m => m.role === "assistant")
    .slice(-3);
  
  const recommendationKeywords = [
    "recommend", "perfect for", "ideal for", "suggest", 
    "$149/mo", "$199/mo", "$99/mo", "start your free assessment",
    "based on what you've shared"
  ];
  
  return lastAssistantMessages.some(m => 
    recommendationKeywords.some(keyword => 
      m.content.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: getDefaultGreeting(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visitorContext, setVisitorContext] = useState<VisitorContext>(null);
  const [hasCheckedVisitor, setHasCheckedVisitor] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(getSessionId());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check for returning visitor when chat opens
  const checkReturningVisitor = useCallback(async () => {
    if (hasCheckedVisitor) return;
    
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          getVisitorContext: true,
          sessionId: sessionId.current 
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.visitorContext) {
          setVisitorContext(data.visitorContext);
          // If they already provided email, mark as captured
          if (data.visitorContext.email) {
            setLeadCaptured(true);
          }
          setMessages([{
            role: "assistant",
            content: getReturningVisitorGreeting(data.visitorContext),
          }]);
        }
      }
    } catch (e) {
      console.error("Failed to check visitor context:", e);
    } finally {
      setHasCheckedVisitor(true);
    }
  }, [hasCheckedVisitor]);

  useEffect(() => {
    if (isOpen && !hasCheckedVisitor) {
      checkReturningVisitor();
    }
  }, [isOpen, hasCheckedVisitor, checkReturningVisitor]);

  // Show lead capture after recommendation is made
  useEffect(() => {
    if (!leadCaptured && messages.length >= 4 && hasRecommendation(messages)) {
      // Delay showing the form slightly after recommendation
      const timer = setTimeout(() => setShowLeadCapture(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [messages, leadCaptured]);

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactEmail.trim() && !contactPhone.trim()) {
      toast.error("Please provide an email or phone number");
      return;
    }

    // Basic email validation
    if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmittingContact(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          saveContact: {
            email: contactEmail.trim() || null,
            phone: contactPhone.trim() || null,
          },
          sessionId: sessionId.current,
        }),
      });

      if (resp.ok) {
        setLeadCaptured(true);
        setShowLeadCapture(false);
        toast.success("Thanks! We'll be in touch soon.");
        
        // Add a follow-up message from Nova
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Great! Our team will reach out to help you get started. In the meantime, you can begin your free assessment anytime. Is there anything else I can help you with?",
        }]);
      } else {
        const data = await resp.json();
        toast.error(data.error || "Failed to save contact info");
      }
    } catch (e) {
      console.error("Contact save error:", e);
      toast.error("Failed to save contact info");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Track if we should save lead (after enough conversation)
  const shouldSaveLead = messages.length >= 6;

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    const updateAssistantMessage = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2].role === "user") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          saveLead: shouldSaveLead,
          sessionId: sessionId.current
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          toast.error("High demand - please try again in a moment");
        } else if (resp.status === 402) {
          toast.error("Service temporarily unavailable");
        } else {
          toast.error(errorData.error || "Failed to get response");
        }
        setIsLoading(false);
        return;
      }

      if (!resp.body) {
        throw new Error("No response body");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) updateAssistantMessage(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) updateAssistantMessage(content);
          } catch {
            /* ignore */
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showSuggestedPrompts = messages.length === 1 && !isLoading;

  // Premium widget animations
  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: duration.normal,
        ease: easing.entrance,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: duration.fast,
        ease: easing.exit,
      },
    },
  };

  const windowVariants = {
    initial: { opacity: 0, y: 16, scale: 0.96 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: duration.normal,
        ease: easing.entrance,
      },
    },
    exit: {
      opacity: 0,
      y: 16,
      scale: 0.96,
      transition: {
        duration: duration.fast,
        ease: easing.exit,
      },
    },
  };

  return (
    <>
      {/* Chat Button - positioned higher on mobile to avoid MobileBottomCTA */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-28 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg sm:bottom-20 sm:right-6 sm:h-14 sm:w-14 md:bottom-6"
          >
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Full screen on mobile, positioned on desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={windowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-x-0 bottom-0 top-auto z-50 flex h-[85vh] max-h-[600px] flex-col overflow-hidden rounded-t-2xl border bg-card shadow-2xl sm:inset-auto sm:bottom-20 sm:right-6 sm:h-[500px] sm:w-[380px] sm:max-w-[calc(100vw-3rem)] sm:rounded-2xl md:bottom-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Nova</p>
                  <p className="text-xs text-white/70">Elevare Health Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/20 active:bg-white/30 -mr-2"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        message.role === "user"
                          ? "bg-primary text-white"
                          : "bg-primary-light text-primary"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* Suggested Prompts - Touch-friendly with 44px minimum height */}
                {showSuggestedPrompts && (
                  <div className="mt-2 flex flex-col gap-2">
                    <p className="text-xs font-medium text-muted-foreground">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_PROMPTS.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handleSend(prompt)}
                          className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2.5 min-h-[44px] text-sm font-medium text-primary transition-colors hover:bg-primary/10 hover:border-primary/50 active:bg-primary/15"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lead Capture Form */}
                {showLeadCapture && !leadCaptured && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Get personalized follow-up</p>
                        <p className="text-xs text-muted-foreground">We'll send your treatment details</p>
                      </div>
                    </div>
                    <form onSubmit={handleContactSubmit} className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="pl-9"
                          disabled={isSubmittingContact}
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="Phone (optional)"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="pl-9"
                          disabled={isSubmittingContact}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-dark"
                        disabled={isSubmittingContact}
                      >
                        {isSubmittingContact ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Get My Treatment Plan"
                        )}
                      </Button>
                      <button
                        type="button"
                        onClick={() => setShowLeadCapture(false)}
                        className="w-full min-h-[44px] py-2 text-sm text-muted-foreground hover:text-foreground active:text-foreground/80 transition-colors"
                      >
                        Maybe later
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Lead Captured Confirmation */}
                {leadCaptured && messages.length > 1 && messages[messages.length - 1]?.content.includes("Our team will reach out") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3 flex items-center gap-2 rounded-lg bg-accent-gold/10 p-3 text-[#9A8444]"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Contact info saved!</span>
                  </motion.div>
                )}

                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t bg-background p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about treatments..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary-dark"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;