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
    idUser: 'algo',
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
];
