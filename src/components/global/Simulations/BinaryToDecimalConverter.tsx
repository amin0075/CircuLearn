import { useState } from "react";

import { Button } from "@src/components/ui/button";
import { Field } from "@src/components/ui/field";
import { Card } from "@src/components/ui/card";
import { Typography } from "@src/components/ui/typography";

const BinaryToDecimalConverter = () => {
  const [binary, setBinary] = useState("");
  const [steps, setSteps] = useState<number[]>([]);
  const [decimal, setDecimal] = useState<number | null>(null);

  const convertToDecimal = () => {
    const isValidBinary = /^[01]+$/.test(binary);
    if (isValidBinary) {
      const reversedBinary = binary.split("").reverse();
      const calculatedSteps = reversedBinary.map(
        (bit, index) => parseInt(bit) * Math.pow(2, index),
      );
      const decimalValue = calculatedSteps.reduce((acc, step) => acc + step, 0);

      setSteps(calculatedSteps.reverse());
      setDecimal(decimalValue);
    } else {
      setSteps([]);
      setDecimal(null);
      alert("Please enter a valid binary number (only 0s and 1s)");
    }
  };

  return (
    <Card className="mb-4 p-4">
      <Typography variant="heading-xl" as="h2">
        Binary to Decimal Converter
      </Typography>
      <div className="mt-4 flex items-center gap-4">
        <Field
          variant="bordered"
          label={<Typography variant="body-base">Binary Number</Typography>}
          value={binary}
          onChange={(e) => {
            setSteps([]);
            setBinary(e.target.value);
          }}
          className="px-2"
        />
        <Button className="self-end" onClick={convertToDecimal}>
          Convert
        </Button>
      </div>
      {steps.length > 0 && (
        <div className="mt-4">
          <Typography variant="body-base">Calculation Steps:</Typography>
          <div className="mt-2 flex items-center">
            {binary.split("").map((digit, index) => (
              <div key={index} className="mx-2 flex flex-col items-center">
                <Typography variant="heading-xl" as="h2">
                  {digit}
                </Typography>
                <Typography variant="body-sm">
                  × 2<sup>{binary.length - index - 1}</sup>
                </Typography>
                <Typography variant="body-sm">= {steps[index]}</Typography>
              </div>
            ))}
          </div>
          <Typography variant="body-base" className="mt-4">
            Sum of all values = <strong>{decimal}</strong>
          </Typography>
        </div>
      )}
    </Card>
  );
};

export default BinaryToDecimalConverter;
