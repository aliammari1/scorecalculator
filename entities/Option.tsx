import { moduleNames, ueNames } from "@/constants/constants";
import UniteEnseignement from "./UniteEnseignement";
import { cp } from "fs";

class Option {
  private _name: string;
  private _score: number;

  constructor(name: string, score: number = 0) {
    this._name = name;
    this._score = score;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  calculateScore(moyenneGenerale: number, modulesData: UniteEnseignement[]) {
    const troncCommunMoy = this.calculateTroncCommunMoy(
      moyenneGenerale,
      modulesData
    );
    switch (this._name) {
      case "SIM":
        this._score = this.calculateSimOption(troncCommunMoy, modulesData);
        break;
      case "ARCTIC":
        this._score = this.calculateArcticOption(troncCommunMoy, modulesData);
        break;
      case "GAMIX":
        this._score = this.calculateGamixOption(troncCommunMoy, modulesData);
        break;
      case "DS":
        this._score = this.calculateDsOption(troncCommunMoy, modulesData);
        break;
      case "ERP_BI":
        this._score = this.calculateErpBiOption(troncCommunMoy, modulesData);
        break;
      case "INFINI":
        this._score = this.calculateInfiniOption(troncCommunMoy, modulesData);
        break;
      case "NIDS":
        this._score = this.calculateNidsOption(troncCommunMoy, modulesData);
        break;
      case "TWIN":
        this._score = this.calculateTwinOption(troncCommunMoy, modulesData);
        break;
      case "SAE":
        this._score = this.calculateSaeOption(troncCommunMoy, modulesData);
        break;
      case "SLEAM":
        this._score = this.calculateSleamOption(troncCommunMoy, modulesData);
        break;
    }
    return this;
  }

  calculateTroncCommunMoy(
    moyenneGenerale: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      0.4 * moyenneGenerale +
      0.1 *
        modulesData[ueNames.indexOf("Communication, Culture et Citoyenneté A3")]
          .moyenneUE +
      0.1 * modulesData[ueNames.indexOf("Management de l'entreprise")].moyenneUE
    );
  }

  calculateSimOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.15 *
        modulesData[ueNames.indexOf("Projet Intégré : Développement Web Java")]
          .moyenneUE +
      0.1 *
        modulesData[ueNames.indexOf("Modélisation et Programmation Objet")]
          .modules[
          modulesData[
            ueNames.indexOf("Modélisation et Programmation Objet")
          ].modules.findIndex(
            (module) =>
              module.moduleName === "Conception par Objet et Programmation Java"
          )
        ].moyModule +
      0.15 *
        modulesData[ueNames.indexOf("Developpement web & mobile")].modules[
          modulesData[
            ueNames.indexOf("Developpement web & mobile")
          ].modules.findIndex(
            (module) =>
              module.moduleName === "Programmation des terminaux mobiles"
          )
        ].moyModule
    );
  }

  calculateArcticOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.2 * modulesData[ueNames.indexOf("Administration des SE")].moyenneUE +
      0.2 * modulesData[ueNames.indexOf("Réseau IP et routage")].moyenneUE
    );
  }

  calculateGamixOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.1 *
        ((modulesData[
          ueNames.indexOf("Techniques d'estimation pour l'ingénieur")
        ].moyenneUE +
          modulesData[ueNames.indexOf("Méthodes numériques pour l'ingénieur")]
            .modules[
            modulesData[
              ueNames.indexOf("Méthodes numériques pour l'ingénieur")
            ].modules.findIndex(
              (module) => module.moduleName === "Analyse Numérique"
            )
          ].moyModule +
          modulesData[ueNames.indexOf("Méthodes numériques pour l'ingénieur")]
            .modules[
            modulesData[
              ueNames.indexOf("Méthodes numériques pour l'ingénieur")
            ].modules.findIndex(
              (module) => module.moduleName === "Calcul scientifique"
            )
          ].moyModule) /
          3) +
      0.1 *
        modulesData[ueNames.indexOf("Modélisation et Programmation Objet")]
          .modules[
          modulesData[
            ueNames.indexOf("Modélisation et Programmation Objet")
          ].modules.findIndex(
            (module) =>
              module.moduleName === "Conception par Objet et Programmation Java"
          )
        ].moyModule +
      0.1 *
        modulesData[ueNames.indexOf("Projet Intégré : Développement Web Java")]
          .moyenneUE +
      0.1 *
        modulesData[ueNames.indexOf("Developpement web & mobile")].modules[
          modulesData[
            ueNames.indexOf("Developpement web & mobile")
          ].modules.findIndex(
            (module) =>
              module.moduleName === "Programmation des terminaux mobiles"
          )
        ].moyModule
    );
  }

  calculateDsOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.1 *
        modulesData[ueNames.indexOf("Developpement web & mobile")].modules[
          modulesData[
            ueNames.indexOf("Developpement web & mobile")
          ].modules.findIndex(
            (module) =>
              module.moduleName === "Sys. De Gestion de Bases de Données"
          )
        ].moyModule +
      0.1 *
        modulesData[ueNames.indexOf("Projet Intégré : Développement Web Java")]
          .moyenneUE +
      0.2 *
        ((modulesData[
          ueNames.indexOf("Techniques d'estimation pour l'ingénieur")
        ].moyenneUE +
          modulesData[ueNames.indexOf("Méthodes numériques pour l'ingénieur")]
            .modules[
            modulesData[
              ueNames.indexOf("Méthodes numériques pour l'ingénieur")
            ].modules.findIndex(
              (module) => module.moduleName === "Analyse Numérique"
            )
          ].moyModule +
          modulesData[ueNames.indexOf("Méthodes numériques pour l'ingénieur")]
            .modules[
            modulesData[
              ueNames.indexOf("Méthodes numériques pour l'ingénieur")
            ].modules.findIndex(
              (module) => module.moduleName === "Calcul scientifique"
            )
          ].moyModule) /
          3)
    );
  }

  calculateErpBiOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.2 *
        modulesData[ueNames.indexOf("Developpement web & mobile")].modules[
          modulesData[
            ueNames.indexOf("Developpement web & mobile")
          ].modules.findIndex(
            (module) =>
              module.moduleName === "Sys. De Gestion de Bases de Données"
          )
        ].moyModule +
      0.05 *
        modulesData[ueNames.indexOf("Projet Intégré : Développement Web Java")]
          .moyenneUE +
      (0.15 *
        (modulesData[ueNames.indexOf("Méthodes numériques pour l'ingénieur")]
          .modules[
          modulesData[
            ueNames.indexOf("Méthodes numériques pour l'ingénieur")
          ].modules.findIndex(
            (module) => module.moduleName === "Calcul scientifique"
          )
        ].moyModule +
          modulesData[
            ueNames.indexOf("Techniques d'estimation pour l'ingénieur")
          ].moyenneUE)) /
        2
    );
  }

  calculateInfiniOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.1 *
        modulesData[ueNames.indexOf("Developpement web & mobile")].modules[
          modulesData[
            ueNames.indexOf("Developpement web & mobile")
          ].modules.findIndex(
            (module) =>
              module.moduleName === "Sys. De Gestion de Bases de Données"
          )
        ].moyModule +
      0.1 *
        modulesData[ueNames.indexOf("Projet Intégré : Développement Web Java")]
          .moyenneUE +
      0.1 *
        modulesData[ueNames.indexOf("Méthodes numériques pour l'ingénieur")]
          .moyenneUE +
      0.1 *
        modulesData[ueNames.indexOf("Techniques d'estimation pour l'ingénieur")]
          .moyenneUE
    );
  }

  calculateNidsOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.2 * modulesData[ueNames.indexOf("Administration des SE")].moyenneUE +
      0.2 * modulesData[ueNames.indexOf("Réseau IP et routage")].moyenneUE
    );
  }

  calculateTwinOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.15 *
        modulesData[ueNames.indexOf("Projet Intégré : Développement Web Java")]
          .moyenneUE +
      0.15 *
        modulesData[ueNames.indexOf("Developpement web & mobile")].modules[
          modulesData[
            ueNames.indexOf("Developpement web & mobile")
          ].modules.findIndex(
            (module) => module.moduleName === "Technologies Web 2.0"
          )
        ].moyModule +
      0.1 *
        modulesData[ueNames.indexOf("Modélisation et Programmation Objet")]
          .modules[
          modulesData[
            ueNames.indexOf("Modélisation et Programmation Objet")
          ].modules.findIndex(
            (module) => module.moduleName === "Langage de modélisation (UML)"
          )
        ].moyModule
    );
  }

  calculateSaeOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.1 *
        modulesData[ueNames.indexOf("Modélisation et Programmation Objet")]
          .modules[
          modulesData[
            ueNames.indexOf("Modélisation et Programmation Objet")
          ].modules.findIndex(
            (module) => module.moduleName === "Langage de modélisation (UML)"
          )
        ].moyModule +
      0.1 *
        modulesData[ueNames.indexOf("Génie logiciel & atelier GL")].moyenneUE +
      0.1 *
        modulesData[ueNames.indexOf("Developpement web & mobile")].modules[
          modulesData[
            ueNames.indexOf("Developpement web & mobile")
          ].modules.findIndex(
            (module) => module.moduleName === "Technologies Web 2.0"
          )
        ].moyModule +
      0.1 *
        modulesData[ueNames.indexOf("Projet Intégré : Développement Web Java")]
          .moyenneUE
    );
  }

  calculateSleamOption(
    troncCommunMoy: number,
    modulesData: UniteEnseignement[]
  ): number {
    return (
      troncCommunMoy +
      0.1 * modulesData[ueNames.indexOf("Administration des SE")].moyenneUE +
      0.1 *
        modulesData[ueNames.indexOf("Modélisation et Programmation Objet")]
          .moyenneUE +
      0.1 *
        modulesData[ueNames.indexOf("Developpement web & mobile")].moyenneUE +
      0.1 *
        modulesData[ueNames.indexOf("Méthodes numériques pour l'ingénieur")]
          .moyenneUE
    );
  }
}

export default Option;
