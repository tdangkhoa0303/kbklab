export class Entity {
  id: string;

  constructor() {
    this.id = '';
  }

  equal(other: Entity | string) {
    return typeof other === 'string' ? this.id === other : this === other
  }

  toString() {
    return this.id;
  }
}
