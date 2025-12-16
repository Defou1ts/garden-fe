export type Advice = {
  id: string;
  title: string;
  photoUrl: string;
  description: string;
};

export type CreateAdviceRequest = {
  title: string;
  photoUrl: string;
  description: string;
};

export type UpdateAdviceRequest = Partial<CreateAdviceRequest>;
