import React from "react";
import { Controller } from "react-hook-form";
import Checkbox from "@src/components/Checkbox";
import Typography from "@src/components/Typography";

interface ConsentsProps {
  control: any;
  errors: any;
}

const Consents: React.FC<ConsentsProps> = ({ control, errors }) => {
  return (
    <section className="flex flex-col gap-2">
      <Typography variant="h4">Consent Section</Typography>
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="consent.0"
          render={({ field: { onChange, value } }) => (
            <Checkbox name="consent.0" onChange={onChange} checked={value}>
              I consent to the collection of my feedback for research purposes.
            </Checkbox>
          )}
        />
        {errors.consent?.[0] && (
          <Typography className="!text-red-500" variant="caption">
            {errors.consent[0]?.message}.
          </Typography>
        )}

        <Controller
          control={control}
          name="consent.1"
          render={({ field: { onChange, value } }) => (
            <Checkbox name="consent.1" onChange={onChange} checked={value}>
              I understand that my participation is voluntary and that I can
              withdraw at any time without giving a reason.
            </Checkbox>
          )}
        />
        {errors.consent?.[1] && (
          <Typography className="!text-red-500" variant="caption">
            {errors.consent[1]?.message}.
          </Typography>
        )}

        <Controller
          control={control}
          name="consent.2"
          render={({ field: { onChange, value } }) => (
            <Checkbox name="consent.2" onChange={onChange} checked={value}>
              I agree that the data collected will be used for academic purposes
              and may be published in an anonymous form.
            </Checkbox>
          )}
        />
        {errors.consent?.[2] && (
          <Typography className="!text-red-500" variant="caption">
            {errors.consent[2]?.message}.
          </Typography>
        )}
      </div>
    </section>
  );
};

export default Consents;
