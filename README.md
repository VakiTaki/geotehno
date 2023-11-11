Журнал событий - тестовое задание от Андрея Родина.

https://github.com/VakiTaki/geotehno.git

Стек: TypeScript, Tailwind + PrimeReact, RTK Query

Описание:
Реализовано одностраничное приложение "Журнал событий" в виде таблицы с сообщениями.
При включение свича происходит генерация сообщений и отправка их на сервер раз в 3 секунды.
Реализован поиск по сообщениям через запрос на сервер.
Навигацию по сообщениям можно осуществлять кнопками вверх (Arrow UP) и вниз (Arrow Down) клавиатуры,
а на кнопку пробел (Space) изменять (на сервере) статус (прочитано/не прочитано), который отображается в первом столбце.
Адаптировано под все виды устройств.

Недостатки: так как не полноценный бэк пагинация реализована на фронте со всеми вытекающими.

Спасибо за внимание!

Если возникнут какие-то вопросы, просьба обращаться в телеграмм @VakiTaki или на почту patsanenok33@gmail.com

Инструкция

Для установки зависимостей:
`yarn install`

Запустить JSON-сервер:
`yarn server`

Запустить девелоп:
`yarn start`

Запустить все сразу:
`yarn dev`
