export const API_ROUTES = {
  getUser: '/signup',
};

export const CONFIG = {
  basicURL: 'https://react-project-management-task.herokuapp.com', // 'https://rs-project-management.herokuapp.com', //  'https://react-project-management-task.herokuapp.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmOTYxMmJiOC00Mjc1LTRiMzUtYjAyYy02ZmZhYjQ0ZWQ2N2UiLCJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjUyMzYzMTQ2fQ.ZBXVRVqBVVFubTW4AOhB7tzsmZWW1d3K5i8czg4c94A',
    //я тестировала, получаем ли индивидуальные данные, когда отправляем данные под уникальным токеном
  // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3N2U3NDhhZS1hODJmLTQ1NTgtOTkyNy0xNWM5YzA3NzNkZWEiLCJsb2dpbiI6Im5ldzJAdHV0LmJ5IiwiaWF0IjoxNjUzNjc5MTk5fQ.PWLK77ov0hT53f4dyJ2-71RiFkyVzdHkciW9oLRHCXE',
  // т.е получается, что начальная часть токена у всех пользователей одинаковая, только отличие в последней части после точки
};

export const TIMEOUT_FOR_MODAL = 500;
export const TIMEOUT_FOR_ALERT = 3000;
