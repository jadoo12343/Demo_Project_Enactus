export type Track = 'Tech' | 'Management' | 'Cultural' | 'Expo';

export type ScheduleItem = {
  id: string;
  day: 1 | 2;
  time: string;
  title: string;
  venue: string;
  track: Track;
  description: string;
  image: string;
};

export const tracks: Track[] = ['Tech', 'Management', 'Cultural', 'Expo'];

export const schedule: ScheduleItem[] = [
  { id: 'd1-1', day: 1, time: '09:00', title: 'Opening Ceremony', venue: 'Main Auditorium', track: 'Cultural', description: 'A warm welcome to two days of making, learning, and meaningful collisions.', image: 'https://images.pexels.com/photos/13202532/pexels-photo-13202532.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd1-2', day: 1, time: '10:00', title: 'Robo-Wars', venue: 'Innovation Arena', track: 'Tech', description: 'Machines meet the arena in a test of speed, strategy, and mechanical grit.', image: 'https://images.pexels.com/photos/8438956/pexels-photo-8438956.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd1-3', day: 1, time: '11:30', title: 'Enigmata', venue: 'LT Block', track: 'Tech', description: 'A fast-moving challenge for lateral thinkers and curious minds.', image: 'https://images.pexels.com/photos/36169774/pexels-photo-36169774.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd1-4', day: 1, time: '13:00', title: 'B-Plan', venue: 'Seminar Hall 1', track: 'Management', description: 'Turn a sharp observation into a business idea worth believing in.', image: 'https://images.pexels.com/photos/7413913/pexels-photo-7413913.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd1-5', day: 1, time: '15:00', title: 'DRDO / Defence Expo', venue: 'Expo Grounds', track: 'Expo', description: 'Get closer to the tools, research, and systems behind national innovation.', image: 'https://images.pexels.com/photos/9969348/pexels-photo-9969348.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd1-6', day: 1, time: '17:00', title: 'Science Expo', venue: 'Central Lawn', track: 'Expo', description: 'Student-built experiments and exhibits that make difficult ideas feel tangible.', image: 'https://images.pexels.com/photos/38041486/pexels-photo-38041486.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd1-7', day: 1, time: '19:00', title: 'Road Rage', venue: 'East Grounds', track: 'Tech', description: 'An engineering sprint where control, design, and nerve share the wheel.', image: 'https://images.pexels.com/photos/26868121/pexels-photo-26868121.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd1-8', day: 1, time: '21:00', title: 'Felicity', venue: 'Main Stage', track: 'Cultural', description: 'The campus comes alive after dark with a night built for everyone.', image: 'https://images.pexels.com/photos/38556557/pexels-photo-38556557.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd2-1', day: 2, time: '09:00', title: 'Internship Fair', venue: 'Convention Centre', track: 'Management', description: 'Meet teams building the future and take your next step with intention.', image: 'https://images.pexels.com/photos/7413916/pexels-photo-7413916.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd2-2', day: 2, time: '11:00', title: 'Case Study Challenge', venue: 'Seminar Hall 2', track: 'Management', description: 'Read the room, find the insight, and make the call under pressure.', image: 'https://images.pexels.com/photos/9034760/pexels-photo-9034760.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd2-3', day: 2, time: '13:00', title: 'ATV / Auto Expo', venue: 'Expo Grounds', track: 'Expo', description: 'A closer look at the machines, mobility ideas, and builds on the move.', image: 'https://images.pexels.com/photos/37263348/pexels-photo-37263348.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd2-4', day: 2, time: '15:00', title: 'Innovation Workshops', venue: 'Workshop Studios', track: 'Tech', description: 'Practical sessions for taking an idea from a blank page to a first prototype.', image: 'https://images.pexels.com/photos/36522026/pexels-photo-36522026.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd2-5', day: 2, time: '17:00', title: 'Makers Showcase', venue: 'Innovation Arena', track: 'Tech', description: 'The brightest student projects share the thinking behind the build.', image: 'https://images.pexels.com/photos/32778343/pexels-photo-32778343.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd2-6', day: 2, time: '19:00', title: 'Cultural Showcase', venue: 'Main Stage', track: 'Cultural', description: 'Music, movement, and stories from the people who make NSUT feel alive.', image: 'https://images.pexels.com/photos/1581906/pexels-photo-1581906.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
  { id: 'd2-7', day: 2, time: '21:00', title: 'Closing Night', venue: 'Main Stage', track: 'Cultural', description: 'A final celebration of the ideas, teams, and moments that stayed with us.', image: 'https://images.pexels.com/photos/39005265/pexels-photo-39005265.jpeg?auto=compress&cs=tinysrgb&h=350&w=500' },
];
