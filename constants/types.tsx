export type ModuleEnseignement = {
  moduleName: string;
  coef: number;
  moyModule: number;
};

export type UniteEnseignement = {
  uniteEnseignement: string;
  nbECTS: number;
  moyenneUE: number;
  modules: ModuleEnseignement[];
};
