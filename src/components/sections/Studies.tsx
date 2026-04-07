"use client";
import { motion, useReducedMotion } from "framer-motion";

type CardAlign = 'top' | 'bottom';
type NodeVariant = 'past' | 'current' | 'future';

type NodeConfig = {
  id: string;
  title: string;
  institution: string;
  year: string;
  highlights: string[];
  position: { x: number; y: number };
  cardAlign: CardAlign;
  variant: NodeVariant;
};

const GRAPH_NODES: NodeConfig[] = [
  {
    id: "left",
    title: "🎓 School (Higher Secondary)",
    institution: "Sri Vidhya Bharati MHSS",
    year: "2023 - 2024",
    highlights: ["SSLC: 95.8% | HSC: 95%", "Built a solid foundation in Mathematics and Computer Science"],
    position: { x: 25, y: 50 },
    cardAlign: "bottom",
    variant: "past",
  },
  {
    id: "center",
    title: "💻 College (B.E CSE)",
    institution: "Sri Eshwar College",
    year: "2024 - 2028",
    highlights: [
      "Currently pursuing (4th Semester)", 
      "Focused on Data Structures, AI, and Full-Stack Development",
      "Chose CSE driven by passion for coding and development"
    ],
    position: { x: 50, y: 50 },
    cardAlign: "top",
    variant: "current",
  },
  {
    id: "right",
    title: "🚀 Future Role",
    institution: "Aspiring Software Engineer",
    year: "Upcoming",
    highlights: ["Continuously learning and building real-world projects", "Aiming to create scalable and impactful tech solutions"],
    position: { x: 75, y: 50 },
    cardAlign: "bottom",
    variant: "future",
  }
];

// Reusable styling logic based on the node's temporal variant
const getStyles = (variant: NodeVariant) => {
  if (variant === 'current') return {
    hex: '#00f5d4', // Neon Teal
    glowBg: 'bg-[#00f5d4]',
    glowSize: 'w-20 h-20',
    circleBg: 'bg-[#00f5d4]/20',
    circleBorder: 'border-[#00f5d4]',
    circleGlow: 'shadow-[0_0_20px_#00f5d4]',
    dotBg: 'bg-[#00f5d4]',
    cardBg: 'bg-[#00f5d4]/[0.05]',
    cardBorder: 'border-[#00f5d4]/30 group-hover:border-[#00f5d4]/60',
    cardShadow: 'shadow-[0_8px_30px_rgba(0,245,212,0.15)] group-hover:shadow-[0_12px_45px_rgba(0,245,212,0.3)]',
    cardHoverBg: 'group-hover:bg-[#00f5d4]/10',
    titleColor: 'text-white group-hover:text-white', 
    badgeBg: 'bg-[#00f5d4]/10',
    badgeText: 'text-[#00f5d4]',
    badgeBorder: 'border-[#00f5d4]/20',
    instColor: 'text-[#00f5d4]/90',
    iconColor: 'text-[#00f5d4]'
  };
  
  if (variant === 'past') return {
    hex: '#8a2be2', // Cyber Purple
    glowBg: 'bg-[#8a2be2]',
    glowSize: 'w-16 h-16',
    circleBg: 'bg-black',
    circleBorder: 'border-[#8a2be2]/60',
    circleGlow: '',
    dotBg: 'bg-[#8a2be2]',
    cardBg: 'bg-black/60',
    cardBorder: 'border-white/10 group-hover:border-[#8a2be2]/40',
    cardShadow: 'shadow-xl group-hover:shadow-[0_8px_40px_rgba(138,43,226,0.2)]',
    cardHoverBg: '',
    titleColor: 'text-gray-100 group-hover:text-[#8a2be2]/90',
    badgeBg: 'bg-[#8a2be2]/10',
    badgeText: 'text-[#8a2be2]',
    badgeBorder: 'border-[#8a2be2]/30',
    instColor: 'text-gray-400',
    iconColor: 'text-[#8a2be2]'
  };

  // future
  return {
    hex: '#f72585', // Neon Pink / Magenta
    glowBg: 'bg-[#f72585]',
    glowSize: 'w-16 h-16',
    circleBg: 'bg-black',
    circleBorder: 'border-[#f72585]/60',
    circleGlow: '',
    dotBg: 'bg-[#f72585]',
    cardBg: 'bg-black/60',
    cardBorder: 'border-white/10 group-hover:border-[#f72585]/40',
    cardShadow: 'shadow-xl group-hover:shadow-[0_8px_40px_rgba(247,37,133,0.2)]',
    cardHoverBg: '',
    titleColor: 'text-gray-100 group-hover:text-[#f72585]/90',
    badgeBg: 'bg-[#f72585]/10',
    badgeText: 'text-[#f72585]',
    badgeBorder: 'border-[#f72585]/30',
    instColor: 'text-gray-400',
    iconColor: 'text-[#f72585]'
  };
};

