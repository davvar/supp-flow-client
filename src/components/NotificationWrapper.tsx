import { reject } from 'lodash';
import React, {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  Reducer,
  useContext,
  useReducer
} from 'react';
import { AlertList } from 'react-bs-notifier';

export class Notification {
  public id = Date.now()
  headline: string
  public type: 'danger' | 'info' | 'success' | 'warning'
  public message: string

  constructor(data: {
    type: 'danger' | 'info' | 'success' | 'warning'
    title: string
    message: string
  }) {
    this.headline = data.title
    this.type = data.type
    this.message = data.message
  }
}

const NotificationContext = createContext<{
  notify: Dispatch<Notification>
}>(null as any)

export const useNotify = () => useContext(NotificationContext)

export const NotificationWrapper: FC = ({ children }): ReactElement => {
  const [notifications, dispatch] = useReducer<
    Reducer<Notification[], { type: string; notification: Notification }>
  >((notifications, { type, notification }) => {
    if (type === 'add') {
      return notifications.concat(notification)
    } else if (type === 'remove') {
      notifications = reject(notifications, { id: notification.id })
    }

    return notifications
  }, [])

  return (
    <>
      <AlertList
        position={'top-right'}
        alerts={notifications}
        timeout={3000}
        onDismiss={notification => dispatch({ type: 'remove', notification })}
      />
      <NotificationContext.Provider
        value={{
          notify: notification => dispatch({ type: 'add', notification }),
        }}
      >
        {children}
      </NotificationContext.Provider>
    </>
  )
}
