import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Momentum — Last updated: March 29, 2026</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Overview</h2>
            <p>
              Momentum is a personal productivity app for daily check-ins and goal tracking.
              This policy explains what data the app accesses, how it is used, and your rights as a user.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data We Collect</h2>
            <p className="mb-3">Momentum does not collect or transmit any personal data to external servers. All data you enter stays on your device.</p>
            <p>The app requests the following device permissions:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><span className="text-foreground font-medium">Microphone</span> — used only for voice check-ins. Audio is processed locally for speech-to-text transcription and is never recorded, stored, or sent anywhere.</li>
              <li><span className="text-foreground font-medium">Notifications</span> — used to send optional daily reminders. You can disable these at any time in your device settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data Storage</h2>
            <p>
              All app data — including your journal entries, goals, and settings — is stored locally on your device using AsyncStorage.
              This data is not backed up to any cloud service and is not accessible to us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">In-App Purchases</h2>
            <p>
              Momentum offers a one-time in-app purchase (lifetime unlock) processed through Google Play.
              Payment information is handled entirely by Google and is never seen or stored by us.
              For questions about billing, refer to Google Play's support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Third-Party Services</h2>
            <p>
              Momentum does not integrate with any third-party analytics, advertising, or tracking services.
              The only third-party service involved is Google Play for app distribution and in-app purchases,
              which is governed by Google's own privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Children's Privacy</h2>
            <p>
              Momentum is not directed at children under the age of 13. We do not knowingly collect
              any information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Changes to This Policy</h2>
            <p>
              If this privacy policy changes, the updated version will be posted at this URL.
              Continued use of the app after changes constitutes acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
            <p>
              If you have any questions about this privacy policy, you can reach us at{" "}
              <a href="mailto:codezart.git@gmail.com" className="text-foreground underline underline-offset-4">
                codezart.git@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
