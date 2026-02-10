
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  isbn: string;
  publishedDate: string;
  pages: number;
  status: 'Available' | 'Checked Out';
  category: string;
  rating: number;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=400',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    isbn: '978-0743273565',
    publishedDate: '1925-04-10',
    pages: 180,
    status: 'Available',
    category: 'Classic Literature',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=300&h=400',
    description: 'Dune is a 1965 epic science fiction novel by American author Frank Herbert. Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    isbn: '978-0441013593',
    publishedDate: '1965-08-01',
    pages: 412,
    status: 'Checked Out',
    category: 'Science Fiction',
    rating: 4.8,
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=400',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    isbn: '978-0735211292',
    publishedDate: '2018-10-16',
    pages: 320,
    status: 'Available',
    category: 'Self Help',
    rating: 4.9,
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=300&h=400',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn\'t know that. He can\'t even remember his own name, let alone the nature of his assignment or how to complete it.',
    isbn: '978-0593135204',
    publishedDate: '2021-05-04',
    pages: 496,
    status: 'Available',
    category: 'Science Fiction',
    rating: 4.7,
  },
  {
      id: '5',
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300&h=400',
      description: 'In this exhilarating novel, two friends--often in love, but never lovers--come together as creative partners in the world of video game design, where success brings them fame, joy, tragedy, duplicity, and, ultimately, a kind of immortality.',
      isbn: '978-1101907590',
      publishedDate: '2022-07-05',
      pages: 416,
      status: 'Available',
      category: 'Fiction',
      rating: 4.4,
  },
    {
      id: '6',
      title: 'Yellowface',
      author: 'R.F. Kuang',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300&h=400',
      description: 'June Hayward and Athena Liu were supposed to be twin rising stars: same year at Yale, same publishing year. But Athena\'s a cross-genre literary darling, and June didn\'t even get a paperback release. When Athena dies in a freak accident, June steals her just-finished masterpiece, an experimental novel about the unsung contributions of Chinese laborers to the British and French war efforts during WWI.',
      isbn: '978-0063250833',
      publishedDate: '2023-05-16',
      pages: 336,
      status: 'Available',
      category: 'Satire',
      rating: 4.1,
    }
];
