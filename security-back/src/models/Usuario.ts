export interface Usuario {
  id?: number;
  nome: string;
  senha: string;
}
/**
 * [Segurança] Validações em qualquer input vindo do usuário. Vide ataque 'Cross Site Scripting (XSS)'
 */
export const constraints = {
  nome: {
    presence: true,
    format: {
      pattern: '[a-zA-Z]*',
      message: 'de usuário só pode conter letras',
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
      message:
        'deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo',
    },
    length: {
      minimum: 12,
      maximum: 30,
    },
  },
};
