export interface Usuario {
  id?: number;
  nome: string;
  senha: string;
}

export const constraints = {
  nome: {
    presence: true,
    format: {
      pattern: '[a-zA-Z]*',
      message: 'Nome de usuário só pode conter letras',
    },
    length: {
      minimum: 5,
      maximum: 20,
    },
  },
  senha: {
    presence: true,
    format: {
      pattern: '(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*[^0-9A-Za-z]).+',
    },
    length: {
      minimum: 12,
      maximum: 30,
    },
  },
};
