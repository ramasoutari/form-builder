import { IUser } from "@/app/lib/types/user";

export type SignInOptions = {
  email: string;
  password: string;
};

export type signInResponse ={
  token :string;
  user:IUser;
}
