export enum ERRORS {
  server = 'serverError',
}

export enum ERRORS_MESSAGE {
  server = 'Кажется, сервер немного устал (',
  serverWorksNotStable = 'Приложение может работать с ошибками',
}

export type SERVER_ERROR_TYPE = { err: string };

export enum TYPE_PAYMENT {
  fondDonation, // Пожертвование в фонд
  feesDonation, // Пожертвование в фонд
  addUserBalance, // Пополнение пользовательского баланса
}
