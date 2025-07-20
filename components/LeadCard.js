import React from 'react';
import { FaStar, FaBolt, FaEye, FaEnvelope, FaExternalLinkAlt, FaHome, FaUserTie } from 'react-icons/fa';

const serviceIcon = (service) => {
  if (/real estate/i.test(service)) return <FaHome className="text-blue-400 mr-1" />;
  if (/cleaning/i.test(service)) return <FaBolt className="text-green-400 mr-1" />;
  if (/landscaping/i.test(service)) return <FaUserTie className="text-green-500 mr-1" />;
  return <FaStar className="text-purple-400 mr-1" />;
};

const valueIcon = <FaBolt className="text-cyan-400 mr-1" />;

export default function LeadCard({ lead, expanded, onExpand, onClose, isHero }) {
  // For hero card, manage its own expansion state
  const [localExpanded, setLocalExpanded] = React.useState(false);
  const isExpanded = isHero ? localExpanded : expanded;
  const handleExpand = isHero ? () => setLocalExpanded(!localExpanded) : onExpand;
  const handleClose = isHero ? () => setLocalExpanded(false) : onClose;

  // Urgency color system
  const urgencyColors = {
    High: {
      badge: 'bg-red-700 text-white font-bold',
      icon: <FaBolt className="text-white mr-1" />,
    },
    Medium: {
      badge: 'bg-yellow-400 text-white font-bold',
      icon: <FaBolt className="text-white mr-1" />,
    },
    Low: {
      badge: 'bg-blue-600 text-white font-bold',
      icon: <FaBolt className="text-white mr-1" />,
    },
    Featured: {
      badge: 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 text-white font-bold',
      icon: null,
    },
  };
  // Card style logic
  const borderClass = (lead.urgency === 'Featured Project' || lead.score >= 9)
    ? 'border-2 border-blue-400/80 animate-glow-card ring-2 ring-blue-400/30'
    : 'border-2 border-blue-400/80 animate-glow-card ring-2 ring-blue-400/30';
  const boxShadow = (lead.urgency === 'Featured Project' || lead.score >= 9)
    ? '0 0 48px 8px rgba(0,122,255,0.22), 0 4px 32px 0 rgba(0,0,0,0.16)'
    : '0 0 48px 8px rgba(0,122,255,0.22), 0 4px 32px 0 rgba(0,0,0,0.16)';

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Interact with lead card for ${lead.name}`}
      className={`relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 pt-14 text-left shadow-2xl transition-all duration-400 group overflow-hidden cursor-pointer focus:ring-2 focus:ring-blue-400 ${borderClass} ${isExpanded ? 'z-20 bg-white/20 scale-100' : ''}`}
      style={{
        minHeight: isExpanded ? '420px' : '340px',
        background: 'linear-gradient(135deg, rgba(24,28,48,0.92) 0%, rgba(40,44,74,0.82) 100%)',
        boxShadow,
        maxWidth: isHero ? '24rem' : undefined,
        width: isHero ? '100%' : undefined,
        height: isHero ? '420px' : undefined,
      }}
      onClick={handleExpand}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleExpand()}
    >
      {/* Animated background nebula/particle effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-2xl opacity-60 animate-float-star left-1/2 top-0 -translate-x-1/2" />
        <div className="absolute w-24 h-24 bg-gradient-to-br from-pink-400/20 via-blue-400/10 to-purple-400/20 rounded-full blur-2xl opacity-40 animate-float-star right-4 bottom-4" />
      </div>
      {/* Premium badge system: Featured Project and Urgency */}
      <div className="flex justify-between items-center mb-3 relative z-20">
        {/* Featured Project badge (left, if present) */}
        {lead.urgency === 'Featured Project' && (
          <div className={`text-xs font-semibold px-4 py-1 rounded-full shadow-lg glass border border-white/10 ${urgencyColors.Featured.badge}`} style={{fontWeight: 600, letterSpacing: 0.2}}>
            Featured Project
          </div>
        )}
        {/* Urgency badge (right, if present and not 'Featured Project') */}
        {lead.urgency !== 'Featured Project' && urgencyColors[lead.urgency] && (
          <div className={`flex items-center gap-1 ${urgencyColors[lead.urgency].badge} text-xs font-semibold px-4 py-1 rounded-full shadow-lg glass border border-white/10`} style={{fontWeight: 700, letterSpacing: 0.2}}>
            {urgencyColors[lead.urgency].icon}
            {lead.urgency} Urgency
          </div>
        )}
      </div>
      {/* Card main content */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="font-extrabold text-white text-xl flex items-center gap-2">
          {serviceIcon(lead.service)}
          {lead.name}
        </span>
      </div>
      <div className="flex items-center text-blue-300 text-base mb-2 relative z-10 gap-2">
        {serviceIcon(lead.service)}
        <span>Service: {lead.service}</span>
      </div>
      <div className="flex items-center text-gray-300 text-base mb-2 relative z-10 gap-2">
        <FaStar className="text-yellow-400" />
        AI Score: <span className="font-bold text-green-400 ml-1">{lead.score}/10</span>
      </div>
      <div className="text-gray-400 text-sm mb-3 relative z-10 font-medium">{lead.notes}</div>
      <div className="flex items-center justify-between mt-2 mb-3 relative z-10">
        <span className="flex items-center text-white font-semibold text-base gap-2">{valueIcon}Est. Value</span>
        <span className="text-blue-400 font-bold text-lg">{lead.value}</span>
      </div>
      <div className="text-xs text-gray-400 mb-1 relative z-10">Contact: {lead.contact}</div>
      {lead.projectUrl && <a href={lead.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs font-semibold mt-2 inline-block relative z-10">See Live Site</a>}
      {/* Expanded details inline */}
      {isExpanded && (
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-2xl rounded-3xl flex flex-col items-center justify-center p-8 z-30 animate-fade-in ${isHero ? 'shadow-2xl border border-blue-400/40' : ''}`} style={{minHeight: '420px'}}>
          <button className={`absolute top-4 ${isHero ? 'right-4' : 'left-4'} text-white text-2xl z-40`} onClick={e => {e.stopPropagation(); handleClose();}} aria-label="Close">&times;</button>
          <h3 className="text-2xl font-bold text-white mb-2 mt-2">{lead.name}</h3>
          <div className="text-blue-300 mb-1">Service: {lead.service}</div>
          <div className="text-green-400 mb-1">Urgency: {lead.urgency}</div>
          <div className="text-yellow-400 mb-1">AI Score: {lead.score}/10</div>
          <div className="text-gray-300 mb-2">{lead.notes}</div>
          <div className="text-blue-400 font-bold mb-2">Est. Value: {lead.value}</div>
          <div className="text-xs text-gray-400 mb-2">Contact: {lead.contact}</div>
          {lead.projectUrl && <a href={lead.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs font-semibold mt-2 inline-block">See Live Site</a>}
        </div>
      )}
      {/* Compact quick-action bar at bottom */}
      <div className={`absolute bottom-4 left-0 w-full flex justify-center gap-2 ${isHero ? 'z-40 pointer-events-auto' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 z-30 pointer-events-auto'}`}>
        <button
          className="bg-white/20 hover:bg-blue-500/80 text-white rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="View Details"
          aria-label="View Details"
          onClick={e => {e.stopPropagation(); handleExpand();}}
        >
          <FaEye />
        </button>
        <a
          className="bg-white/20 hover:bg-green-500/80 text-white rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="Contact Lead"
          aria-label="Contact Lead"
          href={`mailto:${lead.contact}`}
          onClick={e => e.stopPropagation()}
        >
          <FaEnvelope />
        </a>
        {lead.projectUrl && !isHero && (
          <a
            className="bg-white/20 hover:bg-purple-500/80 text-white rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="See Live Site"
            aria-label="See Live Site"
            href={lead.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  );
} 