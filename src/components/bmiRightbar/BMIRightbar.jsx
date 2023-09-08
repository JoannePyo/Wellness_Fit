import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import bmiPicture from "../../assets/bmiPicture.png";

import "./bmiRightbar.scss";

const BMIRightbar = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("female");
  const [bmi, setBmi] = useState(null);
  const [bmiRange, setBmiRange] = useState("");

  const calculateBmi = () => {
    if (weight && height) {
      const weightInKg = parseFloat(weight);
      const heightInCm = parseFloat(height);

      const heightInM = heightInCm / 100;
      let bmiValue = null;
      let bmiRangeValue = "";

      if (gender === "female" || gender === "male") {
        bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(2);
        //bmiValue = ((weightInKg / (heightInM * heightInM)) * 1.1).toFixed(2); for male

        if (bmiValue < 18.5) {
          bmiRangeValue = "Underweight";
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
          bmiRangeValue = "Healthy Weight";
        } else if (bmiValue >= 25 && bmiValue < 30) {
          bmiRangeValue = "Overweight";
        } else if (bmiValue >= 30 && bmiValue < 35) {
          bmiRangeValue = "Obesity class I ";
        } else if (bmiValue >= 35 && bmiValue < 40) {
          bmiRangeValue = "Obesity class II ";
        } else if (bmiValue >= 40) {
          bmiRangeValue = "Obesity class III ";
        }
      }
      setBmi(bmiValue);
      setBmiRange(bmiRangeValue);
    }
  };

  return (
    <div className="bmiRightbar">
      <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
        <Typography
          fontWeight={700}
          sx={{ fontSize: { lg: "30px", xs: "30px" } }}
          mb="30px"
          textAlign="center"
        >
          BMI Calculator
        </Typography>
        <div>
          <Typography mb="10px">Gender:</Typography>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <Typography mt="20px" mb="10px">
            Weight(kg):
          </Typography>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <Typography mt="20px" mb="10px">
            Height(cm):
          </Typography>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <Typography mt="20px" mb="10px">
          <button onClick={calculateBmi}>BMI Calculate</button>
          <Typography mt="20px" mb="50px">
            {" "}
            {bmi && (
              <p>
                BMI: {bmi} (Range: {bmiRange})
              </p>
            )}
          </Typography>
        </Typography>
        <img src={bmiPicture} style={{ width: 500, height: 300 }} />
      </Stack>
    </div>
  );
};

export default BMIRightbar;
