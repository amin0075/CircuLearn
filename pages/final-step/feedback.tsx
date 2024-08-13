import React from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import Button from "@src/components/Button";
import Checkbox from "@src/components/Checkbox";
import RadioButton from "@src/components/RadioButton";
import Paper from "@src/components/Paper";

// Data
import evaluationData from "@src/lib/feedback.json";
import Typography from "@src/components/Typography";
import { textColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";

// Form validation schema using Yup
const schema = yup
  .object()
  .shape({
    questionnaire: yup.array().of(
      yup.object().shape({
        answer: yup.string().required("This field is required"),
      })
    ),
    nielsen: yup.array().of(
      yup.object().shape({
        passFailVal: yup.string().required("This field is required"),
      })
    ),
    gestalt: yup.array().of(
      yup.object().shape({
        passFailVal: yup.string().required("This field is required"),
      })
    ),
    wcag: yup.array().of(
      yup.object().shape({
        passFailVal: yup.string().required("This field is required"),
      })
    ),
    consent: yup
      .array()
      .of(yup.boolean().oneOf([true], "You must agree to continue")),
  })
  .required();

// Define form input types
interface IFormInputs {
  questionnaire: { answer: string }[];
  nielsen: { passFailVal: string }[];
  gestalt: { passFailVal: string }[];
  wcag: { passFailVal: string }[];
  consent: boolean[];
}

const EvaluationForm: React.FC = () => {
  const { primaryColor } = useThemeStore((state) => state);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      questionnaire: evaluationData.questionnaire.map(() => ({ answer: "" })),
      nielsen: evaluationData.nielsen.map(() => ({ passFailVal: "" })),
      gestalt: evaluationData.gestalt.map(() => ({ passFailVal: "" })),
      wcag: evaluationData.wcag.map(() => ({ passFailVal: "" })),
      consent: [false, false, false],
    },
  });

  // useFieldArray for dynamic fields
  const { fields: questionnaireFields } = useFieldArray({
    control,
    name: "questionnaire",
  });
  const { fields: nielsenFields } = useFieldArray({
    control,
    name: "nielsen",
  });
  const { fields: gestaltFields } = useFieldArray({
    control,
    name: "gestalt",
  });
  const { fields: wcagFields } = useFieldArray({
    control,
    name: "wcag",
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    // Handle the form submission
  };

  return (
    <Paper className="flex flex-col gap-4 w-full p-4 md:p-6">
      <Typography variant="h2">Feedback</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        {/* User Questionnaire Section */}
        <section className="flex flex-col gap-2 mb-4">
          <Typography variant="h4" className={`${textColor(primaryColor)}`}>
            Feedback on the Interactive Application
          </Typography>
          {questionnaireFields.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Typography>
                {index + 1}. {evaluationData.questionnaire[index].question}
              </Typography>
              <Controller
                control={control}
                name={`questionnaire.${index}.answer`}
                render={({ field }) => (
                  <>
                    {evaluationData.questionnaire[index].options.map(
                      (option, optIndex) => (
                        <RadioButton
                          key={optIndex}
                          {...field}
                          value={option}
                          id={`questionnaire-${index}-option-${optIndex}`}
                          // @ts-ignore
                          checked={field.value === option}
                        >
                          {option}
                        </RadioButton>
                      )
                    )}
                  </>
                )}
              />
              {errors.questionnaire?.[index]?.answer && (
                <Typography className="!text-red-500" variant="caption">
                  {errors.questionnaire[index].answer?.message}.
                </Typography>
              )}
            </div>
          ))}
        </section>

        {/* Nielsen's 10 Usability Heuristics Section */}
        <section className="flex flex-col gap-2 mb-4">
          <Typography variant="h4" className={`${textColor(primaryColor)}`}>
            Nielsen's 10 Usability Heuristics
          </Typography>
          {nielsenFields.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Typography>
                {index + 1}. {evaluationData.nielsen[index].heuristic}
              </Typography>
              <ul className="list-disc ml-4">
                {evaluationData.nielsen[index].notes.map((note, noteIndex) => (
                  <li key={noteIndex}>
                    <Typography variant="body2">{note}</Typography>
                  </li>
                ))}
              </ul>
              <Controller
                control={control}
                name={`nielsen.${index}.passFailVal`}
                render={({ field }) => (
                  <>
                    <RadioButton
                      {...field}
                      value="pass"
                      id={`nielsen-${index}-pass`}
                      // @ts-ignore
                      checked={field.value === "pass"}
                    >
                      Pass
                    </RadioButton>
                    <RadioButton
                      {...field}
                      value="fail"
                      id={`nielsen-${index}-fail`}
                      // @ts-ignore
                      checked={field.value === "fail"}
                    >
                      Fail
                    </RadioButton>
                  </>
                )}
              />
              {errors.nielsen?.[index]?.passFailVal && (
                <Typography className="!text-red-500" variant="caption">
                  {errors.nielsen[index].passFailVal?.message}.
                </Typography>
              )}
            </div>
          ))}
        </section>

        {/* Gestalt's Principles Section */}
        <section className="flex flex-col gap-2 mb-4">
          <Typography variant="h4" className={`${textColor(primaryColor)}`}>
            Gestalt's Principles
          </Typography>
          {gestaltFields.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Typography>
                {index + 1}. {evaluationData.gestalt[index].principle}
              </Typography>
              <ul className="list-disc ml-4">
                {evaluationData.gestalt[index].notes.map((note, noteIndex) => (
                  <li key={noteIndex}>
                    <Typography variant="body2">{note}</Typography>
                  </li>
                ))}
              </ul>
              <Controller
                control={control}
                name={`gestalt.${index}.passFailVal`}
                render={({ field }) => (
                  <>
                    <RadioButton
                      {...field}
                      value="pass"
                      id={`gestalt-${index}-pass`}
                      // @ts-ignore
                      checked={field.value === "pass"}
                    >
                      Pass
                    </RadioButton>
                    <RadioButton
                      {...field}
                      value="fail"
                      id={`gestalt-${index}-fail`}
                      // @ts-ignore
                      checked={field.value === "fail"}
                    >
                      Fail
                    </RadioButton>
                  </>
                )}
              />
              {errors.gestalt?.[index]?.passFailVal && (
                <Typography className="!text-red-500" variant="caption">
                  {errors.gestalt[index].passFailVal?.message}.
                </Typography>
              )}
            </div>
          ))}
        </section>

        {/* WCAG 2.1 (AA) Criteria Section */}
        <section className="flex flex-col gap-2 mb-4">
          <Typography variant="h4" className={`${textColor(primaryColor)}`}>
            WCAG 2.1 (AA)
          </Typography>
          {wcagFields.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Typography>
                {index + 1}. {evaluationData.wcag[index].criteria}
              </Typography>
              <ul className="list-disc ml-4">
                {evaluationData.wcag[index].notes.map((note, noteIndex) => (
                  <li key={noteIndex}>
                    <Typography variant="body2">{note}</Typography>
                  </li>
                ))}
              </ul>
              <Controller
                control={control}
                name={`wcag.${index}.passFailVal`}
                render={({ field }) => (
                  <>
                    <RadioButton
                      {...field}
                      value="pass"
                      id={`wcag-${index}-pass`}
                      // @ts-ignore
                      checked={field.value === "pass"}
                    >
                      Pass
                    </RadioButton>
                    <RadioButton
                      {...field}
                      value="fail"
                      id={`wcag-${index}-fail`}
                      // @ts-ignore
                      checked={field.value === "fail"}
                    >
                      Fail
                    </RadioButton>
                  </>
                )}
              />
              {errors.wcag?.[index]?.passFailVal && (
                <Typography className="!text-red-500" variant="caption">
                  {errors.wcag[index].passFailVal?.message}.
                </Typography>
              )}
            </div>
          ))}
        </section>

        {/* Static Consent Section */}
        <section className="flex flex-col gap-2">
          <Typography variant="h4" className={`${textColor(primaryColor)}`}>
            Consent section
          </Typography>
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="consent.0"
              render={({ field: { onChange, value } }) => (
                <Checkbox name="consent.0" onChange={onChange} checked={value}>
                  I consent to the collection of my feedback for research
                  purposes.
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
                  I agree that the data collected will be used for academic
                  purposes and may be published in an anonymous form.
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

        <Button variant="contained" type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default EvaluationForm;
