export interface UpdateClassLabPayload {
  classLabId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateClassLabPayload {
  classId: string,
  labId: string,
  startDate: string,
  endDate: string,
}

