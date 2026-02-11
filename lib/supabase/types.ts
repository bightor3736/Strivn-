export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: { Row: { id: string; username: string | null; created_at: string }; Insert: { id: string; username?: string | null; created_at?: string }; Update: { username?: string | null }; Relationships: [] };
      files: { Row: { id: string; owner_id: string; team_id: string | null; section_id: string | null; filename: string; storage_path: string; created_at: string }; Insert: { id?: string; owner_id: string; team_id?: string | null; section_id?: string | null; filename: string; storage_path: string; created_at?: string }; Update: { section_id?: string | null; filename?: string }; Relationships: [] };
      sections: { Row: { id: string; owner_id: string; team_id: string | null; name: string; color: string; created_at: string }; Insert: { id?: string; owner_id: string; team_id?: string | null; name: string; color: string; created_at?: string }; Update: { name?: string; color?: string }; Relationships: [] };
      share_links: { Row: { id: string; file_id: string; owner_id: string; token: string; expires_at: string | null; revoked_at: string | null; created_at: string }; Insert: { id?: string; file_id: string; owner_id: string; token: string; expires_at?: string | null; revoked_at?: string | null }; Update: { revoked_at?: string | null; expires_at?: string | null }; Relationships: [] };
      viewer_profiles: { Row: { id: string; share_link_id: string; name: string | null; email: string | null; created_at: string }; Insert: { id?: string; share_link_id: string; name?: string | null; email?: string | null }; Update: { name?: string | null; email?: string | null }; Relationships: [] };
      share_events: { Row: { id: string; file_id: string; share_link_id: string; viewer_profile_id: string | null; event_type: 'view_start' | 'view_ping' | 'download' | 'approval'; seconds_spent: number; created_at: string }; Insert: { id?: string; file_id: string; share_link_id: string; viewer_profile_id?: string | null; event_type: 'view_start' | 'view_ping' | 'download' | 'approval'; seconds_spent?: number; created_at?: string }; Update: { seconds_spent?: number }; Relationships: [] };
      approvals: { Row: { id: string; file_id: string; share_link_id: string; viewer_profile_id: string | null; name: string | null; email: string | null; created_at: string }; Insert: { id?: string; file_id: string; share_link_id: string; viewer_profile_id?: string | null; name?: string | null; email?: string | null }; Update: never; Relationships: [] };
      teams: { Row: { id: string; owner_id: string; name: string; created_at: string }; Insert: { id?: string; owner_id: string; name: string; created_at?: string }; Update: { name?: string }; Relationships: [] };
      team_members: { Row: { id: string; team_id: string; user_id: string; role: 'owner' | 'admin' | 'member'; created_at: string }; Insert: { id?: string; team_id: string; user_id: string; role: 'owner' | 'admin' | 'member'; created_at?: string }; Update: { role?: 'owner' | 'admin' | 'member' }; Relationships: [] };
      team_invites: { Row: { id: string; team_id: string; email: string; token: string; role: 'owner' | 'admin' | 'member'; status: 'pending' | 'accepted' | 'declined'; created_at: string; accepted_at: string | null }; Insert: { id?: string; team_id: string; email: string; token: string; role: 'owner' | 'admin' | 'member'; status?: 'pending' | 'accepted' | 'declined'; accepted_at?: string | null }; Update: { status?: 'pending' | 'accepted' | 'declined'; accepted_at?: string | null }; Relationships: [] };
    };
    Views: {
      file_stats_v2: { Row: { file_id: string; owner_id: string; unique_viewers: number; total_seconds: number; last_viewed_at: string | null; approval_count: number; latest_approval_name: string | null; latest_approved_at: string | null; download_count: number }; Relationships: [] };
    };
    Functions: Record<string, never>;
    Enums: { team_role: 'owner' | 'admin' | 'member'; invite_status: 'pending' | 'accepted' | 'declined'; share_event_type: 'view_start' | 'view_ping' | 'download' | 'approval' };
  };
}
