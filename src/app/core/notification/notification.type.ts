export enum NotificationType {
  UNATHORIZED = 1,
  FORBIDDEN,
  SERVER_ERROR,
  CONNECTION_ERROR,
  SUCCESS,
  WARNING,
  NOT_FOUND,
  BAD_REQUEST,
  ERROR,
  TIMEOUT_ERROR,
  REQUEST_TIMEOUT
}

export interface Notification {
  type: NotificationType;
  message?: string;
}

export enum NotificationLevel {
  SUCCESS = 1,
  NOTICE,
  WARNING,
  ERROR
}

interface NotificationMap {
  [index: number]: {
    level: NotificationLevel;
    message?: string;
  };
}

export const NOTIFICATION_INFO: NotificationMap = {
  [NotificationType.FORBIDDEN]: {
    level: NotificationLevel.WARNING,
    message: 'Not allowed to access area'
  },
  [NotificationType.SERVER_ERROR]: {
    level: NotificationLevel.ERROR,
    message: 'An unexpected error occurred with your request'
  },
  [NotificationType.CONNECTION_ERROR]: {
    level: NotificationLevel.ERROR,
    message: 'There are currently connectivity issues that prevent your request from fulfilling'
  },
  [NotificationType.SUCCESS]: {
    level: NotificationLevel.SUCCESS
  },
  [NotificationType.WARNING]: {
    level: NotificationLevel.WARNING
  },
  [NotificationType.NOT_FOUND]: {
    level: NotificationLevel.ERROR,
    message: 'The requested element could not be found'
  },
  [NotificationType.BAD_REQUEST]: {
    level: NotificationLevel.ERROR,
    message: 'An unexpected error occurred with your request'
  },
  [NotificationType.ERROR]: {
    level: NotificationLevel.ERROR
  },
  [NotificationType.TIMEOUT_ERROR]: {
    level: NotificationLevel.ERROR,
    message: 'There are currently connectivity issues that prevent your request from fulfilling'
  },
  [NotificationType.REQUEST_TIMEOUT]: {
    level: NotificationLevel.ERROR,
    message: 'The server timed out while making a request to an external service'
  }
};
