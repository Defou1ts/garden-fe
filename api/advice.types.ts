export type Advice = {
  id: string;
  title: string;
  photoUrl: string;
  description: string;
};

export type CreateAdviceRequest = {
  title: string;
  description: string;
  photo: {
    uri: string;
    name: string;
    type: string;
  };
};

export type UpdateAdviceRequest = Partial<CreateAdviceRequest>;
