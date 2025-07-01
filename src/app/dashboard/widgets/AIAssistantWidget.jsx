'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Bonjour ! Je suis votre assistant immobilier IA. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    { text: '🏠 Rechercher une propriété', action: 'search' },
    { text: '💰 Estimer un prix', action: 'estimate' },
    { text: '📊 Voir les tendances', action: 'trends' },
    { text: '📞 Contacter un agent', action: 'contact' },
    { text: '❓ Aide générale', action: 'help' }
  ];

  const botResponses = {
    search: "Je peux vous aider à trouver la propriété parfaite ! Quels sont vos critères ? (type, budget, localisation...)",
    estimate: "Pour estimer le prix d'une propriété, j'ai besoin de quelques informations : type de bien, superficie, localisation, état...",
    trends: "Voici les tendances actuelles du marché immobilier camerounais : \n• Douala : +5.2% ce trimestre\n• Yaoundé : +3.8%\n• Bafoussam : +2.1%",
    contact: "Je peux vous mettre en relation avec nos meilleurs agents. Dans quelle ville cherchez-vous ?",
    help: "Je peux vous aider avec :\n• Recherche de propriétés\n• Estimation de prix\n• Conseils immobiliers\n• Mise en relation avec des agents\n• Informations sur le marché",
    default: "Je comprends votre question. Laissez-moi vous aider avec cela. Pouvez-vous me donner plus de détails ?"
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simuler le délai de réponse du bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('prix') || input.includes('coût') || input.includes('budget')) {
      return botResponses.estimate;
    }
    if (input.includes('recherche') || input.includes('trouver') || input.includes('propriété')) {
      return botResponses.search;
    }
    if (input.includes('tendance') || input.includes('marché') || input.includes('évolution')) {
      return botResponses.trends;
    }
    if (input.includes('agent') || input.includes('contact') || input.includes('rendez-vous')) {
      return botResponses.contact;
    }
    if (input.includes('aide') || input.includes('help') || input.includes('comment')) {
      return botResponses.help;
    }
    
    return botResponses.default;
  };

  const handleQuickAction = (action) => {
    const response = botResponses[action] || botResponses.default;
    const botMessage = {
      id: messages.length + 1,
      type: 'bot',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="ai-assistant-widget">
      {/* Bouton flottant pour ouvrir/fermer le chat */}
      <button 
        className={`ai-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Interface de chat */}
      {isOpen && (
        <div className="ai-chat-container">
          <div className="ai-chat-header">
            <div className="ai-avatar">🤖</div>
            <div className="ai-info">
              <h4>Assistant IA</h4>
              <p>En ligne</p>
            </div>
            <button 
              className="ai-close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`ai-message ${message.type}`}
              >
                <div className="message-bubble">
                  <p>{message.content}</p>
                  <small className="message-time">
                    {formatTime(message.timestamp)}
                  </small>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="ai-message bot">
                <div className="message-bubble typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Actions rapides */}
          {messages.length <= 2 && (
            <div className="ai-quick-actions">
              <p>Actions rapides :</p>
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action.action)}
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="ai-chat-input">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                rows="1"
                style={{ resize: 'none' }}
              />
              <button 
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="send-btn"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
