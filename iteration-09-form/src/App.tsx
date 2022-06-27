import { PurchaseSum } from "./components/PurchaseSum";
import { PersonalInformation } from "./components/PersonalInformation";
import { useState } from "react";
import { Summary } from "./components/Summary";
import { ByeCard } from "./components/ByeCard";

export const App = () => {
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState({});

  return <div className="App">
    {step === 0 && <PurchaseSum nextAction={setStep}/>}
    {step === 1 && <PersonalInformation nextAction={setStep} setData={setData} />}
    {step === 2 && <Summary nextAction={setStep} data={data} />}
    {step === 3 && <ByeCard nextAction={setStep}/>}
  </div>;
};
