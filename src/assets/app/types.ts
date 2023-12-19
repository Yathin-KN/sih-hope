export interface AllTickets {
    _id: string;
    customer_phone_no: string;
    last_conversation?: {
      employee_id: string;
      last_message: {
        content: string;
        sent_by: string;
        timestamp: string;
      };
      timestamp: string;
    };
}

export interface TicketData{
   ticket:TicketDataResponse[]
}

export interface AssignmentRequest {
  assigned_to: string;
  assignment_type: string;
  comment: string;
}

type UserType = "Customer" | "Agent";

export interface TicketDataResponse {
  _id: string;
  assignment_history: {
    assigned_at: string;
    assigned_by: string;
    assignee: string;
    assignment_type: string;
    comments: string;
  }[];
  conversation_history: {
    customer_phone_no: string;
    conversations: {
      timestamp: {
        $date: string;
      };
      employee_id: {
        $oid: string;
      };
      messages: Message[];
    }[];
  };
  created_at: string;
  current_assignee: string;
  customer_phone_no: string;
  description: string | null;
  priority: 'Low' | 'Medium' | 'High'; // Adjusted priority type
  resolution_comment: string;
  resolved_at: string;
  status: string;
  title: string | null;
  updated_at: string;
}

export interface Message {
  date: string;
  time: string;
  timestamp: string;
  type: MessageType;
  text_message?: TextMessage;
  call_message?: CallMessage;
}

export interface TextMessage {
  date: string;
  message: string;
  sent_by: UserType;
  time: string;
}

export interface CallMessage {
  audio_file: string;
  date: string;
  time: string;
  timestamp: string;
  transcript: {
    result: {
      conv: string[];
    };
  };
}

type UserTType = 'Customer' | 'Agent';

type MessageType = 'Text' | 'Call';


interface ConversationMessage {
  timestamp: {
    $date: string;
  };
  date: string;
  time: string;
  type: string;
  call_message: {
    date: string;
    time: string;
    transcript: {
      result: {
        conv: string[];
      };
    };
    audio_file: string;
  };
}

interface Conversation {
  timestamp: {
    $date: string;
  };
  employee_id: {
    $oid: string;
  };
  messages: ConversationMessage[];
}

interface CustomerConversation {
  _id: {
    $oid: string;
  };
  customer_phone_no: string;
  conversations: Conversation[];
}


export interface NewTicket {
  id: string;
  customer_phone_no: string;
  priority: 'Low' | 'Medium' | 'High';
  setIsOpen :any
}
