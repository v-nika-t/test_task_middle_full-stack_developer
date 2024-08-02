import { IAssignment, IResult } from "./interfaces";

export class Statistic {
  private sizeCount: Record<number, number> = {};
  private assignments: IAssignment[] = [];
  private mismatches: number = 0;

  public addAssignment(assignment: IAssignment): void {
    this.assignments.push(assignment);
    const size = assignment.size;
    this.sizeCount[size] = (this.sizeCount[size] || 0) + 1;
  }

  public increaseMismatches(): void {
    this.mismatches++;
  }

  public getResult(): IResult {
    const stats = Object.entries(this.sizeCount)
      .map(([size, quantity]) => ({
        size: parseInt(size, 10),
        quantity,
      }))
      .sort((a, b) => a.size - b.size);

    return {
      stats,
      assignment: this.assignments,
      mismatches: this.mismatches,
    };
  }

  public copy(): Statistic {
    const copy = new Statistic();
    copy.sizeCount = { ...this.sizeCount };
    copy.assignments = [...this.assignments];
    copy.mismatches = this.mismatches;
    return copy;
  }
}
