import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDaysPassed(date: Date) {
  const now = new Date();
  const diffInTime = now.getTime() - date.getTime();
  return "hace " + Math.floor(diffInTime / (1000 * 3600 * 24));
}

export function formatDate(dateString: string): string {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const date = new Date(dateString);
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${monthName} ${year}`;
}

export function getInitials(name: string, lastname: string) {
  const nameParts = name.split(" ");
  let initials = "";
  
  if (nameParts.length === 1) {
    initials += nameParts[0][0].toUpperCase();
    initials += lastname[0].toUpperCase();
  } else {
    for (let i = 0; i < nameParts.length; i++) {
      if (nameParts[i].length > 0 && nameParts[i] !== "") {
        initials += nameParts[i][0].toUpperCase();
      }
    }
  }
  
  return initials.slice(0, 2);
}


export function handleNumericInput(e: { currentTarget: { value: string } }) {
  e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, "");
}


// funciones para contralar el almacenamiento local
export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// funciones para contralar el almacenamiento de sesion
export const setSessionStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

export const getSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
};

export const removeSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

// funciones para contralar el almacenamiento de cookies
export const setCookie = (key: string, value: string, days: number) => {
  if (typeof window !== "undefined") {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${key}=${value};${expires};path=/`;
  }
};

export const getCookie = (key: string) => {
  if (typeof window !== "undefined") {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${key}=; Max-Age=-99999999;`;
  }
};