const NodeCircle = ({ variant, shouldReduceMotion }: { variant: NodeVariant, shouldReduceMotion: boolean | null }) => {
  const styles = getStyles(variant);
  const isActive = variant === 'current';

  return (
    <div className="relative flex items-center justify-center cursor-pointer">
       {/* Ambient glow */}
       <div className={`absolute rounded-full blur-[20px] transition-all duration-500 opacity-50 group-hover:opacity-100 
          ${styles.glowSize} ${styles.glowBg} ${isActive ? 'group-hover:scale-110' : 'group-hover:scale-125'}`}
       ></div>
       
       {/* Core circle */}
       <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center relative z-10 transition-transform duration-500 backdrop-blur-sm
         ${shouldReduceMotion ? '' : 'group-hover:scale-125'}
         ${styles.circleBorder} ${styles.circleBg} ${styles.circleGlow}`}>
         
         {/* Inner dot */}
         <div className={`w-2.5 h-2.5 rounded-full ${styles.dotBg}`}></div>
         
         {/* Pulse ring for active state */}
         {isActive && !shouldReduceMotion && (
           <motion.div
             className="absolute inset-0 rounded-full border border-[#00f5d4]"
             animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
             transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
           />
         )}
       </div>
    </div>
  );
};

const NodeCard = ({ node }: { node: NodeConfig }) => {
  const styles = getStyles(node.variant);

  return (
    <div className={`p-5 rounded-2xl backdrop-blur-xl border transition-all duration-500 w-[260px] text-left
      ${styles.cardBg} ${styles.cardBorder} ${styles.cardShadow} ${styles.cardHoverBg}
      ${node.variant !== 'current' ? 'bg-gradient-to-b from-white/[0.04] to-transparent' : ''}`}
    >
       <div className="flex flex-col mb-3 space-y-2">
          <h3 className={`text-lg font-bold leading-tight transition-colors duration-300 ${styles.titleColor}`}>
            {node.title}
          </h3>
          <div className="flex items-center">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap uppercase tracking-wider
              ${styles.badgeBg} ${styles.badgeText} ${styles.badgeBorder}`}>
              {node.year}
            </span>
          </div>
       </div>
       
       <h4 className={`text-sm font-medium mb-3 tracking-wide ${styles.instColor}`}>
         {node.institution}
       </h4>
       
       <ul className="space-y-2">
         {node.highlights.map((highlight, idx) => (
           <li key={idx} className="text-sm text-gray-400 flex items-start">
             <span className={`mr-2 mt-0.5 max-w-[10px] min-w-[10px] flex-shrink-0 opacity-80 text-xs ${styles.iconColor}`}>▹</span>
             <span className="leading-snug">{highlight}</span>
           </li>
         ))}
       </ul>
    </div>
  );
};

