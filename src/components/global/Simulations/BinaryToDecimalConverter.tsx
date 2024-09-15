import React, { useState } from "react";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import TextField from "@src/components/TextField";
import Button from "@src/components/Button";

const BinaryToDecimalConverter: React.FC = () => {
  const [binary, setBinary] = useState("");
  const [steps, setSteps] = useState<number[]>([]);
  const [decimal, setDecimal] = useState<number | null>(null);

  const convertToDecimal = () => {
    const isValidBinary = /^[01]+$/.test(binary);
    if (isValidBinary) {
      const reversedBinary = binary.split("").reverse();
      const calculatedSteps = reversedBinary.map(
        (bit, index) => parseInt(bit) * Math.pow(2, index)
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
    <Paper className="p-4 mb-4">
      <Typography variant="h3">Binary to Decimal Converter</Typography>
      <div className="flex gap-4 items-center mt-4">
        <TextField
          variant="bordered"
          label={<Typography variant="body1">Binary Number</Typography>}
          value={binary}
          onChange={(e) => {
            setSteps([]);
            setBinary(e.target.value);
          }}
          className="px-2"
        />
        <Button
          variant="contained"
          className="self-end"
          onClick={convertToDecimal}
        >
          Convert
        </Button>
      </div>
      {steps.length > 0 && (
        <div className="mt-4">
          <Typography variant="body1">Calculation Steps:</Typography>
          <div className="flex items-center mt-2">
            {binary.split("").map((digit, index) => (
              <div key={index} className="flex flex-col items-center mx-2">
                <Typography variant="h4">{digit}</Typography>
                <Typography variant="body2">
                  × 2<sup>{binary.length - index - 1}</sup>
                </Typography>
                <Typography variant="body2">= {steps[index]}</Typography>
              </div>
            ))}
          </div>
          <Typography variant="body1" className="mt-4">
            Sum of all values = <strong>{decimal}</strong>
          </Typography>
        </div>
      )}
    </Paper>
  );
};

export default BinaryToDecimalConverter;
