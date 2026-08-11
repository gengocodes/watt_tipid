"use client";

import { FC, useState, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "./SectionBadge";
import { ContactInfoItem } from "./ContactInfoItem";
import { FormInput } from "@/shared/ui/FormInput";
import { toast } from "react-toastify";
import axios from "axios";
import { contactService } from "../services/contact.service";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactInput = z.infer<typeof contactSchema>;

export const ContactSection: FC = (): ReactElement => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactInput): Promise<void> => {
    try {
      await contactService.sendContact(data);
      setIsSuccess(true);
      reset();
      toast.success("Thank you! Your message has been sent successfully.");
    } catch (err: unknown) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.detail
          ? err.response.data.detail
          : "Failed to send contact message. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-6">
            <SectionBadge>Get in Touch</SectionBadge>

            <h2 className="text-3xl md:text-4xl font-bold text-chart-4">
              Questions? We&apos;d love to hear from you.
            </h2>

            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
              Whether you need help setting up your account, want to report a
              bug, or just want to share your savings story — our team is here.
            </p>

            <div className="pt-6 space-y-5">
              <ContactInfoItem
                label="Email"
                icon={<Mail className="w-4 h-4" />}
                value={
                  <a
                    href="mailto:paulcorsino.work@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    paulcorsino.work@gmail.com
                  </a>
                }
              />

              <ContactInfoItem
                label="Phone"
                icon={<Phone className="w-4 h-4" />}
                value="+63 966 299 8103"
              />

              <ContactInfoItem
                label="Address"
                icon={<MapPin className="w-4 h-4" />}
                value="Gaisano Capital Bldg., Colon St., Cebu City"
              />
            </div>
          </div>

          <div className="bg-muted border border-primary/5 p-8 md:p-12 rounded-2xl">
            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full border border-chart-2 flex items-center justify-center text-chart-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-chart-4">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm max-w-xs mx-auto">
                  Thank you for reaching out. A support team member will contact
                  you shortly.
                </p>
                <Button onClick={() => setIsSuccess(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                  id="fullName"
                  type="text"
                  label="Full Name"
                  placeholder="Juan Dela Cruz"
                  disabled={isSubmitting}
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />

                <FormInput
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="juandelacruz@email.com"
                  disabled={isSubmitting}
                  error={errors.email?.message}
                  {...register("email")}
                />

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="How can we help you?"
                    disabled={isSubmitting}
                    className="min-h-30 rounded-md border-primary/20"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 rounded-lg mt-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
