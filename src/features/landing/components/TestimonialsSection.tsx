import { FC, ReactElement } from "react";
import { SectionHeader } from "./SectionHeader";
import { TestimonialCard, TestimonialItem } from "./TestimonialCard";

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Maria Santos",
    role: "Homeowner · Cebu City",
    initials: "MS",
    quote:
      "My VECO bill dropped from ₱4,200 to ₱3,100 in just two months. WattTipid told me exactly which appliances were the culprits — turned out my old air-con was the problem.",
  },
  {
    name: "Jun Reyes",
    role: "Renter · Mandaue City",
    initials: "JR",
    quote:
      "I was skeptical at first, but the AI chat is surprisingly helpful. I asked it in Visayan and it answered clearly. The savings tips were practical, not generic.",
  },
  {
    name: "Carla Mendoza",
    role: "Homeowner · Lapu-Lapu City",
    initials: "CM",
    quote:
      "We have four kids and our bill was out of control. WattTipid helped us figure out that leaving appliances on standby was costing us ₱180 a month. Easy fix!",
  },
  {
    name: "Roberto Dela Cruz",
    role: "Landlord · Talisay City",
    initials: "RC",
    quote:
      "I manage three units and track all of them on WattTipid. The energy score dashboard makes it easy to see which unit needs attention. Great for landlords.",
  },
  {
    name: "Ana Fernandez",
    role: "OFW family · Consolacion",
    initials: "AF",
    quote:
      "My family set up WattTipid while I was abroad. I can check their VECO usage remotely and send them tips. Peace of mind knowing they're not overspending.",
  },
  {
    name: "Paolo Villanueva",
    role: "Student · Cebu City",
    initials: "PV",
    quote:
      "Living in a boarding house, every peso counts. WattTipid helped me realize my desktop PC on all night was costing me ₱96/month alone. Switched to sleep mode — problem solved.",
  },
];

export const TestimonialsSection: FC = (): ReactElement => {
  return (
    <section
      id="testimonials"
      className="py-20 bg-background"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="Fake Stories"
          title="Filipinos saving real money every month"
          subtitle="Over 12,000 households have cut their electricity bills using WattTipid."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};
