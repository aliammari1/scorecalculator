import ModuleEnseignement from "./ModuleEnseignement";

class UniteEnseignement {
    private _uniteEnseignement: string;
    private _nbECTS: number;
    private _moyenneUE: number;
    private _modules: ModuleEnseignement[];

    constructor(uniteEnseignement: string, nbECTS: number, moyenneUE: number, modules: ModuleEnseignement[]) {
        this._uniteEnseignement = uniteEnseignement;
        this._nbECTS = nbECTS;
        this._moyenneUE = moyenneUE;
        this._modules = modules;
    }

    get uniteEnseignement(): string {
        return this._uniteEnseignement;
    }

    set uniteEnseignement(value: string) {
        this._uniteEnseignement = value;
    }

    get nbECTS(): number {
        return this._nbECTS;
    }

    set nbECTS(value: number) {
        this._nbECTS = value;
    }

    get moyenneUE(): number {
        return this._moyenneUE;
    }

    set moyenneUE(value: number) {
        this._moyenneUE = value;
    }

    get modules(): ModuleEnseignement[] {
        return this._modules;
    }

    set modules(value: ModuleEnseignement[]) {
        this._modules = value;
    }
}

export default UniteEnseignement;