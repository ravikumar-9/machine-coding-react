import type React from "react";
import type { ComponentType, Dispatch, SetStateAction, SVGProps } from "react";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

export interface MultiselectProps {
  searchTerm: string;
  suggestions: User[];
  selectedUsers: User[];
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
}

export interface progressbarProps {
  percentage: number;
}

export interface product {
  id: number;
  name: string;
  price: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  inCart: boolean;
  quantity: number;
}

//tracker types
export interface income {
  date: string;
  income: string;
}

export interface expense {
  id: number;
  date: string;
  category: string;
  notes?: string;
  amount: string;
}

export interface storeType {
  products: product[];
  addToCart: (item: product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  income: income[];
  expenses: expense[];
  addIncome: (item: income) => void;
  addExpenses: (item: expense) => void;
}

//ui props
export interface cardProps {
  className?: string;
  children: React.ReactNode;
}

export interface buttonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "outline";
}

export interface inputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string | undefined;
  ref?: (el: any) => void;
}

export interface textareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  message?: string | undefined;
}

//fileupload types
export interface fileUploadProps {
  isUploaded: boolean;
  progress: number;
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface fileProps {
  file: fileUploadProps;
  handleRemoveFile: (id: string) => void;
  isUploading: boolean;
}

//product types

export interface productType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

//explorer props

export interface ExplorerProps {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerProps[];
}

export interface showInputProps {
  isVisible: boolean;
  isFolder: null | boolean;
}

//forget password props
export interface EmailVerificationProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

export interface OtpFormProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}
