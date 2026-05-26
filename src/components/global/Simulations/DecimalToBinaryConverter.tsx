import { useState } from "react";

import { Button } from "@src/components/ui/button";
import { Field } from "@src/components/ui/field";
import { Card } from "@src/components/ui/card";
import { Typography } from "@src/components/ui/typography";

const DecimalToBinaryConverter = () => {
  const [decimal, setDecimal] = useState("");
  const [steps, setSteps] = useState<{ quotient: number; remainder: number }[]>(
    [],
  );
  const [binary, setBinary] = useState<string | null>(null);

  const convertToBinary = () => {
    const decimalNumber = parseInt(decimal, 10);
    if (!isNaN(decimalNumber)) {
      let quotient = decimalNumber;
      const calculatedSteps = [];
      let binaryResult = "";

      while (quotient > 0) {
        const remainder = quotient % 2;
        calculatedSteps.push({ quotient, remainder });
        binaryResult = remainder + binaryResult;
        quotient = Math.floor(quotient / 2);
      }

      setSteps(calculatedSteps);
      setBinary(binaryResult);
    } else {
      setSteps([]);
      setBinary(null);
      alert("Please enter a valid decimal number");
    }
  };

  return (
    <Card className="mb-4 p-4">
      <Typography variant="heading-xl" as="h2">
        Decimal to Binary Converter
      </Typography>
      <div className="mt-4 flex items-center gap-4">
        <Field
          variant="bordered"
          label={<Typography variant="body-base">Decimal Number</Typography>}
          value={decimal}
          onChange={(e) => setDecimal(e.target.value)}
          className="px-2"
        />
        <Button className="self-end" onClick={convertToBinary}>
          Convert
        </Button>
      </div>
      {steps.length > 0 && (
        <div className="mt-4">
          <Typography variant="body-base">Calculation Steps:</Typography>
          <div className="mt-2 flex flex-col">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <Typography variant="body-sm">
                  {step.quotient} ÷ 2 = {Math.floor(step.quotient / 2)} remainder{" "}
                  {step.remainder}
                </Typography>
              </div>
            ))}
          </div>
          <Typography variant="body-base" className="mt-4">
            Binary Equivalent: <strong>{binary}</strong>
          </Typography>
        </div>
      )}
    </Card>
  );
};

export default DecimalToBinaryConverter;
