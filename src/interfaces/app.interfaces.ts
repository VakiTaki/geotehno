export interface IEvent {
  id: string | number;
  date: number;
  importance: string | number;
  equipment: string | number;
  message: string | number;
  responsible: string | number;
  completed: boolean;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  organizationId: string;
  created: number;
  updated: number;
  phone: string;
  photoId: string;
  photoOriginal: string;
  photoTargetWidth: number;
  photoTargetX: number;
  photoTargetY: number;
  birthDate: string;
  lastName: string;
  patronymic: string;
  name: string;
  roleIds: number[];
  roleNames: any[];
  roles: any[];
  blocked: boolean;
  homeTimeZone: string;
  position: string;
  organizationName: string;
  groupName: string;
  techData: string;
}
