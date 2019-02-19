/*
 * Put this into your class that is implementing deserialize:
 * This replaces the need to manually assign each variable to each individual someInputInterfaceArgs property.
 *
 export class Notification implements Deserializable { ...

  someVar: bool;
  someVar2: string;
  ...

  constructor(someInputInterfaceArgs: any) {
    this.deserialize(someInputInterface);
  }

   public deserialize(input: any) {
     Object.assign(this, input);
     return this;
   }
  }
 */


export interface Deserializable {
  deserialize(input: any): this;
}