// Straight bi-directional connections spanning the 3 nodes uniformly
// Center is (50, 50). Links go to (25, 50) and (75, 50)
const HorizontalConnections = ({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) => {
  const center = { x: 50, y: 50 };
  const spokes = [
    { x: 25, y: 50, color: '#8a2be2' }, // Left Connection -> Past (Purple)
    { x: 75, y: 50, color: '#f72585' }, // Right Connection -> Future (Neon Pink)
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {spokes.map((spoke, idx) => (
        <g key={idx}>
          <defs>
            <linearGradient id={`line-grad-${idx}`} x1={`${center.x}%`} y1={`${center.y}%`} x2={`${spoke.x}%`} y2={`${spoke.y}%`}>
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor={spoke.color} stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          <line 
            x1={`${center.x}%`} y1={`${center.y}%`} 
            x2={`${spoke.x}%`} y2={`${spoke.y}%`} 
            stroke={`url(#line-grad-${idx})`} 
            strokeWidth="2" 
          />
          
          {!shouldReduceMotion && (
            <motion.line 
              x1={`${center.x}%`} y1={`${center.y}%`} 
              x2={`${spoke.x}%`} y2={`${spoke.y}%`}  
              stroke="#00f5d4" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 24"
              animate={{ strokeDashoffset: [0, -30] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="opacity-90 mix-blend-screen"
            />
          )}
        </g>
      ))}
    </svg>
  );
};

const getAlignmentClasses = (align: CardAlign) => {
  switch (align) {
    case 'top':
      return 'bottom-full left-1/2 -translate-x-1/2 mb-6 origin-bottom';
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-6 origin-top';
  }
};

export default function Studies() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="studies" className="py-24 px-4 w-full relative z-10 overflow-hidden">
      {/* Heading */}
      <motion.div
        className="section-divider mb-16 md:mb-28"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-heading text-center text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          My <span className="text-gradient-teal accent-serif ml-3">Education</span>
        </h2>
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#8a2be2] to-transparent"></div>
      </motion.div>

      {/* --- 3-NODE SYMMETRICAL GRAPH LAYOUT (DESKTOP) --- */}
      <div className="hidden lg:block relative w-full max-w-[1200px] mx-auto h-[500px] mt-20">
        {/* Glow ambient background for the whole graph */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,245,212,0.03)_0%,_transparent_60%)] pointer-events-none"></div>
        
        {/* Connection Lines */}
        <HorizontalConnections shouldReduceMotion={shouldReduceMotion} />

        {/* Nodes mapped absolutely with strict transforms */}
        {GRAPH_NODES.map((node, index) => (
          <motion.div 
            key={node.id}
            className="absolute z-10 group"
            style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: shouldReduceMotion ? 0 : (index * 0.2), type: "spring", stiffness: 120, damping: 20 }}
          >
             {/* Node Anchor point - strictly centered at exactly (x, y) */}
             <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-20">
                <NodeCircle variant={node.variant} shouldReduceMotion={shouldReduceMotion} />
             </div>
             
             {/* Uniform Node Card with top/bottom symmetry */}
             <div className={`absolute w-[260px] transition-transform duration-500 z-10 ${shouldReduceMotion ? '' : 'group-hover:scale-[1.03]'} ${getAlignmentClasses(node.cardAlign)}`}>
                <NodeCard node={node} />
             </div>
          </motion.div>
        ))}
      </div>

      {/* --- RESPONSIVE STACKED LAYOUT (TABLET/MOBILE) --- */}
      <div className="lg:hidden relative flex flex-col gap-10 py-6 px-4 max-w-[340px] mx-auto opacity-95 mt-10">
        {/* Vertical spine transitioning through all 3 timeline colors (Purple -> Teal -> Pink) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-[#8a2be2]/30 via-[#00f5d4]/40 to-[#f72585]/30 pointer-events-none z-0"></div>

        {GRAPH_NODES.map((node, index) => (
           <motion.div 
             key={node.id} 
             className="relative z-10 flex flex-col items-center group w-full"
             initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ delay: shouldReduceMotion ? 0 : index * 0.15 }}
           >
             <div className="mb-5">
               <NodeCircle variant={node.variant} shouldReduceMotion={shouldReduceMotion} />
             </div>
             <div className={`w-full transition-transform duration-500 ${shouldReduceMotion ? '' : 'group-hover:-translate-y-1'}`}>
               <NodeCard node={node} />
             </div>
           </motion.div>
        ))}
      </div>
    </section>
  );
}
