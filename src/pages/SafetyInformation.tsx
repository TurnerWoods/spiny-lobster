import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const SafetyInformation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="mb-8 font-display text-4xl font-bold text-foreground">General Safety Information</h1>
              
              <div className="mb-8 rounded-xl border border-amber-500/50 bg-amber-500/10 p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-500" />
                  <div>
                    <h3 className="mb-2 font-display text-lg font-bold text-foreground">Important Notice</h3>
                    <p className="text-sm text-muted-foreground">
                      Information on this page summarizes potential risks, side effects, warnings, interactions, and usage considerations for therapies discussed or prescribed through Elevare Health. This is educational only and is <strong>not a substitute</strong> for individualized medical advice, diagnosis, or treatment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">About Elevare Health</h2>
                  <p>
                    Elevare Health is a technology and administrative platform. We do <strong>not</strong> practice medicine and do <strong>not</strong> dispense medications. All diagnosis, treatment decisions, prescriptions, and clinical care are performed exclusively by independent, licensed clinicians. Medications are dispensed solely by licensed pharmacies.
                  </p>
                  <p className="mt-2">
                    Completion of an intake or telehealth visit does <strong>not</strong> guarantee receipt of a prescription, specific medication, formulation, dose, or refill.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Off-Label & Compounded Medications</h2>
                  <p>
                    Some therapies may be prescribed <strong>off-label</strong> (for uses not specifically approved by the FDA) based on the clinician's professional judgment when potential benefits outweigh risks.
                  </p>
                  <p className="mt-2">
                    Some medications may also be <strong>compounded</strong> by licensed U.S. pharmacies to meet individual patient needs. Compounded medications are <strong>not FDA-approved</strong> for safety, effectiveness, or quality, and the FDA has not reviewed these formulations for sterility, potency, or bioequivalence.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Always Inform Your Clinician</h2>
                  <p>Before starting any treatment, tell your clinician about:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-2">
                    <li>All prescription and over-the-counter medications, supplements, herbs, vitamins, recreational substances, alcohol and nicotine use</li>
                    <li>Any drug allergies</li>
                    <li>Full medical history including cardiovascular, endocrine, metabolic, psychiatric, neurologic, renal, hepatic, gastrointestinal, hematologic, immune, cancer/tumor history, or history of bariatric surgery</li>
                  </ul>
                  <p className="mt-4">
                    Do not use any medication if pregnant, planning pregnancy, or breastfeeding unless your clinician has specifically authorized it.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Medication Interactions</h2>
                  <p>
                    Some therapies may interact with other medications or substances, including: insulin, sulfonylureas, anticoagulants (e.g., warfarin), thyroid medication, antidepressants, stimulants, benzodiazepines, opioids, seizure medications, blood pressure medications, decongestants, PDE-5 inhibitors, nitrates, corticosteroids, and herbal supplements such as St. John's Wort.
                  </p>
                  <p className="mt-2">
                    Always share a complete medication list with your clinician.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Injectable Medications</h2>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Use only as instructed</li>
                    <li>Rotate injection sites</li>
                    <li>Never share needles, pens, or vials</li>
                    <li>Dispose of sharps in an FDA-cleared sharps container</li>
                    <li>Follow storage instructions provided by pharmacy to maintain medication stability and sterility</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Safety During Treatment</h2>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Do not drive or operate machinery if you experience dizziness, sedation, visual changes, severe gastrointestinal symptoms, or symptoms of low blood sugar</li>
                    <li>Alcohol may worsen dizziness, glycemic instability, mood changes, or medication side effects</li>
                    <li>Always discuss alcohol use with your clinician</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Adverse Reactions Reporting</h2>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Report non-emergency side effects to your clinician and pharmacy</li>
                    <li>Suspected adverse reactions may also be reported to FDA MedWatch at 1-800-FDA-1088 or www.fda.gov/medwatch</li>
                    <li>If you experience severe or life-threatening symptoms such as chest pain, severe allergic reactions, difficulty breathing, severe abdominal pain, or loss of consciousness, <strong>seek emergency care immediately</strong></li>
                  </ul>
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

export default SafetyInformation;
