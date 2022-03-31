export interface Step {
  _id: string;
  description: string;
  point: number;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  steps: Step[];
  guide: string;
  disabled: boolean;
}
