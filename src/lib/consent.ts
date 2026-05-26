export const QUIZ_CONSENT_STATEMENTS = [
  "I understand that my quiz answers are graded on this device only and are not sent to a server.",
  "I understand that my participation is voluntary.",
  "I confirm that before lessons in this application I did not have any knowledge about the logic gates.",
] as const;

/** @deprecated Feedback flow removed; use QUIZ_CONSENT_STATEMENTS */
export const CONSENT_STATEMENTS = QUIZ_CONSENT_STATEMENTS;

export const CONSENT_AGREEMENT_LABEL =
  "I have read the statements above and agree to all of them.";

export type ConsentContext = "quiz";

export function getConsentIntro(_context: ConsentContext): string {
  return "You have reached the end of the quiz. Before submitting your answers, please read the statements below and confirm your consent.";
}
