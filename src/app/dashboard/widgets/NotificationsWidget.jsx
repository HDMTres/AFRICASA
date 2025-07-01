'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function NotificationsWidget() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [socket, setSocket] = useState(null);

  // Notifications de démonstration
  const demoNotifications = [
    {
      id: 1,
      type: 'message',
      title: 'Nouveau message',
      message: 'Jean Dupont vous a envoyé un message concernant votre propriété.',
      time: new Date(Date.now() - 5 * 60 * 1000), // Il y a 5 minutes
      read: false,
      icon: '💬'
    },
    {
      id: 2,
      type: 'booking',
      title: 'Nouvelle visite',
      message: 'Une visite a été programmée pour demain à 14h00.',
      time: new Date(Date.now() - 30 * 60 * 1000), // Il y a 30 minutes
      read: false,
      icon: '📅'
    },
    {
      id: 3,
      type: 'sale',
      title: 'Vente réalisée',
      message: 'Félicitations ! Votre propriété à Douala a été vendue.',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2 heures
      read: true,
      icon: '🎉'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Alerte prix',
      message: 'Le prix du marché dans votre zone a augmenté de 5%.',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000), // Il y a 4 heures
      read: true,
      icon: '📈'
    },
    {
      id: 5,
      type: 'system',
      title: 'Mise à jour',
      message: 'Votre profil a été mis à jour avec succès.',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // Il y a 1 jour
      read: true,
      icon: '✅'
    }
  ];

  useEffect(() => {
    // Initialiser avec les notifications de démonstration
    setNotifications(demoNotifications);
    setUnreadCount(demoNotifications.filter(n => !n.read).length);

    // Tenter de se connecter au socket.io (optionnel)
    try {
      const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000', {
        autoConnect: false
      });
      
      // Ne pas se connecter automatiquement pour éviter les erreurs
      // newSocket.connect();
      
      newSocket.on('notification', (notification) => {
        setNotifications(prev => [
          {
            ...notification,
            id: Date.now(),
            time: new Date(),
            read: false
          },
          ...prev
        ]);
        setUnreadCount(prev => prev + 1);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } catch (error) {
      console.log('Socket.io non disponible, utilisation du mode démo');
    }
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const formatTime = (time) => {
    const now = new Date();
    const diff = now - time;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  const getNotificationStyle = (type) => {
    const styles = {
      message: 'notification-message',
      booking: 'notification-booking',
      sale: 'notification-sale',
      alert: 'notification-alert',
      system: 'notification-system'
    };
    return styles[type] || 'notification-default';
  };

  return (
    <div className="notifications-widget">
      <div 
        className="notifications-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="widget-title">
          🔔 Notifications
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </h3>
        <button className="expand-btn">
          {isExpanded ? '▼' : '▲'}
        </button>
      </div>

      {isExpanded && (
        <div className="notifications-content">
          <div className="notifications-actions">
            <button 
              onClick={markAllAsRead}
              className="mark-all-read"
              disabled={unreadCount === 0}
            >
              Tout marquer comme lu
            </button>
          </div>

          <div className="notifications-list">
            {notifications.slice(0, 5).map((notification) => (
              <div 
                key={notification.id}
                className={`notification-item ${getNotificationStyle(notification.type)} ${!notification.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon">
                  {notification.icon}
                </div>
                
                <div className="notification-content">
                  <h4 className="notification-title">{notification.title}</h4>
                  <p className="notification-message">{notification.message}</p>
                  <small className="notification-time">
                    {formatTime(notification.time)}
                  </small>
                </div>

                <button 
                  className="notification-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotification(notification.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="no-notifications">
                <p>Aucune notification</p>
              </div>
            )}

            {notifications.length > 5 && (
              <div className="show-more">
                <button className="show-more-btn">
                  Voir toutes les notifications ({notifications.length})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
