import { IEvent } from "../interfaces/app.interfaces";

function getRandomValue<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Списки возможных значений для полей
const importanceLevels: string[] = ["Низкая", "Критическая", "Высокая"];
const equipmentTypes: string[] = ["ПК", "ТВ", "Труба", "Провод", "Насос"];
const messages: string[] = [
  "Сообщение 1",
  "Сообщение 2",
  "Сообщение 3",
  "Сообщение 4",
  "Сообщение 5",
  "Сообщение 6",
  "Сообщение 7",
  "Сообщение 8",
  "Сообщение 9",
  "Сообщение 10",
];
const responsibles: string[] = [
  "Кожевникова З. Г.",
  "Клюев И. С.",
  "Головин Э. С.",
  "Дроздова Г. Р.",
  "Грачев Э. Р.",
  "Копылов А. С.",
  "Аксенов И. А.",
  "Гончаров С. А.",
  "Журавлева Л. М.",
  "Лукьянов О. Б",
];

export const generateRandomEvent = () => {
  const randomImportance: string = getRandomValue(importanceLevels);
  const randomEquipment: string = getRandomValue(equipmentTypes);
  const randomMessage: string = getRandomValue(messages);
  const randomResponsible: string = getRandomValue(responsibles);
  const newObject: IEvent = {
    id: Date.now(),
    date: Date.now(),
    importance: randomImportance,
    equipment: randomEquipment,
    message: randomMessage,
    responsible: randomResponsible,
    completed: false,
  };

  return newObject;
};
