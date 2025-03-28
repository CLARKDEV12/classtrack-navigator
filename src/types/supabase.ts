
export type Profile = {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  approved: boolean;
  created_at: string;
};

export type Room = {
  id: string;
  name: string;
  capacity: number;
  building: string;
  floor: number;
  room_number: string;
  has_projector: boolean;
  has_whiteboard: boolean;
  created_at: string;
};

export type Schedule = {
  id: string;
  room_id: string;
  user_id: string;
  title: string;
  start_time: string;
  end_time: string;
  description?: string;
  status: string;
  created_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  recipient_id?: string;
  content: string;
  is_read: boolean;
  created_at: string;
};
