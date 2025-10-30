"use client";

import { Sparkles, Mail, Github, Twitter, Linkedin } from "lucide-react";
import { Separator } from "../ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      {
        label: "Headline Generator",
        href: "/tools/headline-generator",
      },
      {
        label: "Product Description",
        href: "/tools/description-generator",
      },
      {
        label: "Benefit Bullets",
        href: "/tools/benefit-bullets",
      },
      {
        label: "Ad Copy Generator",
        href: "/tools/ad-copy-generator",
      },
      {
        label: "Email Subject Lines",
        href: "/tools/email-subject-line",
      },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      // { label: "Careers", href: "/careers" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      // { label: "Cookie Policy", href: "/cookies" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "Status", href: "/status" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@copyforge.com", label: "Email" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-2">
            <a
              href="/"
              className="flex items-center gap-2 font-bold text-xl mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                eCommTool
              </span>
            </a>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              AI-powered e-commerce marketing tools to boost your brand and
              optimize campaigns effortlessly.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Product</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} CopyForge. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
