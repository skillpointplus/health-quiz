import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
    id: string;
    product_name: string;
    slug: string;
    gender_target: 'male' | 'female' | 'unisex';
    category: string;
    description: string;
    benefits: string;
    ingredients: string;
    trustpilot_rating: number;
    trustpilot_reviews: number;
    affiliate_link: string;
    product_image: string;
    created_at: string;
};

export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string;
};
