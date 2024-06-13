"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ModuleEnseignement, UniteEnseignement } from "@/constants/types";
import {
  moduleCoefs,
  moduleNames,
  moduleToUeIndex,
  OptionsArray,
  ueCoefs,
  ueNames,
} from "@/constants/constants";

const Page = () => {
  const [modulesData, setModulesData] = useState<UniteEnseignement[]>(
    ueNames.map((ueName, index) => {
      const modules: ModuleEnseignement[] = moduleToUeIndex.reduce(
        (acc: ModuleEnseignement[], ueIndex: number, moduleIndex: number) => {
          if (ueIndex === index) {
            const moduleName = moduleNames[moduleIndex];
            const coef = moduleCoefs[moduleIndex];
            const moyModule = 0;
            acc.push({ moduleName, coef, moyModule } as ModuleEnseignement);
          }
          return acc;
        },
        [] as ModuleEnseignement[]
      );
      const uniteEnseignement = ueName;
      const nbECTS = ueCoefs[index];
      const moyenneUE = 0;
      return {
        uniteEnseignement,
        nbECTS,
        moyenneUE,
        modules,
      };
    })
  );

  const [optionsValues, setOptionsValues] = useState<Array<number>>(
    new Array(OptionsArray.length).fill(0)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const calculateModuleScore = (
    uniteEnseignement: string,
    moduleName: string
  ) => {
    const ue = modulesData.find(
      (ue: UniteEnseignement) => ue.uniteEnseignement === uniteEnseignement
    );

    const moduleEnseignement = ue?.modules.find(
      (module: ModuleEnseignement) => module.moduleName === moduleName
    );

    if (moduleEnseignement) {
      const score = moduleEnseignement.moyModule * moduleEnseignement.coef;
      const ueCoef = ue?.nbECTS || 1;
      return score / ueCoef;
    }

    return 0;
  };

  const calculateMoyenneGenerale = () => {
    let totalScore = 0;
    let totalCoef = 0;

    modulesData.forEach((ue: UniteEnseignement) => {
      totalScore += ue.moyenneUE * ue.nbECTS;
      totalCoef += ue.nbECTS;
    });

    return totalCoef ? totalScore / totalCoef : 0;
  };

  const getMoyenneUE = (ueName: string) => {
    const ue = modulesData.find(
      (ue: UniteEnseignement) => ue.uniteEnseignement === ueName
    );

    return ue ? ue.moyenneUE : 0;
  };

  const getMoyModule = (moduleName: string) => {
    let moyModule = 0;

    modulesData.forEach((ue: UniteEnseignement) => {
      ue.modules.forEach((module: ModuleEnseignement) => {
        if (module.moduleName === moduleName) {
          moyModule = module.moyModule;
        }
      });
    });

    return moyModule;
  };

  const calculateOptions = () => {
    modulesData.forEach((ue: UniteEnseignement) => {
      let totalScore = 0;
      let totalCoef = 0;

      ue.modules.forEach((module: ModuleEnseignement) => {
        const score = calculateModuleScore(
          ue.uniteEnseignement,
          module.moduleName
        );
        module.moyModule = score;
        totalScore += score * module.coef;
        totalCoef += module.coef;
      });

      ue.moyenneUE = totalCoef ? totalScore / totalCoef : 0;
    });

    const moyenneGenerale = calculateMoyenneGenerale();

    const troncCommunMoy =
      0.4 * moyenneGenerale +
      0.1 * getMoyenneUE("Communication, Culture et Citoyenneté A3") +
      0.1 * getMoyenneUE("Management de l'entreprise");

    const simOption =
      troncCommunMoy +
      0.15 * getMoyenneUE("Projet Intégré : Développement Web Java") +
      0.1 * getMoyModule("Conception par Objet et Programmation Java") +
      0.15 * getMoyModule("Programmation des terminaux mobiles");

    const arcticOption =
      troncCommunMoy +
      0.2 * getMoyenneUE("Administration des SE") +
      0.2 * getMoyenneUE("Réseau IP et routage");

    const gamixOption =
      troncCommunMoy +
      0.1 *
        ((getMoyModule("Techniques d'estimation pour l'ingénieur") +
          getMoyModule("Analyse Numérique") +
          getMoyModule("Calcul scientifique")) /
          3) +
      0.1 * getMoyModule("Conception par Objet et Programmation Java") +
      0.1 * getMoyenneUE("Projet Intégré : Développement Web Java") +
      0.1 * getMoyModule("Programmation des terminaux mobiles");

    const dsOption =
      troncCommunMoy +
      0.1 * getMoyModule("Sys. De Gestion de Bases de Données") +
      0.1 * getMoyenneUE("Projet Intégré : Développement Web Java") +
      0.2 *
        ((getMoyModule("Techniques d'estimation pour l'ingénieur") +
          getMoyModule("Analyse Numérique") +
          getMoyModule("Calcul scientifique")) /
          3);

    const erpBiOption =
      troncCommunMoy +
      0.2 * getMoyModule("Sys. De Gestion de Bases de Données") +
      0.05 * getMoyenneUE("Projet Intégré : Développement Web Java") +
      (0.15 *
        (getMoyModule("Calcul scientifique") +
          getMoyModule("Techniques d'estimation pour l'ingénieur"))) /
        2;

    const infiniOption =
      troncCommunMoy +
      0.1 * getMoyModule("Sys. De Gestion de Bases de Données") +
      0.1 * getMoyenneUE("Projet Intégré : Développement Web Java") +
      0.1 * getMoyenneUE("Méthodes numériques pour l'ingénieur") +
      0.1 * getMoyenneUE("Techniques d'estimation pour l'ingénieur");

    const nidsOption =
      troncCommunMoy +
      0.2 * getMoyenneUE("Administration des SE") +
      0.2 * getMoyenneUE("Réseau IP et routage");

    const twinOption =
      troncCommunMoy +
      0.15 * getMoyenneUE("Projet Intégré : Développement Web Java") +
      0.15 * getMoyModule("Technologies Web 2.0") +
      0.1 * getMoyModule("Langage de modélisation (UML)");

    const saeOption =
      troncCommunMoy +
      0.1 * getMoyModule("Langage de modélisation (UML)") +
      0.1 * getMoyenneUE("Génie logiciel & atelier GL") +
      0.1 * getMoyModule("Technologies Web 2.0") +
      0.1 * getMoyenneUE("Projet Intégré : Développement Web Java");

    const sleamOption =
      troncCommunMoy +
      0.1 * getMoyenneUE("Administration des SE") +
      0.1 * getMoyenneUE("Modélisation et Programmation Objet") +
      0.1 * getMoyenneUE("Developpement web & mobile") +
      0.1 * getMoyenneUE("Méthodes numériques pour l'ingénieur");

    const newOptionsValues = optionsValues.map((value, index) => {
      switch (OptionsArray[index]) {
        case "SIM":
          return simOption;
        case "ARCTIC":
          return arcticOption;
        case "GAMIX":
          return gamixOption;
        case "DS":
          return dsOption;
        case "ERP_BI":
          return erpBiOption;
        case "INFINI":
          return infiniOption;
        case "NIDS":
          return nidsOption;
        case "TWIN":
          return twinOption;
        case "SAE":
          return saeOption;
        case "SLEAM":
          return sleamOption;
        default:
          return value;
      }
    });
    setOptionsValues(newOptionsValues);
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

        <form className="my-8" onSubmit={handleSubmit}>
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
                    value={module.moyModule || 0}
                    onChange={(e) => {
                      const newModulesData = modulesData.map((ueData, i) => {
                        if (i === ueIndex) {
                          const newModules = ueData.modules.map(
                            (moduleData, j) => {
                              if (j === moduleIndex) {
                                return {
                                  ...moduleData,
                                  moyModule: parseFloat(e.target.value),
                                };
                              }
                              return moduleData;
                            }
                          );
                          return {
                            ...ueData,
                            modules: newModules,
                          };
                        }
                        return ueData;
                      });
                      setModulesData(newModulesData);
                      calculateOptions();
                    }}
                  />
                </LabelInputContainer>
              ))
            )}
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            onClick={calculateOptions}
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
                  value={optionsValues[index]}
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

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Page;
