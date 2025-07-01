'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date(2025, 6, 1), // 1 juillet 2025 (aujourd'hui)
      title: 'Formation immobilier digital',
      time: '15:00',
      type: 'training',
      client: 'AFRICASA Academy'
    },
    {
      id: 2,
      date: new Date(2025, 6, 2), // 2 juillet 2025
      title: 'Visite villa Bastos',
      time: '14:00',
      type: 'visit',
      client: 'M. Essomba'
    },
    {
      id: 3,
      date: new Date(2025, 6, 3), // 3 juillet 2025
      title: 'Signature contrat location',
      time: '10:30',
      type: 'appointment',
      client: 'Mme Biya'
    },
    {
      id: 4,
      date: new Date(2025, 6, 4), // 4 juillet 2025
      title: 'Inspection technique immeuble',
      time: '09:30',
      type: 'visit',
      client: 'Syndic Bonapriso'
    },
    {
      id: 5,
      date: new Date(2025, 6, 5), // 5 juillet 2025
      title: 'Réunion équipe commerciale',
      time: '09:00',
      type: 'meeting',
      client: 'Équipe Ventes'
    },
    {
      id: 6,
      date: new Date(2025, 6, 7), // 7 juillet 2025
      title: 'Visite terrain Bonanjo',
      time: '16:00',
      type: 'visit',
      client: 'M. Tchouta'
    },
    {
      id: 7,
      date: new Date(2025, 6, 8), // 8 juillet 2025
      title: 'Formation négociation',
      time: '11:00',
      type: 'training',
      client: 'AFRICASA Academy'
    },
    {
      id: 8,
      date: new Date(2025, 6, 9), // 9 juillet 2025
      title: 'Évaluation propriété Akwa',
      time: '15:30',
      type: 'appointment',
      client: 'Mme Fotso'
    },
    {
      id: 9,
      date: new Date(2025, 6, 10), // 10 juillet 2025
      title: 'Visite appartement neuf',
      time: '13:00',
      type: 'visit',
      client: 'M. Ndongo'
    },
    {
      id: 10,
      date: new Date(2025, 6, 11), // 11 juillet 2025
      title: 'Réunion investisseurs',
      time: '14:30',
      type: 'meeting',
      client: 'Fonds immobilier'
    },
    {
      id: 11,
      date: new Date(2025, 6, 12), // 12 juillet 2025
      title: 'Visite villa Logpom',
      time: '10:00',
      type: 'visit',
      client: 'Famille Mballa'
    },
    {
      id: 12,
      date: new Date(2025, 6, 14), // 14 juillet 2025
      title: 'Signature acte de vente',
      time: '11:30',
      type: 'appointment',
      client: 'Notaire Maître Owona'
    },
    {
      id: 13,
      date: new Date(2025, 6, 15), // 15 juillet 2025
      title: 'Formation marketing digital',
      time: '08:30',
      type: 'training',
      client: 'AFRICASA Academy'
    },
    {
      id: 14,
      date: new Date(2025, 6, 16), // 16 juillet 2025
      title: 'Visite duplex Makepe',
      time: '16:30',
      type: 'visit',
      client: 'M. Ateba'
    },
    {
      id: 15,
      date: new Date(2025, 6, 17), // 17 juillet 2025
      title: 'Réunion partenaires bancaires',
      time: '09:30',
      type: 'meeting',
      client: 'UBA & SGBC'
    },
    {
      id: 16,
      date: new Date(2025, 6, 18), // 18 juillet 2025
      title: 'Présentation projet résidentiel',
      time: '14:30',
      type: 'meeting',
      client: 'Investisseurs privés'
    },
    {
      id: 17,
      date: new Date(2025, 6, 19), // 19 juillet 2025
      title: 'Visite bureaux Bonanjo',
      time: '10:15',
      type: 'visit',
      client: 'Entreprise SOCAVER'
    },
    {
      id: 18,
      date: new Date(2025, 6, 21), // 21 juillet 2025
      title: 'Formation gestion locative',
      time: '13:30',
      type: 'training',
      client: 'AFRICASA Academy'
    },
    {
      id: 19,
      date: new Date(2025, 6, 22), // 22 juillet 2025
      title: 'Évaluation terrain Bassa',
      time: '15:00',
      type: 'appointment',
      client: 'Expert géomètre'
    },
    {
      id: 20,
      date: new Date(2025, 6, 23), // 23 juillet 2025
      title: 'Visite maison Deido',
      time: '11:45',
      type: 'visit',
      client: 'Mme Ekotto'
    },
    {
      id: 21,
      date: new Date(2025, 6, 25), // 25 juillet 2025
      title: 'Réunion bilan mensuel',
      time: '08:00',
      type: 'meeting',
      client: 'Direction AFRICASA'
    },
    {
      id: 22,
      date: new Date(2025, 6, 26), // 26 juillet 2025
      title: 'Visite entrepôt Bonabéri',
      time: '14:00',
      type: 'visit',
      client: 'Société CAMLOG'
    },
    {
      id: 23,
      date: new Date(2025, 6, 28), // 28 juillet 2025
      title: 'Formation juridique immobilier',
      time: '09:00',
      type: 'training',
      client: 'AFRICASA Academy'
    },
    {
      id: 24,
      date: new Date(2025, 6, 29), // 29 juillet 2025
      title: 'Signature promesse de vente',
      time: '16:00',
      type: 'appointment',
      client: 'M. & Mme Simo'
    },
    {
      id: 25,
      date: new Date(2025, 6, 30), // 30 juillet 2025
      title: 'Visite appartement Ndogpassi',
      time: '12:30',
      type: 'visit',
      client: 'Famille Nganou'
    }
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    type: 'visit',
    client: ''
  });

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const hasEventOnDate = (date) => {
    return getEventsForDate(date).length > 0;
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.time) {
      setEvents([...events, {
        id: Date.now(),
        date: selectedDate,
        ...newEvent
      }]);
      setNewEvent({ title: '', time: '', type: 'visit', client: '' });
      setShowAddEvent(false);
    }
  };

  const removeEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      visit: '🏠',
      appointment: '📋',
      training: '📚',
      meeting: '💼',
      other: '📅'
    };
    return icons[type] || '📅';
  };

  const getEventTypeColor = (type) => {
    const colors = {
      visit: '#10B981',
      appointment: '#3B82F6',
      training: '#F59E0B',
      meeting: '#8B5CF6',
      other: '#6B7280'
    };
    return colors[type] || '#6B7280';
  };

  const todayEvents = getEventsForDate(new Date());
  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <h3 className="widget-title">📅 Calendrier & Rendez-vous</h3>
      </div>

      <div className="calendar-content">
        <div className="calendar-container">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            locale="fr-FR"
            tileClassName={({ date }) => {
              if (hasEventOnDate(date)) {
                return 'has-events';
              }
              return '';
            }}
          />
        </div>

        <div className="events-section">
          <div className="today-events">
            <h4>📍 Aujourd'hui</h4>
            {todayEvents.length > 0 ? (
              <div className="events-list">
                {todayEvents.map(event => (
                  <div key={event.id} className="event-item today-event">
                    <span className="event-icon">
                      {getEventTypeIcon(event.type)}
                    </span>
                    <div className="event-details">
                      <h5>{event.title}</h5>
                      <p>{event.time} - {event.client}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events">Aucun événement aujourd'hui</p>
            )}
          </div>

          <div className="selected-date-events">
            <h4>
              {selectedDate.toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long' 
              })}
            </h4>
            
            {selectedDateEvents.length > 0 ? (
              <div className="events-list">
                {selectedDateEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="event-item"
                    style={{ borderLeftColor: getEventTypeColor(event.type) }}
                  >
                    <span className="event-icon">
                      {getEventTypeIcon(event.type)}
                    </span>
                    <div className="event-details">
                      <h5>{event.title}</h5>
                      <p>{event.time} - {event.client}</p>
                    </div>
                    <button 
                      className="remove-event"
                      onClick={() => removeEvent(event.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events">Aucun événement ce jour</p>
            )}

            <button 
              className="add-event-btn"
              onClick={() => setShowAddEvent(!showAddEvent)}
            >
              + Ajouter un événement
            </button>

            {showAddEvent && (
              <div className="add-event-form">
                <input
                  type="text"
                  placeholder="Titre de l'événement"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Client/Contact"
                  value={newEvent.client}
                  onChange={(e) => setNewEvent({...newEvent, client: e.target.value})}
                />
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                >
                  <option value="visit">Visite</option>
                  <option value="appointment">Rendez-vous</option>
                  <option value="training">Formation</option>
                  <option value="meeting">Réunion</option>
                  <option value="other">Autre</option>
                </select>
                <div className="form-actions">
                  <button onClick={addEvent} className="save-btn">
                    Sauvegarder
                  </button>
                  <button 
                    onClick={() => setShowAddEvent(false)} 
                    className="cancel-btn"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
