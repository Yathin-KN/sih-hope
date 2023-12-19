import { faker } from '@faker-js/faker';

function getRandomUserRole(): string {
  const roles: string[] = ['Agent', 'Customer'];
  const randomIndex: number = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
}
type LastMessage = {
  content: string;
  sent_by: string;
  timestamp: string;
};

type LastConversation = {
  employee_id: string;
  last_message: LastMessage;
  timestamp: string;
};

type Conversation = {
  _id: string;
  customer_phone_no: string;
  last_conversation: LastConversation;
};

const generateDummyData = async (count: number): Promise<Conversation[]> => {
  const conversations: Conversation[] = [];

  for (let i = 1; i <= count; i++) {
    const conversation: Conversation = {
      _id: faker.string.uuid(),
      customer_phone_no: faker.phone.number(),
      last_conversation: {
        employee_id: faker.string.uuid(),
        last_message: {
          content: faker.lorem.sentence(),
          sent_by: getRandomUserRole(),
          timestamp: faker.date.recent().toUTCString(),
        },
        timestamp: faker.date.recent().toUTCString(),
      },
    };
    conversations.push(conversation);
  }

  await new Promise((resolve) => setTimeout(resolve, 10));

  return conversations;
};

export default generateDummyData;
