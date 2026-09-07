import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Phone, Mail, MapPin, Building2, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import textureUrl from '@/assets/generated/texture-metal.jpg';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    // In a real app, this would be an API call.
    console.log("Form data:", data);
    setIsSubmitted(true);
    toast({
      title: "Inquiry Received",
      description: "We'll be in touch shortly.",
    });
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* HEADER */}
      <div className="bg-secondary text-secondary-foreground relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={textureUrl} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Contact Us
          </h1>
          <p className="text-secondary-foreground/70 max-w-2xl text-lg">
            Distributor inquiries, quote requests, and technical support for HVAC/R professionals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* INFO COLUMN */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-widest mb-6 border-b border-border pb-2">Headquarters</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block font-bold text-foreground mb-1">Powerlink Inc.</strong>
                    <span className="text-muted-foreground text-sm font-medium">POWERLYNX — Power Delivered.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <address className="not-italic text-muted-foreground text-sm font-medium leading-relaxed">
                    915 Secaucus Rd<br />
                    Secaucus, NJ 07094<br />
                    United States
                  </address>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Call Us</strong>
                    <a href="tel:8888187693" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                      888-818-POWER <span className="text-sm font-normal text-muted-foreground">(7693)</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-widest mb-6 border-b border-border pb-2">Email Directory</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">General Inquiries</strong>
                    <a href="mailto:info@powerlinkus.com" className="font-bold text-foreground hover:text-primary transition-colors">
                      info@powerlinkus.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Orders / Quotes</strong>
                    <a href="mailto:orders@powerlinkus.com" className="font-bold text-foreground hover:text-primary transition-colors">
                      orders@powerlinkus.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* FORM COLUMN */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-6 md:p-10 shadow-sm">
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight mb-2">Send an Inquiry</h2>
              <p className="text-muted-foreground mb-8">Complete the form below and the appropriate team will respond promptly.</p>

              {isSubmitted ? (
                <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight mb-2">Inquiry Sent</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Thank you for reaching out. A representative from Powerlink Inc. will review your submission and respond promptly.
                  </p>
                  <Button variant="outline" onClick={() => { setIsSubmitted(false); form.reset(); }} className="rounded-none uppercase font-bold tracking-widest">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Company</FormLabel>
                            <FormControl>
                              <Input placeholder="HVAC Supply Co." className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Country</FormLabel>
                            <FormControl>
                              <Input placeholder="United States" className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Inquiry Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-none bg-background focus-visible:ring-primary h-12">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Product Inquiry">Product Inquiry</SelectItem>
                                <SelectItem value="Quote Request">Quote Request</SelectItem>
                                <SelectItem value="Distribution Partnership">Distribution Partnership</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs">
                              {form.watch("inquiryType") === "Quote Request" ? "Routes to orders@powerlinkus.com" : "Routes to info@powerlinkus.com"}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="rounded-none bg-background focus-visible:ring-primary min-h-[150px] resize-y" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full md:w-auto rounded-none font-bold uppercase tracking-widest h-14 px-8 gap-2">
                      <Send className="w-4 h-4" /> Submit Inquiry
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
