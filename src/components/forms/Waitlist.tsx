import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

type Errors = {
  fullName?: string;
  email?: string;
};

const Waitlist = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isEmailValid = useMemo(() => EMAIL_REGEX.test(email.trim()), [email]);

  const validate = (): boolean => {
    const nextErrors: Errors = {};
    const name = fullName.trim();
    const mail = email.trim();

    if (name.length < 2) nextErrors.fullName = "Please enter your full name.";
    if (!mail) nextErrors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(mail))
      nextErrors.email = "Enter a valid email address.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      setOpen(true);
      setFullName("");
      setEmail("");
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50  w-full flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold text-[#0D0F11] leading-[1.2]">
            Get Early Access to <span className="text-[#F0A500]">Gigsta</span>
          </h2>

          <p className="mt-4.5 text-[#535353] mx-auto font-medium max-w-2xl text-lg md:text-xl leading-relaxed">
            Be the first to know when we expand our services to new areas and
            launch exciting new features.{" "}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 border border-[#535353]/50 rounded-xl p-8 shadow-sm text-left space-y-6 bg-white"
          noValidate
        >
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-[#0d0f11] "
            >
              Full Name
            </label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`h-12 bg-gray-50 border-none mt-3 ${errors.fullName ? "border-[#0D0F11] focus-visible:ring-[#0D0F11]" : ""}`}
            />
            {errors.fullName ? (
              <p className="text-xs text-[#0d0f11]">{errors.fullName}</p>
            ) : null}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#0d0f11]"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`h-12 bg-gray-50 border-none mt-3 ${errors.email ? "border-[#0D0F11] focus-visible:ring-[#0D0F11]" : ""}`}
            />
            {errors.email ? (
              <p className="text-xs text-[#0d0f11]">{errors.email}</p>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#F0A500] hover:bg-[#d89400] text-white font-semibold h-12 text-base disabled:opacity-60"
          >
            {isSubmitting ? "Joining..." : "Join Waitlist"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {email.trim().length > 0 && !isEmailValid && !errors.email ? (
            <p className="text-xs text-gray-500 text-center">
              Tip: use a format like name@domain.com
            </p>
          ) : null}
        </form>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="text-center   bg-white
      backdrop-blur-none border border-[#535353]/50 rounded-xl"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">
              You&apos;re on the list!
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm text-[#0D0F11] font-medium">
              You&apos;ve been added to the Gigsta waitlist. We&apos;ll notify
              you as soon as we launch in your area.
            </DialogDescription>
          </DialogHeader>

          <Button
            className="mt-4 bg-[#F0A500] text-white hover:bg-[#d89400]"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Waitlist;
