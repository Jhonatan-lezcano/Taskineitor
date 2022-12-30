interface Todos {
  completed: boolean;
  title: string;
  createAt: string;
}

export interface List {
  uid: string;
  idUser: string;
  name: string;
  color: string;
  createAt: string;
  todos: Todos[] | [];
}

export const mockData: List[] = [
  {
    uid: '1',
    idUser: '1',
    name: 'tareas',
    color: '#cb997e',
    createAt: '',
    todos: [
      {
        completed: true,
        title: 'Español',
        createAt: '',
      },
      {
        completed: false,
        title: 'Español',
        createAt: '',
      },
      {
        completed: false,
        title: 'Español',
        createAt: '',
      },
    ],
  },
  {
    uid: '2',
    idUser: '1',
    name: 'Compras',
    color: '#02c39a',
    createAt: '',
    todos: [
      {
        completed: true,
        title: 'Español',
        createAt: '',
      },
      {
        completed: true,
        title: 'Español',
        createAt: '',
      },
      {
        completed: true,
        title: 'Español',
        createAt: '',
      },
    ],
  },
  {
    uid: '3',
    idUser: '1',
    name: 'Citas',
    color: '#00a896',
    createAt: '',
    todos: [
      {
        completed: false,
        title: 'Español',
        createAt: '',
      },
      {
        completed: false,
        title: 'Español',
        createAt: '',
      },
      {
        completed: false,
        title: 'Español',
        createAt: '',
      },
    ],
  },
];
