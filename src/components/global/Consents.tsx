import React from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
} from "react-hook-form";

import { Checkbox } from "@src/components/ui/checkbox";
import { Label } from "@src/components/ui/label";
import { Typography } from "@src/components/ui/typography";
import {
  CONSENT_AGREEMENT_LABEL,
  QUIZ_CONSENT_STATEMENTS,
  type ConsentContext,
  getConsentIntro,
} from "@src/lib/consent";

export interface ConsentFormValues {
  consent: boolean;
}

type ConsentsBaseProps = {
  context: ConsentContext;
  idPrefix?: string;
};

type ConsentsStandaloneProps = ConsentsBaseProps & {
  agreed: boolean;
  onAgreedChange: (checked: boolean) => void;
  errorMessage?: string;
};

type ConsentsFormProps = ConsentsBaseProps & {
  control: Control<ConsentFormValues>;
  errors: FieldErrors<ConsentFormValues>;
};

export type ConsentsProps = ConsentsStandaloneProps | ConsentsFormProps;

function isFormProps(props: ConsentsProps): props is ConsentsFormProps {
  return "control" in props;
}

function ConsentAgreementCheckbox({
  id,
  agreed,
  onAgreedChange,
  errorMessage,
}: {
  id: string;
  agreed: boolean;
  onAgreedChange: (checked: boolean) => void;
  errorMessage?: string;
}) {
  return (
    <div>
      <div className="flex items-start gap-2">
        <Checkbox
          id={id}
          checked={agreed}
          onCheckedChange={(checked) => onAgreedChange(checked === true)}
        />
        <Label htmlFor={id}>{CONSENT_AGREEMENT_LABEL}</Label>
      </div>
      {errorMessage && (
        <Typography variant="body-xs" className="text-destructive">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

function ConsentSectionContent({
  context,
  idPrefix,
  agreed,
  onAgreedChange,
  errorMessage,
}: {
  context: ConsentContext;
  idPrefix: string;
  agreed: boolean;
  onAgreedChange: (checked: boolean) => void;
  errorMessage?: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <Typography variant="heading-lg" as="h2">
        Consent Section
      </Typography>
      <Typography variant="body-sm" className="text-muted-foreground">
        {getConsentIntro(context)}
      </Typography>
      <ul className="flex list-disc flex-col gap-2 pl-5">
        {QUIZ_CONSENT_STATEMENTS.map((statement) => (
          <li key={statement}>
            <Typography variant="body-sm" as="span">
              {statement}
            </Typography>
          </li>
        ))}
      </ul>
      <ConsentAgreementCheckbox
        id={`${idPrefix}-consent-agreement`}
        agreed={agreed}
        onAgreedChange={onAgreedChange}
        errorMessage={errorMessage}
      />
    </section>
  );
}

const Consents: React.FC<ConsentsProps> = (props) => {
  const { context, idPrefix = "consent" } = props;

  if (isFormProps(props)) {
    return (
      <Controller
        control={props.control}
        name="consent"
        render={({ field: { onChange, value } }) => (
          <ConsentSectionContent
            context={context}
            idPrefix={idPrefix}
            agreed={value}
            onAgreedChange={onChange}
            errorMessage={props.errors.consent?.message}
          />
        )}
      />
    );
  }

  return (
    <ConsentSectionContent
      context={context}
      idPrefix={idPrefix}
      agreed={props.agreed}
      onAgreedChange={props.onAgreedChange}
      errorMessage={props.errorMessage}
    />
  );
};

export default Consents;
