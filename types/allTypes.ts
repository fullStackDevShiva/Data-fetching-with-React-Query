export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
  }
export interface UserData{
  users: User[];
  skip: number | null;
  total: number | null;
  limit: number | null;
}


