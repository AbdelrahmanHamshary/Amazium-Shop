import { Bell, Package, Tag, Settings, CheckCheck } from 'lucide-react';
import { useStore } from '../store';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllRead } = useStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const typeIcons = {
    order: Package,
    promo: Tag,
    system: Settings,
  };

  const typeColors = {
    order: 'bg-blue-50 text-blue-600',
    promo: 'bg-orange-50 text-orange-600',
    system: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Bell size={28} /> Notifications
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button type="button" onClick={() => void markAllRead()} className="text-sm text-amazon-blue hover:underline flex items-center gap-1">
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map((notification, i) => {
            const Icon = typeIcons[notification.type];
            return (
              <button
                key={notification.id}
                onClick={() => void markNotificationRead(notification.id)}
                className={`w-full text-left bg-white rounded-lg shadow-sm p-4 flex items-start gap-3 transition-all hover:shadow-md animate-fade-in-up ${
                  !notification.read ? 'border-l-4 border-amazon-blue' : 'opacity-75'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${typeColors[notification.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.read ? 'font-semibold' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!notification.read && (
                  <span className="w-2.5 h-2.5 bg-amazon-blue rounded-full shrink-0 mt-1.5" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-7xl mb-4">🔔</p>
          <h2 className="text-2xl font-bold mb-2">No notifications</h2>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
