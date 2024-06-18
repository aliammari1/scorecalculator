"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  moduleCoefs,
  moduleNames,
  moduleToUeIndex,
  OptionsArray,
  ueCoefs,
  ueNames,
} from "@/constants/constants";
import ModuleEnseignement from "@/entities/ModuleEnseignement";
import UniteEnseignement from "@/entities/UniteEnseignement";
import Option from "@/entities/Option";
import BottomGradient from "@/components/ui/BottomGradient";
import LabelInputContainer from "@/components/ui/LabelInputContainer";

const Page = () => {
  const [modulesData, setModulesData] = useState<UniteEnseignement[]>(() => {
    const initialModulesData = ueNames.map(
      (ueName, index) =>
        new UniteEnseignement(
          ueName,
          ueCoefs[index],
          0,
          moduleToUeIndex.reduce((accumulator, ueIndex, neededIndex) => {
            if (ueIndex === index) {
              accumulator.push(
                new ModuleEnseignement(
                  moduleNames[neededIndex],
                  moduleCoefs[neededIndex],
                  0
                )
              );
            }
            return accumulator;
          }, [] as ModuleEnseignement[])
        )
    );

    return initialModulesData;
  });

  const [optionsValues, setOptionsValues] = useState<Option[]>(() =>
    OptionsArray.map((value) => new Option(value))
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateOptions();
    console.log("Form submitted");
  };

  const calculateModuleScore = (
    uniteEnseignement: string,
    moduleName: string,
    moyModule: number
  ) => {
    const ue = modulesData.find(
      (ue: UniteEnseignement) => ue.uniteEnseignement === uniteEnseignement
    );

    const moduleEnseignement = ue?.modules.find(
      (module: ModuleEnseignement) => module.moduleName === moduleName
    );

    if (moduleEnseignement) {
      const score = moyModule * moduleEnseignement.coef;
      const ueCoef = ue?.nbECTS || 1;
      return score / ueCoef;
    }

    return 0;
  };

  const calculateMoyenneGenerale = () => {
    let totalScore = 0;
    let totalCoef = 0;
    modulesData.map((ue: UniteEnseignement) => {
      totalScore += ue.moyenneUE * ue.nbECTS;
      totalCoef += ue.nbECTS;
    });

    return totalCoef ? totalScore / totalCoef : 0;
  };

  const calculateOptions = () => {
    modulesData.forEach((ue: UniteEnseignement) => {
      let totalScore = 0;
      let totalCoef = 0;

      ue.modules.forEach((module: ModuleEnseignement) => {
        const score = calculateModuleScore(
          ue.uniteEnseignement,
          module.moduleName,
          module.moyModule
        );
        // module.moyModule = score;
        totalScore += score * module.coef;
        totalCoef += module.coef;
      });

      ue.moyenneUE = totalCoef ? totalScore / totalCoef : 0;
    });
    const moyenneGenerale = calculateMoyenneGenerale();
    setOptionsValues(
      optionsValues.map((option) =>
        new Option(option.name).calculateScore(moyenneGenerale, modulesData)
      )
    );
  };

  return (
    <>
      <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to 3A Score Calculator
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to aceternity if you can because we don&apos;t have a login flow
          yet
        </p>

        <form className="my-8" method="post" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-4 mb-4">
            {modulesData.map((ue, ueIndex) =>
              ue.modules.map((module, moduleIndex) => (
                <LabelInputContainer key={`${ueIndex}-${moduleIndex}`}>
                  <Label htmlFor={`input${ueIndex}-${moduleIndex}`}>
                    {module.moduleName}
                  </Label>
                  <Input
                    id={`input${ueIndex}-${moduleIndex}`}
                    name={`input${ueIndex}-${moduleIndex}`}
                    className="subject"
                    placeholder={`${module.moduleName} Note`}
                    type="number"
                    value={module.moyModule}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      const updatedModulesData = [...modulesData];
                      updatedModulesData[ueIndex].modules[
                        moduleIndex
                      ].moyModule = value;
                      setModulesData(updatedModulesData);
                    }}
                  />
                </LabelInputContainer>
              ))
            )}
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Calculate &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="grid grid-cols-6 gap-4 mb-4">
            {OptionsArray.map((value, index) => (
              <LabelInputContainer key={index}>
                <Label htmlFor={`input${index + 1}`}>{value}</Label>
                <Input
                  id={`input${index + 1}`}
                  placeholder={`${value} Note`}
                  type="number"
                  value={optionsValues[index].score}
                  disabled
                />
              </LabelInputContainer>
            ))}
          </div>
        </form>
      </div>
      <BackgroundBeams className="z-[-1]" />
    </>
  );
};

export default Page;
