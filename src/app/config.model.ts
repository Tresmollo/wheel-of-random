import { Slice } from './slices/slice/slice.model';

export class Config {
    public slices: Slice[];
    public spinMulti: number;
    public backgroundColor: string;
    public sliceLock: boolean;


    constructor(slices: Slice[], spinMulti: number, backgroundColor: string, sliceLock: boolean) {
      this.slices = slices;
      this.spinMulti = spinMulti;
      this.backgroundColor = backgroundColor;
      this.sliceLock = sliceLock;
    }
  }
