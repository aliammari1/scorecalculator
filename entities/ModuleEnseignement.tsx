class ModuleEnseignement {
    private _moduleName: string;
    private _coef: number;
    private _moyModule: number;

    constructor(moduleName: string, coef: number, moyModule: number) {
        this._moduleName = moduleName;
        this._coef = coef;
        this._moyModule = moyModule;
    }

    get moduleName(): string {
        return this._moduleName;
    }

    set moduleName(value: string) {
        this._moduleName = value;
    }

    get coef(): number {
        return this._coef;
    }

    set coef(value: number) {
        this._coef = value;
    }

    get moyModule(): number {
        return this._moyModule;
    }

    set moyModule(value: number) {
        this._moyModule = value;
    }
}

export default ModuleEnseignement;