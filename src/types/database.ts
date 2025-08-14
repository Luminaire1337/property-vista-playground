export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          location: string;
          price: number;
          price_per_m2: number;
          area: number;
          rooms: number;
          bathrooms: number;
          parking: number;
          property_type: "mieszkanie" | "dom" | "lokal" | "działka" | "garaż";
          transaction_type: "sprzedaż" | "wynajem" | "kupno";
          featured: boolean;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description: string;
          location: string;
          price: number;
          price_per_m2: number;
          area: number;
          rooms: number;
          bathrooms: number;
          parking: number;
          property_type: "mieszkanie" | "dom" | "lokal" | "działka" | "garaż";
          transaction_type: "sprzedaż" | "wynajem" | "kupno";
          featured?: boolean;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          location?: string;
          price?: number;
          price_per_m2?: number;
          area?: number;
          rooms?: number;
          bathrooms?: number;
          parking?: number;
          property_type?: "mieszkanie" | "dom" | "lokal" | "działka" | "garaż";
          transaction_type?: "sprzedaż" | "wynajem" | "kupno";
          featured?: boolean;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          url: string;
          alt_text: string;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          url: string;
          alt_text: string;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          url?: string;
          alt_text?: string;
          is_primary?: boolean;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          phone: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
