import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AlertTriangle, Phone, Syringe, Activity, Brain, Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SafetyInformation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main className="py-12 sm:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header Section */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 ring-2 ring-amber-500/20">
                  <AlertTriangle className="h-7 w-7 text-amber-500" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-rich-black sm:text-4xl">General Safety Information</h1>
                  <p className="text-warm-gray">Important information about treatments and medications</p>
                </div>
              </div>

              {/* Emergency Warning */}
              <Card className="mb-6 border-2 border-destructive/40 bg-destructive/5 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 flex-shrink-0 text-destructive" />
                    <div>
                      <h3 className="mb-2 font-display text-lg font-bold text-rich-black">Emergency Warning</h3>
                      <p className="text-sm text-warm-gray">
                        If you experience severe or life-threatening symptoms such as <strong className="text-rich-black">chest pain, severe allergic reactions, difficulty breathing, severe abdominal pain, or loss of consciousness</strong>, seek emergency care immediately. <strong className="text-rich-black">Call 911</strong> or go to your nearest emergency room.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Card className="mb-8 border-2 border-amber-500/40 bg-amber-500/5 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-500" />
                    <div>
                      <h3 className="mb-2 font-display text-lg font-bold text-rich-black">Educational Notice</h3>
                      <p className="text-sm text-warm-gray">
                        Information on this page summarizes potential risks, side effects, warnings, interactions, and usage considerations for therapies discussed or prescribed through Elevare Health. This is <strong className="text-rich-black">educational only</strong> and is <strong className="text-rich-black">not a substitute</strong> for individualized medical advice, diagnosis, or treatment. Always consult your licensed clinician and patient information provided by your dispensing pharmacy before starting any medication.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card variant="glass">
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-rich-black">About Elevare Health</h2>
                    <p className="text-warm-gray">
                      Elevare Health is a technology and administrative platform. We do <strong className="text-rich-black">not</strong> practice medicine and do <strong className="text-rich-black">not</strong> dispense medications. All diagnosis, treatment decisions, prescriptions, and clinical care are performed exclusively by independent, licensed clinicians. Medications are dispensed solely by licensed pharmacies.
                    </p>
                    <p className="mt-3 text-warm-gray">
                      Completion of an intake or telehealth visit does <strong className="text-rich-black">not</strong> guarantee receipt of a prescription, specific medication, formulation, dose, or refill.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Off-Label & Compounded Medications</h2>
                    <p className="text-warm-gray">
                      <strong className="text-rich-black">Off-Label Use:</strong> Some therapies may be prescribed for uses not specifically approved by the FDA based on the clinician's professional judgment when potential benefits outweigh risks. Off-label prescribing is a common and legal medical practice.
                    </p>
                    <p className="mt-3 text-warm-gray">
                      <strong className="text-rich-black">Compounded Medications:</strong> Some medications may be compounded by licensed U.S. pharmacies to meet individual patient needs. Compounded medications are <strong className="text-rich-black">not FDA-approved</strong> for safety, effectiveness, or quality. The FDA has not reviewed these formulations for sterility, potency, or bioequivalence.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Always Inform Your Clinician</h2>
                    <p className="mb-4 text-warm-gray">Before starting any treatment, you <strong className="text-rich-black">must</strong> inform your clinician of:</p>
                    <ul className="ml-6 list-disc space-y-2 text-warm-gray">
                      <li>All prescription and over-the-counter medications, supplements, herbs, vitamins</li>
                      <li>Recreational substances, alcohol, and nicotine use</li>
                      <li>Any drug allergies or adverse reactions</li>
                      <li>Complete medical history including:
                        <ul className="ml-6 mt-2 list-circle space-y-1">
                          <li>Cardiovascular conditions (heart disease, high blood pressure, arrhythmias)</li>
                          <li>Endocrine disorders (diabetes, thyroid conditions)</li>
                          <li>Metabolic conditions</li>
                          <li>Psychiatric or neurologic conditions</li>
                          <li>Kidney or liver disease</li>
                          <li>Gastrointestinal conditions</li>
                          <li>Blood disorders or clotting conditions</li>
                          <li>Immune conditions</li>
                          <li>Cancer or tumor history</li>
                          <li>History of bariatric surgery</li>
                        </ul>
                      </li>
                      <li>Pregnancy, plans for pregnancy, or breastfeeding status</li>
                    </ul>
                    <p className="mt-4 font-semibold text-rich-black">
                      Do not use any medication if pregnant, planning pregnancy, or breastfeeding unless your clinician has specifically authorized it.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Medication Interactions</h2>
                    <p className="text-warm-gray">Some therapies may interact with other medications or substances, including:</p>
                    <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
                      <li>Insulin and sulfonylureas (diabetes medications)</li>
                      <li>Anticoagulants (e.g., warfarin, blood thinners)</li>
                      <li>Thyroid medications</li>
                      <li>Antidepressants and anti-anxiety medications</li>
                      <li>Stimulants (ADHD medications)</li>
                      <li>Benzodiazepines</li>
                      <li>Opioids and pain medications</li>
                      <li>Seizure medications</li>
                      <li>Blood pressure medications</li>
                      <li>Decongestants</li>
                      <li>PDE-5 inhibitors (erectile dysfunction medications)</li>
                      <li>Nitrates</li>
                      <li>Corticosteroids</li>
                      <li>Herbal supplements (especially St. John's Wort, Ginkgo, Ginseng)</li>
                    </ul>
                    <p className="mt-4 font-semibold text-rich-black">
                      Always share a complete medication list with your clinician.
                    </p>
                  </CardContent>
                </Card>

                {/* Treatment-Specific Safety Information */}
                <Card variant="glass">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Activity className="h-6 w-6 text-warm-stone" />
                      <h2 className="font-display text-xl font-bold text-rich-black">Testosterone Therapy Safety</h2>
                    </div>
                    <p className="mb-3 text-warm-gray">Testosterone therapy may cause:</p>
                    <ul className="ml-6 list-disc space-y-2 text-warm-gray">
                      <li>Increased red blood cell count (polycythemia)</li>
                      <li>Changes in cholesterol levels</li>
                      <li>Acne or oily skin</li>
                      <li>Mood changes or irritability</li>
                      <li>Fluid retention</li>
                      <li>Sleep apnea exacerbation</li>
                      <li>Testicular shrinkage and reduced sperm production</li>
                      <li>Prostate changes</li>
                    </ul>
                    <p className="mt-4 text-sm text-warm-gray">
                      Regular blood work is required to monitor hormone levels, red blood cell count, and other markers. Report any unusual symptoms immediately.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Dumbbell className="h-6 w-6 text-warm-stone" />
                      <h2 className="font-display text-xl font-bold text-rich-black">Peptide Therapy Safety</h2>
                    </div>
                    <p className="mb-3 text-warm-gray">Peptide therapies (Sermorelin, Tesamorelin, BPC-157, etc.) may cause:</p>
                    <ul className="ml-6 list-disc space-y-2 text-warm-gray">
                      <li>Injection site reactions (redness, swelling, itching)</li>
                      <li>Headaches</li>
                      <li>Flushing or dizziness</li>
                      <li>Nausea</li>
                      <li>Fluid retention</li>
                      <li>Joint pain or stiffness</li>
                      <li>Changes in blood sugar levels</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Brain className="h-6 w-6 text-warm-stone" />
                      <h2 className="font-display text-xl font-bold text-rich-black">NAD+ Therapy Safety</h2>
                    </div>
                    <p className="mb-3 text-warm-gray">NAD+ therapy may cause:</p>
                    <ul className="ml-6 list-disc space-y-2 text-warm-gray">
                      <li>Nausea or stomach discomfort</li>
                      <li>Flushing or warmth</li>
                      <li>Headaches</li>
                      <li>Muscle cramps</li>
                      <li>Fatigue during initial treatment</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Syringe className="h-6 w-6 text-warm-stone" />
                      <h2 className="font-display text-xl font-bold text-rich-black">Injectable Medication Safety</h2>
                    </div>
                    <p className="mb-3 text-warm-gray">When using injectable medications:</p>
                    <ul className="ml-6 list-disc space-y-2 text-warm-gray">
                      <li>Use only as instructed by your clinician</li>
                      <li>Rotate injection sites to prevent irritation or lipodystrophy</li>
                      <li><strong className="text-rich-black">Never share needles, pens, or vials</strong></li>
                      <li>Dispose of sharps in an FDA-cleared sharps container</li>
                      <li>Follow storage instructions provided by your pharmacy to maintain medication stability and sterility</li>
                      <li>Use reconstituted medications within the timeframe specified by your pharmacy</li>
                      <li>Inspect medication before use—do not use if discolored or contains particles</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Laboratory Testing</h2>
                    <p className="text-warm-gray">Your clinician may require laboratory testing before or during treatment, including:</p>
                    <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
                      <li>Complete blood count (CBC)</li>
                      <li>Comprehensive metabolic panel (CMP)</li>
                      <li>Lipid panel (cholesterol)</li>
                      <li>Hormone levels (testosterone, estradiol, etc.)</li>
                      <li>Thyroid function tests</li>
                      <li>PSA (prostate-specific antigen) for men</li>
                      <li>Hemoglobin A1c or glucose</li>
                    </ul>
                    <p className="mt-4 font-semibold text-rich-black">
                      Do not continue therapy if you cannot complete recommended monitoring.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Safety During Treatment</h2>
                    <ul className="ml-6 list-disc space-y-2 text-warm-gray">
                      <li><strong className="text-rich-black">Do not drive or operate machinery</strong> if you experience dizziness, sedation, visual changes, severe gastrointestinal symptoms, or symptoms of low blood sugar</li>
                      <li>Alcohol may worsen dizziness, glycemic instability, mood changes, or medication side effects—discuss alcohol use with your clinician</li>
                      <li>Some medications may need to be discontinued before procedures with anesthesia</li>
                      <li>Inform all surgeons and anesthesiologists of every medication you take, including compounded products and injections</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Reporting Adverse Reactions</h2>
                    <ul className="ml-6 list-disc space-y-2 text-warm-gray">
                      <li>Report non-emergency side effects to your clinician through the patient portal or secure messaging</li>
                      <li>Contact your dispensing pharmacy with medication-specific questions</li>
                      <li>Report suspected adverse reactions to FDA MedWatch at <strong className="text-rich-black">1-800-FDA-1088</strong> or <a href="https://www.fda.gov/medwatch" target="_blank" rel="noopener noreferrer" className="text-warm-stone hover:underline">www.fda.gov/medwatch</a></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardContent className="p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Questions?</h2>
                    <p className="text-warm-gray">
                      If you have questions about medication safety or this information, contact us at{" "}
                      <a href="mailto:support@elevarehealth.com" className="text-warm-stone hover:underline">
                        support@elevarehealth.com
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SafetyInformation;
