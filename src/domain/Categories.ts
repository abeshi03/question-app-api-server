export interface CreateCategoryPayload {
  id: number;
  name: string;
}

export class Category {
  private readonly _id: number;
  private readonly _name: string;

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public constructor(payload: CreateCategoryPayload) {
    this._id = payload.id;
    this._name = payload.name;
  }
}
