// import React, { useState } from "react";
// import Paper from "@src/components/Paper";
// import Typography from "@src/components/Typography";
// import TextField from "@src/components/TextField";
// import Button from "@src/components/Button";

// const DecimalToBinaryConverter: React.FC = () => {
//   const [decimal, setDecimal] = useState("");
//   const [binary, setBinary] = useState<string | null>(null);

//   const convertToBinary = () => {
//     const decimalNumber = parseInt(decimal, 10);
//     if (!isNaN(decimalNumber)) {
//       const binaryValue = decimalNumber.toString(2);
//       setBinary(binaryValue);
//     } else {
//       setBinary(null);
//       alert("Please enter a valid decimal number");
//     }
//   };

//   return (
//     <Paper className="p-4 mb-4">
//       <Typography variant="h3">Decimal to Binary Converter</Typography>
//       <div className="flex gap-4 items-center mt-4">
//         <TextField
//           label={<Typography variant="body1">Decimal Number</Typography>}
//           value={decimal}
//           onChange={(e) => setDecimal(e.target.value)}
//           variant="bordered"
//           className="px-2"
//         />
//         <Button
//           variant="contained"
//           className="self-end"
//           onClick={convertToBinary}
//         >
//           Convert
//         </Button>
//       </div>
//       {binary !== null && (
//         <Typography variant="body1" className="mt-4">
//           Binary Equivalent: <strong>{binary}</strong>
//         </Typography>
//       )}
//     </Paper>
//   );
// };

// export default DecimalToBinaryConverter;

import React, { useState } from "react";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import TextField from "@src/components/TextField";
import Button from "@src/components/Button";

const DecimalToBinaryConverter: React.FC = () => {
  const [decimal, setDecimal] = useState("");
  const [steps, setSteps] = useState<{ quotient: number; remainder: number }[]>(
    []
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
    <Paper className="p-4 mb-4">
      <Typography variant="h3">Decimal to Binary Converter</Typography>
      <div className="flex gap-4 items-center mt-4">
        <TextField
          variant="bordered"
          label={<Typography variant="body1">Decimal Number</Typography>}
          value={decimal}
          onChange={(e) => setDecimal(e.target.value)}
          className="px-2"
        />
        <Button
          variant="contained"
          className="self-end"
          onClick={convertToBinary}
        >
          Convert
        </Button>
      </div>
      {steps.length > 0 && (
        <div className="mt-4">
          <Typography variant="body1">Calculation Steps:</Typography>
          <div className="flex flex-col mt-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <Typography variant="body2">
                  {step.quotient} ÷ 2 = {Math.floor(step.quotient / 2)}{" "}
                  remainder {step.remainder}
                </Typography>
              </div>
            ))}
          </div>
          <Typography variant="body1" className="mt-4">
            Binary Equivalent: <strong>{binary}</strong>
          </Typography>
        </div>
      )}
    </Paper>
  );
};

export default DecimalToBinaryConverter;
