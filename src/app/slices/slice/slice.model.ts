export class Slice {
  public id: number;
  public label: string;
  public color: string;
  public size: number;

  constructor(id: number, label: string, color: string, size: number) {
    this.id = id;
    this.label = label;
    this.color = color;
    this.size = size;
  }
}
