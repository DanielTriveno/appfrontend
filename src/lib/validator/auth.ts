import { z } from "zod";

export const LoginSchema = z.object({
  userName: z.string().nonempty("El nombre de usuario es obligatorio"),
  password: z.string().nonempty("La contraseña es obligatoria"),
});

export const checkEmailSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

export const PasswordChangeSchema = z.object({
  password: z.string().min(1, { message: "Mínimo 6 caracteres" }),
  passwordConfirm: z.string().min(6, { message: "Mínimo 6 caracteres" })
  .regex(/^\S+$/, { message: "El nombre de usuario no puede contener espacios en blanco" })
  .regex(/[A-Z]/, "La nueva contraseña debe contener al menos una letra mayuscula")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "La nueva contraseña debe contener al menos un caracter especial")
});
