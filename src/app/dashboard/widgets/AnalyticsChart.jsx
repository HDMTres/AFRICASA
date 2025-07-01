'use client';
import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Données de démonstration pour les analytics
const salesData = [
  { month: 'Jan', ventes: 4000, vues: 2400, contacts: 300 },
  { month: 'Fév', ventes: 3000, vues: 1398, contacts: 250 },
  { month: 'Mar', ventes: 5000, vues: 9800, contacts: 450 },
  { month: 'Avr', ventes: 2780, vues: 3908, contacts: 320 },
  { month: 'Mai', ventes: 1890, vues: 4800, contacts: 200 },
  { month: 'Juin', ventes: 2390, vues: 3800, contacts: 380 },
  { month: 'Juil', ventes: 3490, vues: 4300, contacts: 420 }
];

const propertyTypeData = [
  { name: 'Appartements', value: 45, color: '#4F46E5' },
  { name: 'Maisons', value: 30, color: '#06B6D4' },
  { name: 'Bureaux', value: 15, color: '#10B981' },
  { name: 'Terrains', value: 10, color: '#F59E0B' }
];

const performanceData = [
  { region: 'Douala', propriétés: 120, revenus: 45000 },
  { region: 'Yaoundé', propriétés: 95, revenus: 38000 },
  { region: 'Bafoussam', propriétés: 75, revenus: 25000 },
  { region: 'Garoua', propriétés: 60, revenus: 20000 },
  { region: 'Bamenda', propriétés: 45, revenus: 15000 }
];

export default function AnalyticsChart({ type = 'sales', height = 300 }) {
  const renderChart = () => {
    switch (type) {
      case 'sales':
        return (
          <div className="analytics-widget">
            <h3 className="widget-title">📈 Évolution des Ventes</h3>
            <ResponsiveContainer width="100%" height={height}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorVues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="ventes"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorVentes)"
                  name="Ventes (€)"
                />
                <Area
                  type="monotone"
                  dataKey="vues"
                  stroke="#06B6D4"
                  fillOpacity={1}
                  fill="url(#colorVues)"
                  name="Vues"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'propertyTypes':
        return (
          <div className="analytics-widget">
            <h3 className="widget-title">🏠 Répartition par Type</h3>
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'performance':
        return (
          <div className="analytics-widget">
            <h3 className="widget-title">📊 Performance par Région</h3>
            <ResponsiveContainer width="100%" height={height}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="region" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="propriétés" 
                  fill="#10B981" 
                  name="Propriétés"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="revenus" 
                  fill="#F59E0B" 
                  name="Revenus (€)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'trends':
        return (
          <div className="analytics-widget">
            <h3 className="widget-title">📈 Tendances du Marché</h3>
            <ResponsiveContainer width="100%" height={height}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ventes" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  dot={{ fill: '#4F46E5', strokeWidth: 2, r: 6 }}
                  name="Ventes"
                />
                <Line 
                  type="monotone" 
                  dataKey="contacts" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                  name="Contacts"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return <div>Type de graphique non reconnu</div>;
    }
  };

  return (
    <div className="analytics-chart-container">
      {renderChart()}
    </div>
  );
}
