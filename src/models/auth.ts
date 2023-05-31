export interface ILoginParams {
  username: string;
  password: string;
  company_id: number | null;
}

export interface ILoginValidation {
  username: string;
  password: string;
}
