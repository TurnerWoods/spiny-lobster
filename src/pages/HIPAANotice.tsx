import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Users, Bell, AlertCircle } from "lucide-react";

const HIPAANotice = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 sm:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">HIPAA Notice of Privacy Practices</h1>
                  <p className="text-muted-foreground">Effective Date: January 2025</p>
                </div>
              </div>

              {/* Summary Box */}
              <div className="mb-8 rounded-xl border border-primary/30 bg-primary/10 p-6">
                <h2 className="mb-3 font-display text-lg font-bold text-foreground">Your Information. Your Rights. Our Responsibilities.</h2>
                <p className="text-sm text-muted-foreground">
                  This notice describes how medical information about you may be used and disclosed and how you can get access to this information. <strong>Please review it carefully.</strong>
                </p>
              </div>

              <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <section className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Eye className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">Your Rights</h2>
                  </div>
                  <p className="mb-4">When it comes to your health information, you have certain rights. You can:</p>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Get a copy of your health and claims records</h3>
                      <p className="text-sm">You can ask to see or get an electronic or paper copy of your medical record and other health information we have about you. We will provide a copy or summary of your health information, usually within 30 days of your request. We may charge a reasonable, cost-based fee.</p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Ask us to correct your health records</h3>
                      <p className="text-sm">You can ask us to correct health information about you that you think is incorrect or incomplete. We may say "no" to your request, but we'll tell you why in writing within 60 days.</p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Request confidential communications</h3>
                      <p className="text-sm">You can ask us to contact you in a specific way (for example, home or office phone) or to send mail to a different address. We will consider all reasonable requests and must say "yes" if you tell us you would be in danger if we do not.</p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Ask us to limit what we use or share</h3>
                      <p className="text-sm">You can ask us not to use or share certain health information for treatment, payment, or our operations. We are not required to agree to your request, and we may say "no" if it would affect your care.</p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Get a list of those with whom we've shared information</h3>
                      <p className="text-sm">You can ask for a list (accounting) of the times we've shared your health information for six years prior to the date you ask, who we shared it with, and why. We will include all disclosures except for those about treatment, payment, and health care operations, and certain other disclosures.</p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Get a copy of this privacy notice</h3>
                      <p className="text-sm">You can ask for a paper copy of this notice at any time, even if you have agreed to receive the notice electronically. We will provide you with a paper copy promptly.</p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Choose someone to act for you</h3>
                      <p className="text-sm">If you have given someone medical power of attorney or if someone is your legal guardian, that person can exercise your rights and make choices about your health information. We will make sure the person has this authority and can act for you before we take any action.</p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">File a complaint if you feel your rights are violated</h3>
                      <p className="text-sm">You can complain if you feel we have violated your rights by contacting us using the information at the end of this notice. You can also file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights. We will not retaliate against you for filing a complaint.</p>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">Our Uses and Disclosures</h2>
                  </div>
                  <p className="mb-4">We typically use or share your health information in the following ways:</p>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Treat You</h3>
                      <p className="text-sm">We can use your health information and share it with other professionals who are treating you. <em>Example: A physician treating you for a condition asks another physician about your overall health condition.</em></p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Run Our Organization</h3>
                      <p className="text-sm">We can use and share your health information to run our practice, improve your care, and contact you when necessary. <em>Example: We use health information about you to manage your treatment and services.</em></p>
                    </div>
                    
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold text-foreground">Bill for Your Services</h3>
                      <p className="text-sm">We can use and share your health information to bill and get payment from health plans or other entities. <em>Example: We give information about you to your health insurance plan so it will pay for your services.</em></p>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">Other Uses and Disclosures</h2>
                  </div>
                  <p className="mb-4">We are allowed or required to share your information in other ways – usually in ways that contribute to the public good, such as public health and research. We have to meet many conditions in the law before we can share your information for these purposes.</p>
                  
                  <ul className="ml-6 list-disc space-y-2">
                    <li><strong>Help with public health and safety issues:</strong> We can share health information for certain situations such as preventing disease, helping with product recalls, reporting adverse reactions to medications, reporting suspected abuse or neglect, and preventing or reducing a serious threat to anyone's health or safety.</li>
                    <li><strong>Do research:</strong> We can use or share your information for health research under specific conditions.</li>
                    <li><strong>Comply with the law:</strong> We will share information about you if state or federal laws require it, including with the Department of Health and Human Services if it wants to see that we're complying with federal privacy law.</li>
                    <li><strong>Respond to lawsuits and legal actions:</strong> We can share health information in response to a court or administrative order, or in response to a subpoena.</li>
                    <li><strong>Work with a medical examiner or funeral director:</strong> We can share health information with a coroner, medical examiner, or funeral director when an individual dies.</li>
                    <li><strong>Address workers' compensation, law enforcement, and other government requests:</strong> We can use or share health information for workers' compensation claims, law enforcement purposes, with health oversight agencies, and for special government functions such as military or national security.</li>
                  </ul>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Lock className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">Your Choices</h2>
                  </div>
                  <p className="mb-4">For certain health information, you can tell us your choices about what we share. If you have a clear preference for how we share your information in the situations described below, talk to us.</p>
                  
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Sharing information with your family, close friends, or others involved in your care</li>
                    <li>Sharing information in a disaster relief situation</li>
                    <li>Including your information in a hospital directory (not applicable to our services)</li>
                    <li>Marketing communications and sale of your information (we will never sell your information)</li>
                    <li>Fundraising efforts (we do not engage in fundraising)</li>
                  </ul>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">Our Responsibilities</h2>
                  </div>
                  <ul className="ml-6 list-disc space-y-3">
                    <li>We are required by law to maintain the privacy and security of your protected health information.</li>
                    <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.</li>
                    <li>We must follow the duties and privacy practices described in this notice and give you a copy of it.</li>
                    <li>We will not use or share your information other than as described here unless you tell us we can in writing. If you tell us we can, you may change your mind at any time. Let us know in writing if you change your mind.</li>
                  </ul>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">Changes to the Terms of This Notice</h2>
                  </div>
                  <p>
                    We can change the terms of this notice, and the changes will apply to all information we have about you. The new notice will be available upon request, on our website, and we will mail a copy to you upon request.
                  </p>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">Contact Information</h2>
                  <p className="mb-4">If you have questions about this notice or our privacy practices, or if you want to exercise your rights, please contact:</p>
                  
                  <div className="rounded-lg bg-muted/30 p-4">
                    <p><strong>Elevare Health Privacy Officer</strong></p>
                    <p>Elevare Health MSO LLC</p>
                    <p>1401 Lavaca St, Suite 388</p>
                    <p>Austin, TX 78701</p>
                    <p className="mt-2">
                      Email:{" "}
                      <a href="mailto:privacy@elevarehealth.com" className="text-primary hover:underline">
                        privacy@elevarehealth.com
                      </a>
                    </p>
                  </div>
                  
                  <p className="mt-4">
                    <strong>To file a complaint with the federal government:</strong><br />
                    U.S. Department of Health and Human Services<br />
                    Office for Civil Rights<br />
                    <a href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      www.hhs.gov/ocr/privacy/hipaa/complaints/
                    </a>
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HIPAANotice;
