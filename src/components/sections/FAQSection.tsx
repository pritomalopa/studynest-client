import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is StudyNest free to use?",
    a: "Creating an account, browsing resources, and joining study groups is completely free. Some resources uploaded by students may have a small price set by the uploader.",
  },
  {
    q: "How do I know a tutor is legitimate?",
    a: "Tutors list their university, subjects, and hourly rate on their profile. You can also read reviews left by students who booked sessions with them before.",
  },
  {
    q: "Can I upload resources anonymously?",
    a: "No — every resource is linked to your account so students can ask questions and leave reviews, but your profile only shows your name and university, not your email.",
  },
  {
    q: "What happens if I delete a resource I uploaded?",
    a: "It's removed from the platform immediately, along with any reviews attached to it. This action can't be undone, so we'll always ask you to confirm first.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="container-page py-20 max-w-3xl">
      <div className="text-center mb-10">
        <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">FAQ</span>
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-800 mt-1">
          Frequently asked questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.q} className="index-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-sm text-slate-800">{faq.q}</span>
              <ChevronDown
                size={18}
                className={`text-slate-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
