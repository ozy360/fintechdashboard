"use client";
import { useState, useEffect } from "react";

// Define the User interface
interface User {
  _id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  state?: string;
  city?: string;
  zip?: string;
  email: string;
  country?: string;
  address?: string;
  mobile?: number;
  password: string;
  kyc?: "verified" | "pending" | "not_verified";
  transactions?: Array<{
    name?: string;
    date?: string;
    currency?: "NGN" | "USD" | "GBP" | "EUR";
    amount?: number;
    deposit?: boolean;
    withdraw?: boolean;
    approved?: boolean;
    pending?: boolean;
    rejected?: boolean;
    tid?: string;
  }>;
  proof?: {
    idtype?: string;
    imagelink?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Type the hook return value
interface UseDataReturn {
  data: User | null;
  error: boolean;
  dataLoading: boolean;
}

export default function useData(): UseDataReturn {
  const [data, setData] = useState<User | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await fetch(`/api`, {
        method: "GET",
      });
      if (res.ok) {
        const cdata: User = await res.json();
        setData(cdata);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setDataLoading(false);
    }
  }

  return {
    error,
    data,
    dataLoading,
  };
}
