export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bmi_classification: {
        Row: {
          classification: string | null
          created_at: string
          id: number
        }
        Insert: {
          classification?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          classification?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      daily_meals: {
        Row: {
          breakFast: number | null
          created_at: string
          created_by: string | null
          dinner: number | null
          id: number
          lunch: number | null
          plan_id: number | null
          visibility: number | null
        }
        Insert: {
          breakFast?: number | null
          created_at?: string
          created_by?: string | null
          dinner?: number | null
          id?: number
          lunch?: number | null
          plan_id?: number | null
          visibility?: number | null
        }
        Update: {
          breakFast?: number | null
          created_at?: string
          created_by?: string | null
          dinner?: number | null
          id?: number
          lunch?: number | null
          plan_id?: number | null
          visibility?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_meals_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_breakFast_fkey"
            columns: ["breakFast"]
            isOneToOne: false
            referencedRelation: "meal"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_dinner_fkey"
            columns: ["dinner"]
            isOneToOne: false
            referencedRelation: "meal"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_lunch_fkey"
            columns: ["lunch"]
            isOneToOne: false
            referencedRelation: "meal"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise: {
        Row: {
          bmiClassification: number | null
          bodyPart: string | null
          created_at: string
          created_by: string | null
          day: string | null
          equipment: string | null
          exerciseDemo: string | null
          exerciseDifficulty: number | null
          exerciseMeasurementType: number | null
          exerciseName: string | null
          exercisePlanId: number | null
          id: number
          instruction: string | null
          measurement: string | null
          youtubeLink: string | null
        }
        Insert: {
          bmiClassification?: number | null
          bodyPart?: string | null
          created_at?: string
          created_by?: string | null
          day?: string | null
          equipment?: string | null
          exerciseDemo?: string | null
          exerciseDifficulty?: number | null
          exerciseMeasurementType?: number | null
          exerciseName?: string | null
          exercisePlanId?: number | null
          id?: number
          instruction?: string | null
          measurement?: string | null
          youtubeLink?: string | null
        }
        Update: {
          bmiClassification?: number | null
          bodyPart?: string | null
          created_at?: string
          created_by?: string | null
          day?: string | null
          equipment?: string | null
          exerciseDemo?: string | null
          exerciseDifficulty?: number | null
          exerciseMeasurementType?: number | null
          exerciseName?: string | null
          exercisePlanId?: number | null
          id?: number
          instruction?: string | null
          measurement?: string | null
          youtubeLink?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_bmiClassification_fkey"
            columns: ["bmiClassification"]
            isOneToOne: false
            referencedRelation: "bmi_classification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_exerciseDifficulty_fkey"
            columns: ["exerciseDifficulty"]
            isOneToOne: false
            referencedRelation: "exercise_difficulty"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_difficulty: {
        Row: {
          created_at: string
          difficulty: string | null
          id: number
        }
        Insert: {
          created_at?: string
          difficulty?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          difficulty?: string | null
          id?: number
        }
        Relationships: []
      }
      exercise_measurement_type: {
        Row: {
          created_at: string
          id: number
          measurement: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          measurement?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          measurement?: string | null
        }
        Relationships: []
      }
      exercise_plan: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          planName: string | null
          visibility: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          planName?: string | null
          visibility?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          planName?: string | null
          visibility?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_plan_visibility_fkey"
            columns: ["visibility"]
            isOneToOne: false
            referencedRelation: "plan_visibility"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_plan_tag: {
        Row: {
          created_at: string
          exercisePlanId: number | null
          id: number
          tagId: number | null
        }
        Insert: {
          created_at?: string
          exercisePlanId?: number | null
          id?: number
          tagId?: number | null
        }
        Update: {
          created_at?: string
          exercisePlanId?: number | null
          id?: number
          tagId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_plan_tag_exercisePlanId_fkey"
            columns: ["exercisePlanId"]
            isOneToOne: false
            referencedRelation: "exercise_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_plan_tag_tagId_fkey"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "exercise_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_tags: {
        Row: {
          created_at: string
          exerciseTagName: string | null
          id: number
        }
        Insert: {
          created_at?: string
          exerciseTagName?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          exerciseTagName?: string | null
          id?: number
        }
        Relationships: []
      }
      meal: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          instructions: string | null
          mealName: string | null
          mealType: number | null
          veganAlternative: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          instructions?: string | null
          mealName?: string | null
          mealType?: number | null
          veganAlternative?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          instructions?: string | null
          mealName?: string | null
          mealType?: number | null
          veganAlternative?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_mealType_fkey"
            columns: ["mealType"]
            isOneToOne: false
            referencedRelation: "meal_type"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_ingredients: {
        Row: {
          calories: number | null
          carbs: number | null
          created_at: string
          created_by: string | null
          fat: number | null
          id: number
          ingredientName: string | null
          mealId: number | null
          protein: number | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          created_by?: string | null
          fat?: number | null
          id?: number
          ingredientName?: string | null
          mealId?: number | null
          protein?: number | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          created_by?: string | null
          fat?: number | null
          id?: number
          ingredientName?: string | null
          mealId?: number | null
          protein?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_ingredients_mealId_fkey"
            columns: ["mealId"]
            isOneToOne: false
            referencedRelation: "meal"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plan: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          planName: string | null
          visibility: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          planName?: string | null
          visibility?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          planName?: string | null
          visibility?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_visibility_fkey"
            columns: ["visibility"]
            isOneToOne: false
            referencedRelation: "plan_visibility"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plan_tags: {
        Row: {
          created_at: string
          id: number
          mealPlanId: number | null
          tagId: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          mealPlanId?: number | null
          tagId?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          mealPlanId?: number | null
          tagId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_tags_mealPlanId_fkey"
            columns: ["mealPlanId"]
            isOneToOne: false
            referencedRelation: "meal_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_tags_tagId_fkey"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "meal_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_tags: {
        Row: {
          created_at: string
          id: number
          mealTagName: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          mealTagName?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          mealTagName?: string | null
        }
        Relationships: []
      }
      meal_type: {
        Row: {
          created_at: string
          id: number
          mealType: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          mealType?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          mealType?: string | null
        }
        Relationships: []
      }
      personal_information: {
        Row: {
          birth_date: string | null
          created_at: string
          gender: string | null
          height: number | null
          id: number
          name: string | null
          updated_at: string | null
          updated_by: string | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          gender?: string | null
          height?: number | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          gender?: string | null
          height?: number | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      plan_visibility: {
        Row: {
          created_at: string
          id: number
          visibility: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          visibility?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          visibility?: string | null
        }
        Relationships: []
      }
      terms_and_condition: {
        Row: {
          agree_terms_and_conditions: boolean | null
          created_at: string
          id: number
          recieve_marketing_messages: boolean | null
          recieve_progess_updates_remainders: boolean | null
          updated_at: string | null
          updated_by: string | null
          user_id: string | null
        }
        Insert: {
          agree_terms_and_conditions?: boolean | null
          created_at?: string
          id?: number
          recieve_marketing_messages?: boolean | null
          recieve_progess_updates_remainders?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string | null
        }
        Update: {
          agree_terms_and_conditions?: boolean | null
          created_at?: string
          id?: number
          recieve_marketing_messages?: boolean | null
          recieve_progess_updates_remainders?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string | null
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

export type Table<
  T extends keyof Database["public"]["Tables"],
  U extends keyof Database["public"]["Tables"][T]
> = Database["public"]["Tables"][T][U];

export type TableInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TableRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TableUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
