"use client";

import { LessonHero, LessonPage, LessonSection } from "@src/components/content";
import { Typography } from "@/components/ui/typography";

export default function PrivacyContent() {
  return (
    <LessonPage>
      <LessonHero
        badge="Legal"
        title="Privacy Policy"
        description="How CircuLearn handles your information when you use the app."
      />

      <LessonSection>
        <Typography variant="body-sm" className="text-muted-foreground">
          Welcome to my Privacy Policy page. I value your privacy and am
          committed to protecting your personal information. This Privacy Policy
          explains how I collect, use, and protect your data when you use my
          application. By using this service, you agree to the collection and
          use of information in accordance with this policy.
        </Typography>
      </LessonSection>

      <LessonSection title="Information Collection">
        <Typography variant="body-sm" className="text-muted-foreground">
          CircuLearn is designed for learning in the browser. The course quiz is
          graded on your device when you submit; those answers and scores are not
          sent to our servers. We do not collect personally identifiable
          information through the quiz or other lesson pages.
        </Typography>
      </LessonSection>

      <LessonSection title="Use of Information">
        <Typography variant="body-sm" className="text-muted-foreground">
          Any optional contact you send through the Contact page is used only to
          respond to your message. Quiz results remain on your device for your own
          review and are not used for server-side analytics.
        </Typography>
      </LessonSection>

      <LessonSection title="Browser storage">
        <Typography variant="body-sm" className="text-muted-foreground">
          CircuLearn stores a few non-personal preferences in your browser&apos;s
          local storage (for example, whether you accepted cookies or dismissed
          the welcome guide). Theme choice is handled by your browser and the
          app&apos;s theme setting. These values are not uploaded to our servers.
        </Typography>
      </LessonSection>

      <LessonSection title="Data Protection">
        <Typography variant="body-sm" className="text-muted-foreground">
          Because quiz data stays in your browser session, there is no central
          database of your answers to protect on our side. If you use the Contact
          form, treat the details you share as you would in any email
          correspondence.
        </Typography>
      </LessonSection>

      <LessonSection title="User Rights">
        <Typography variant="body-sm" className="text-muted-foreground">
          As a user, you have the right to access the data collected through
          your interactions with the application, though it is fully anonymized.
          If you wish to withdraw from the study or request that your data be
          deleted, you may do so at any time by contacting me directly. You also
          have the right to be informed about how your data is being used and
          protected.
        </Typography>

        <Typography variant="body-sm" className="text-muted-foreground">
          For any questions or concerns regarding this Privacy Policy, or to
          exercise your rights, please contact me through the contact
          information provided in the application.
        </Typography>
      </LessonSection>
    </LessonPage>
  );
}
