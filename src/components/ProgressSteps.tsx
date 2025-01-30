import React from "react";
import clsx from "clsx";

interface Step {
  label: string;
  icon: JSX.Element;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={clsx("flex items-center gap-2 text-gray-400", index <= currentStep && "text-primary")}>
            {React.cloneElement(step.icon, { size: 25 })}
            <span>{step.label}</span>
          </div>

          {index < steps.length - 1 && <div className={clsx("mx-2 h-0.5 w-12 border-t-2 border-dashed border-gray-300 dark:border-gray-600", index < currentStep && "border-primary")}></div>}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
