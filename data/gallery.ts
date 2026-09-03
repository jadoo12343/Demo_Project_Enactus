export type GalleryPhoto = {
  url: string;
  caption: string;
  tag: string;
  eventId: string;
};

export const gallery: GalleryPhoto[] = [
  { url: 'https://images.pexels.com/photos/8566536/pexels-photo-8566536.jpeg?auto=compress&cs=tinysrgb&h=500&w=700', caption: 'The future, built by hand', tag: 'Tech', eventId: 'd1-2' },
  { url: 'https://images.pexels.com/photos/38556557/pexels-photo-38556557.jpeg?auto=compress&cs=tinysrgb&h=500&w=700', caption: 'After dark', tag: 'Cultural', eventId: 'd1-8' },
  { url: 'https://images.pexels.com/photos/1581906/pexels-photo-1581906.jpeg?auto=compress&cs=tinysrgb&h=500&w=700', caption: 'Culture in motion', tag: 'Cultural', eventId: 'd2-6' },
  { url: 'https://images.pexels.com/photos/36522033/pexels-photo-36522033.jpeg?auto=compress&cs=tinysrgb&h=500&w=700', caption: 'The expo floor', tag: 'Expo', eventId: 'd1-5' },
  { url: 'https://images.pexels.com/photos/7413917/pexels-photo-7413917.jpeg?auto=compress&cs=tinysrgb&h=500&w=700', caption: 'The pitch', tag: 'Management', eventId: 'd1-4' },
  { url: 'https://images.pexels.com/photos/13230800/pexels-photo-13230800.jpeg?auto=compress&cs=tinysrgb&h=500&w=700', caption: 'The crowd', tag: 'Cultural', eventId: 'd1-1' },
  { url: 'https://images.pexels.com/photos/26868121/pexels-photo-26868121.jpeg?auto=compress&cs=tinysrgb&h=500&w=700', caption: 'Engineering on display', tag: 'Tech', eventId: 'd1-7' },
  { url: 'https://images.pexels.com/photos/12327992/pexels-photo-12327992.jpeg?auto=compress&cs=tinysrgb&h=500&w=700', caption: 'Roots and rhythm', tag: 'Cultural', eventId: 'd2-6' },
];
