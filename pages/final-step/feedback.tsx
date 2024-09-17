import React, { useState } from "react";
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
import RadioButton from "@src/components/RadioButton";
import Paper from "@src/components/Paper";

// Data
import evaluationData from "@src/lib/feedback.json";
import Typography from "@src/components/Typography";
import { textColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";
import Consents from "@src/components/global/Consents";
import TextField from "@src/components/TextField";
import Head from "next/head";
import axios from "axios";
import { notify } from "@src/utils/notify";
import { useRouter } from "next/router";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { ROUTES_URL } from "@src/routes";

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
    consent: yup
      .array()
      .of(yup.boolean().oneOf([true], "You must agree to continue")),
    suggestions: yup.string(),
  })
  .required();

// Define form input types
interface IFormInputs {
  questionnaire: { answer: string }[];
  nielsen: { passFailVal: string }[];
  gestalt: { passFailVal: string }[];
  consent: boolean[];
  suggestions: string;
}

const EvaluationForm: React.FC = () => {
  const { primaryColor } = useThemeStore((state) => state);
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      consent: [false, false, false],
      suggestions: "",
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

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const feedbackData = {
      questionnaire: data.questionnaire,
      nielsen: data.nielsen,
      gestalt: data.gestalt,
      userSuggestion: data.suggestions,
    };

    try {
      // Send the feedback to the backend
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback`,
        {
          feedback: feedbackData,
        },
        {
          withCredentials: true,
        }
      );
      notify({
        message: "Feedback submitted successfully",
        router,

        type: "success",
      });
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.code === "Session_Exists_in_DB"
      ) {
        notify({
          message: "You have already submitted feedback",
          router,

          type: "error",
        });
      } else {
        notify({
          message: "Error submitting feedback",
          router,

          type: "error",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Quiz page</title>
        <meta name="description" content="Quiz page" />
      </Head>
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

          {/* Nielsen's Usability Heuristics Section */}
          <section className="flex flex-col gap-2 mb-4">
            <Typography variant="h4" className={`${textColor(primaryColor)}`}>
              Nielsen's Usability Heuristics
            </Typography>
            {nielsenFields.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Typography>
                  {index + 1}. {evaluationData.nielsen[index].heuristic}
                </Typography>
                <ul className="list-disc ml-4">
                  {evaluationData.nielsen[index].notes.map(
                    (note, noteIndex) => (
                      <li key={noteIndex}>
                        <Typography variant="body2">{note}</Typography>
                      </li>
                    )
                  )}
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
                  {evaluationData.gestalt[index].notes.map(
                    (note, noteIndex) => (
                      <li key={noteIndex}>
                        <Typography variant="body2">{note}</Typography>
                      </li>
                    )
                  )}
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

          <Controller
            control={control}
            name="suggestions"
            render={({ field }) => (
              <TextField
                label={
                  <Typography variant="body2">
                    Suggestions or Feedback
                  </Typography>
                }
                variant="bordered"
                {...field}
                multiLine
                rows={4}
                className="px-2"
                placeholder="Please share any suggestions or feedback here"
                error={!!errors.suggestions}
                errorText={errors.suggestions?.message}
              />
            )}
          />

          {/* Static Consent Section */}
          <Consents control={control} errors={errors} />

          <Button variant="contained" type="submit" className="mt-5">
            Submit
          </Button>
        </form>
        {isSubmitted && (
          <HelperNavigation
            previousRoute={ROUTES_URL.quiz}
            previousRouteLabel="Quiz"
            nextRoute={ROUTES_URL.glossary}
            NextRouteLabel="Glossary"
          />
        )}
      </Paper>
    </>
  );
};

export default EvaluationForm;
