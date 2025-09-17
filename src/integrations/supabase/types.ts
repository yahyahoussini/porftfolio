export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          event_data: Json | null
          event_type: string
          id: string
          page_url: string | null
          session_id: string
          timestamp: string
        }
        Insert: {
          event_data?: Json | null
          event_type: string
          id?: string
          page_url?: string | null
          session_id: string
          timestamp?: string
        }
        Update: {
          event_data?: Json | null
          event_type?: string
          id?: string
          page_url?: string | null
          session_id?: string
          timestamp?: string
        }
        Relationships: []
      }
      analytics_visitors: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          exit_page: string | null
          id: string
          ip_address: string | null
          landing_page: string | null
          page_views: number | null
          referrer: string | null
          session_duration: number | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          exit_page?: string | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          page_views?: number | null
          referrer?: string | null
          session_duration?: number | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          exit_page?: string | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          page_views?: number | null
          referrer?: string | null
          session_duration?: number | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          language: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          language?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          language?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          language: string
          meta_description: string | null
          meta_title: string | null
          published: boolean
          reading_time: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          language?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          reading_time?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          language?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          reading_time?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          lead_score: number | null
          message: string
          name: string
          source: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          lead_score?: number | null
          message: string
          name: string
          source?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          lead_score?: number | null
          message?: string
          name?: string
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      crawl_errors: {
        Row: {
          discovered_at: string
          error_message: string | null
          error_type: string
          id: string
          resolved: boolean | null
          status_code: number | null
          url: string
        }
        Insert: {
          discovered_at?: string
          error_message?: string | null
          error_type: string
          id?: string
          resolved?: boolean | null
          status_code?: number | null
          url: string
        }
        Update: {
          discovered_at?: string
          error_message?: string | null
          error_type?: string
          id?: string
          resolved?: boolean | null
          status_code?: number | null
          url?: string
        }
        Relationships: []
      }
      keywords: {
        Row: {
          created_at: string
          current_position: number | null
          difficulty: number | null
          id: string
          keyword: string
          last_checked: string | null
          previous_position: number | null
          search_volume: number | null
          target_url: string
          trend: string | null
        }
        Insert: {
          created_at?: string
          current_position?: number | null
          difficulty?: number | null
          id?: string
          keyword: string
          last_checked?: string | null
          previous_position?: number | null
          search_volume?: number | null
          target_url: string
          trend?: string | null
        }
        Update: {
          created_at?: string
          current_position?: number | null
          difficulty?: number | null
          id?: string
          keyword?: string
          last_checked?: string | null
          previous_position?: number | null
          search_volume?: number | null
          target_url?: string
          trend?: string | null
        }
        Relationships: []
      }
      seo_audits: {
        Row: {
          audit_data: Json
          content_score: number | null
          created_at: string
          id: string
          issues: Json | null
          overall_score: number | null
          page_url: string
          performance_score: number | null
          recommendations: Json | null
          technical_score: number | null
        }
        Insert: {
          audit_data?: Json
          content_score?: number | null
          created_at?: string
          id?: string
          issues?: Json | null
          overall_score?: number | null
          page_url: string
          performance_score?: number | null
          recommendations?: Json | null
          technical_score?: number | null
        }
        Update: {
          audit_data?: Json
          content_score?: number | null
          created_at?: string
          id?: string
          issues?: Json | null
          overall_score?: number | null
          page_url?: string
          performance_score?: number | null
          recommendations?: Json | null
          technical_score?: number | null
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          created_at: string
          domain: string
          ga4_property: string | null
          gsc_property: string | null
          id: string
          robots_txt: string | null
          sitemap_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain: string
          ga4_property?: string | null
          gsc_property?: string | null
          id?: string
          robots_txt?: string | null
          sitemap_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string
          ga4_property?: string | null
          gsc_property?: string | null
          id?: string
          robots_txt?: string | null
          sitemap_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
