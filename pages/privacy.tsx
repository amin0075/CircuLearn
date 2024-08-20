import React, { ReactNode } from "react";
import Head from "next/head";
import Typography from "@src/components/Typography";
import Paper from "@src/components/Paper";

interface IProps {
  children?: ReactNode;
}

const Privacy: React.FC<IProps> = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 min-h-full">
        <Typography variant="h2">Privacy Policy</Typography>

        <Typography variant="body2">
          Welcome to my Privacy Policy page. I value your privacy and am
          committed to protecting your personal information. This Privacy Policy
          explains how I collect, use, and protect your data when you use my
          application. By using this service, you agree to the collection and
          use of information in accordance with this policy.
        </Typography>

        {/* Information Collection */}
        <Typography className="underline" fontweight="semiBold">
          Information Collection
        </Typography>
        <Typography variant="body2">
          The application collects data to measure the effectiveness of its
          educational content, including interactions with quizzes, feedback
          forms. The data collected is completely anonymous and does not include
          any personally identifiable information. The purpose of this data
          collection is to improve the application and ensure it meets the
          learning needs of users.
        </Typography>

        {/* Use of Information */}
        <Typography className="underline" fontweight="semiBold">
          Use of Information
        </Typography>
        <Typography variant="body2">
          The data collected is used to assess the educational effectiveness of
          the application, specifically in teaching simple logic circuits. Your
          interactions with the application, including quiz results and
          feedback, will be analyzed to improve the content and user experience.
          This data is used solely for research purposes and to refine the
          application’s features.
        </Typography>

        {/* Data Protection */}
        <Typography className="underline" fontweight="semiBold">
          Data Protection
        </Typography>
        <Typography variant="body2">
          I am committed to ensuring that your data is secure. All data
          collected through the application is anonymized and stored on a secure
          server. No personal data is collected or stored, ensuring your privacy
          is fully protected. Data protection measures include encryption and
          secure storage protocols to prevent unauthorized access.
        </Typography>

        {/* Third-Party Services */}
        <Typography className="underline" fontweight="semiBold">
          Third-Party Services
        </Typography>
        <Typography variant="body2">
          The application utilizes the OpenAI API to power the chatbot feature.
          While interacting with the chatbot, your questions and responses are
          processed by OpenAI’s servers to generate appropriate replies. No
          personal information is transmitted or stored by OpenAI, and all data
          is anonymized. I ensure that third-party services comply with strict
          data protection standards.
        </Typography>

        {/* User Rights */}
        <Typography className="underline" fontweight="semiBold">
          User Rights
        </Typography>
        <Typography variant="body2">
          As a user, you have the right to access the data collected through
          your interactions with the application, though it is fully anonymized.
          If you wish to withdraw from the study or request that your data be
          deleted, you may do so at any time by contacting me directly. You also
          have the right to be informed about how your data is being used and
          protected.
        </Typography>

        <Typography variant="body2">
          For any questions or concerns regarding this Privacy Policy, or to
          exercise your rights, please contact me through the contact
          information provided in the application.
        </Typography>
      </Paper>
    </>
  );
};

export default Privacy;
