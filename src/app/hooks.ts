// API utility functions for fetching dynamic content from CMS

import { useState, useEffect } from 'react';

const API_BASE_URL = '/api/data';

// TypeScript Interfaces
export interface HeroData {
  id: string;
  tagline: string;
  heading: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Heading {
  id: string;
  section: string;
  tagline?: string;
  heading: string;
  subheading?: string;
  created_at: string;
  updated_at: string;
}

export interface AboutData {
  id: string;
  heading: string;
  description1: string;
  description2: string;
  short_description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  heading: string;
  description: string;
  card_heading: string[];
  cards_description: string[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  tagline: string;
  heading: string;
  subheading: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Generic fetch function with error handling
async function fetchFromApi<T>(endpoint: string): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    
    if (!response.ok) {
      return { data: null, error: `API Error: ${response.status} ${response.statusText}` };
    }
    
    const result: ApiResponse<T> = await response.json();
    
    if (!result.success) {
      return { data: null, error: result.error || 'Failed to fetch data' };
    }
    
    return { data: result.data, error: null };
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Failed to fetch data' 
    };
  }
}

// Hero Section Data
export async function getHeroData(): Promise<{ data: HeroData | null; error: string | null }> {
  const { data, error } = await fetchFromApi<HeroData[]>('herosec');
  
  if (error || !data || data.length === 0) {
    return { data: null, error: error || 'No hero data found' };
  }
  
  return { data: data[0], error: null };
}

// Get All Headings
export async function getAllHeadings(): Promise<{ data: Heading[] | null; error: string | null }> {
  return fetchFromApi<Heading[]>('all_headings');
}

// Get Heading by Section
export async function getHeadingBySection(section: string): Promise<{ data: Heading | null; error: string | null }> {
  const { data, error } = await getAllHeadings();
  
  if (error || !data) {
    return { data: null, error: error || 'No headings found' };
  }
  
  const heading = data.find(h => h.section.toLowerCase() === section.toLowerCase());
  return { data: heading || null, error: !heading ? `No heading found for section: ${section}` : null };
}

// About Us Data
export async function getAboutUsData(): Promise<{ data: AboutData | null; error: string | null }> {
  const { data, error } = await fetchFromApi<AboutData[]>('about_us');
  
  if (error || !data || data.length === 0) {
    return { data: null, error: error || 'No about data found' };
  }
  
  return { data: data[0], error: null };
}

// Services Data
export async function getServicesData(): Promise<{ data: Service | null; error: string | null }> {
  const { data, error } = await fetchFromApi<Service[]>('service');
  
  if (error || !data || data.length === 0) {
    return { data: null, error: error || 'No services data found' };
  }
  
  return { data: data[0], error: null };
}

// Categories Data
export async function getCategoriesData(): Promise<{ data: Category[] | null; error: string | null }> {
  return fetchFromApi<Category[]>('category');
}

// Custom Hooks for use in Client Components
export function useHeroData() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHeroData().then(({ data, error }) => {
      setData(data);
      setError(error);
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}

export function useAboutUsData() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAboutUsData().then(({ data, error }) => {
      setData(data);
      setError(error);
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}

export function useHeadingBySection(section: string) {
  const [data, setData] = useState<Heading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHeadingBySection(section).then(({ data, error }) => {
      setData(data);
      setError(error);
      setLoading(false);
    });
  }, [section]);

  return { data, loading, error };
}

export function useServicesData() {
  const [data, setData] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getServicesData().then(({ data, error }) => {
      setData(data);
      setError(error);
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}

export function useCategoriesData() {
  const [data, setData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategoriesData().then(({ data, error }) => {
      setData(data);
      setError(error);
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}
