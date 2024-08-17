export interface User {
    
    Id?: number;
    Name: string;
    UserName?: string;
    Email: string;
    Password?: string;
    Phone: string;
}

export interface UserLoginDto {
    UserName: string;
    Password: string;
  }
  
  export interface UserRegisterDto {
    UserName: string;
    Password: string;
    Name: string;
    Email: string;
    Phone: string;
  }
  
  export interface UserLoginResponseDto {
    User: User | null;
    Token: string;
  }