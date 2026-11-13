import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Compass,
  Building2,
  FlaskConical,
  Laptop,
  Home,
  Utensils,
  Trophy,
  BookOpen,
  Shield,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Info,
  Sparkles,
  Maximize2,
  Check
} from 'lucide-react';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { CampusFacility } from '../App';

export interface MapPinLocation {
  id: string;
  facilityId?: string; // Links to CAMPUS_FACILITIES if available
  title: string;
  category: 'academics' | 'boarding' | 'sports' | 'admin';
  tag: string;
  description: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  capacityOrSpecs?: string;
  image: string;
  fallbackImage?: string;
}

export const CAMPUS_MAP_PINS: MapPinLocation[] = [
  {
    id: 'science-labs',
    facilityId: 'science-labs',
    title: 'Modern Science Labs',
    category: 'academics',
    tag: 'Physics, Chem & Biology',
    description: 'Specialized science laboratories fully equipped with gas points, reagents, microscopes, and apparatus for hands-on UNEB practical examinations.',
    x: 48,
    y: 36,
    icon: FlaskConical,
    features: ['UNEB accredited workstations', 'Specialized reagents storage', 'Dedicated prep rooms'],
    capacityOrSpecs: '3 Multi-Disciplinary Labs · 120 Students Capacity',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: '/pages/images/odeke.jpeg'
  },
  {
    id: 'computer-lab',
    facilityId: 'computer-lab',
    title: 'ICT & Computer Laboratory',
    category: 'academics',
    tag: 'ICT & Digital Research',
    description: 'High-speed internet workstations dedicated to UNEB subsidiary ICT practicals, programming, digital literacy, and academic research.',
    x: 58,
    y: 42,
    icon: Laptop,
    features: ['Gigabit internet connection', 'Modern desktop workstations', 'Digital projector & audio'],
    capacityOrSpecs: '60+ Networked Terminals · Air-Conditioned',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'library',
    facilityId: 'library',
    title: 'School Library & Resource Center',
    category: 'academics',
    tag: 'Quiet Study & UNEB Archives',
    description: 'Comprehensive curriculum collection, past national examination papers, encyclopedias, and serene study carrels for focused revision.',
    x: 40,
    y: 45,
    icon: BookOpen,
    features: ['UNEB question bank archives', 'Individual reading carrels', 'E-resource reading section'],
    capacityOrSpecs: '5,000+ Textbooks · 150 Seating Desks',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'dormitories',
    facilityId: 'dormitories',
    title: 'Student Boarding Dormitories',
    category: 'boarding',
    tag: 'Boarding & Resident Halls',
    description: 'Spacious, well-ventilated boarding residences with 24/7 security, resident matrons/patrons, reliable water systems, and quiet evening prep zones.',
    x: 75,
    y: 28,
    icon: Home,
    features: ['24/7 Resident warden supervision', 'Hot running water & perimeter security', 'Internal evening revision rooms'],
    capacityOrSpecs: 'Separate Boys & Girls Halls · 1,000+ Boarders',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: '/pages/images/bena.jpeg'
  },
  {
    id: 'dining-hall',
    facilityId: 'dining-hall',
    title: 'Dining Hall & Nutrition Complex',
    category: 'boarding',
    tag: 'Food & Nutrition Center',
    description: 'Hygienic, high-capacity dining complex serving balanced, nutritious meals prepared under strict sanitary and dietary standards.',
    x: 65,
    y: 65,
    icon: Utensils,
    features: ['Steam cooking boilers', 'Orderly multi-aisle serving stations', 'Clean borehole water supply'],
    capacityOrSpecs: '1,200 Seating Capacity · 3 Daily Balanced Meals',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'sports-grounds',
    facilityId: 'sports-grounds',
    title: 'USSSA Sports Grounds & Courts',
    category: 'sports',
    tag: 'Football, Handball & Courts',
    description: 'Home of national championship athletes featuring a regulation football pitch, handball arena, basketball courts, and athletics running track.',
    x: 22,
    y: 62,
    icon: Trophy,
    features: ['Championship standard turf pitch', 'Basketball & netball courts', 'Athletics track & spectator pavilion'],
    capacityOrSpecs: 'Standard FIFA Pitch + Multi-Court Complex',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'admin-gate',
    title: 'Administration Block & Main Gate',
    category: 'admin',
    tag: 'Administrative Headquarters',
    description: 'Executive offices housing the Head Teacher, Deputy Academics, Bursar, Registry, Visitors Reception, and 24-hour guarded security entrance.',
    x: 32,
    y: 22,
    icon: Shield,
    features: ['Main reception & visitor check-in', 'Bursar & accounts office', 'Staff conference boardroom'],
    capacityOrSpecs: 'Central School Command & Visitor Center',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'assembly-hall',
    title: 'Multipurpose Assembly & Chapel Hall',
    category: 'boarding',
    tag: 'Events & Spiritual Fellowship',
    description: 'Spacious auditorium used for general student assemblies, debates, Sunday chapel services, music concerts, and national orientation forums.',
    x: 46,
    y: 72,
    icon: Building2,
    features: ['Acoustic PA & sound system', 'Elevated ceremonial stage', 'Inter-school symposium seating'],
    capacityOrSpecs: '1,500 Seater Indoor Auditorium',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Grounds', count: CAMPUS_MAP_PINS.length },
  { id: 'academics', label: 'Labs & Academics', count: 3 },
  { id: 'boarding', label: 'Dorms & Student Life', count: 3 },
  { id: 'sports', label: 'Sports Complex', count: 1 },
  { id: 'admin', label: 'Administration', count: 1 },
] as const;

interface CampusMapSectionProps {
  onOpenFacility?: (facility: CampusFacility) => void;
  facilities?: CampusFacility[];
}

export function CampusMapSection({ onOpenFacility, facilities }: CampusMapSectionProps) {
  const [selectedPinId, setSelectedPinId] = useState<string>('science-labs');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapStyle, setMapStyle] = useState<'blueprint' | 'satellite'>('blueprint');
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);

  const selectedPin = CAMPUS_MAP_PINS.find((pin) => pin.id === selectedPinId) || CAMPUS_MAP_PINS[0];

  const filteredPins = CAMPUS_MAP_PINS.filter((pin) => {
    if (activeCategory === 'all') return true;
    return pin.category === activeCategory;
  });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 1.6));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.9));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleFacilityClick = (pin: MapPinLocation) => {
    setSelectedPinId(pin.id);
  };

  const handleViewFullGallery = () => {
    if (!onOpenFacility || !selectedPin.facilityId || !facilities) return;
    const fac = facilities.find((f) => f.id === selectedPin.facilityId);
    if (fac) {
      onOpenFacility(fac);
    }
  };

  const getCategoryColor = (cat: MapPinLocation['category']) => {
    switch (cat) {
      case 'academics':
        return {
          bg: 'bg-blue-600',
          border: 'border-blue-400',
          text: 'text-blue-600',
          ring: 'rgba(37, 99, 235, 0.45)',
          badge: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'boarding':
        return {
          bg: 'bg-[#800020]',
          border: 'border-rose-300',
          text: 'text-[#800020]',
          ring: 'rgba(128, 0, 32, 0.45)',
          badge: 'bg-rose-50 text-[#800020] border-rose-200'
        };
      case 'sports':
        return {
          bg: 'bg-emerald-600',
          border: 'border-emerald-300',
          text: 'text-emerald-600',
          ring: 'rgba(5, 150, 105, 0.45)',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'admin':
        return {
          bg: 'bg-amber-600',
          border: 'border-amber-300',
          text: 'text-amber-600',
          ring: 'rgba(217, 119, 6, 0.45)',
          badge: 'bg-amber-50 text-amber-800 border-amber-200'
        };
    }
  };

  // High quality architectural campus placeholder maps
  const mapBlueprintBg = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80"; // Architectural layout blueprint
  const mapSatelliteBg = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80"; // Aerial view of lush academic campus grounds

  return (
    <section className="space-y-6 pt-2">
      {/* SECTION HEADER BAR */}
      <div className="sticky top-20 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-[#F8FAFC]/95 backdrop-blur-md border-y border-slate-200/90 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0A192F] text-amber-300 flex items-center justify-center font-bold shadow-sm">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
              Campus Map
            </h3>
            <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Interactive School Grounds & Facility Navigator
            </span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-slate-200/80 p-0.5 rounded-xl text-xs font-bold text-slate-700">
            <button
              onClick={() => setMapStyle('blueprint')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mapStyle === 'blueprint'
                  ? 'bg-white text-[#0A192F] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Architectural
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mapStyle === 'satellite'
                  ? 'bg-white text-[#0A192F] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aerial Grounds
            </button>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            20+ Acres
          </span>
        </div>
      </div>

      {/* FILTER BUTTONS ROW */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORY_FILTERS.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A192F] text-amber-300 shadow-md scale-102'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? 'bg-amber-400/20 text-amber-200' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Map Legend */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-medium text-slate-600 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Academics
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#800020]" /> Boarding & Living
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Sports
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Admin
          </span>
        </div>
      </div>

      {/* MAIN INTERACTIVE MAP CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* MAP CANVAS VIEW (Col 8) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 relative group select-none">
          {/* MAP TOOLBAR HEADER */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            {/* Campus Tag & Orientation */}
            <div className="bg-[#0A192F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white border border-white/10 shadow-lg flex items-center gap-2 pointer-events-auto">
              <SchoolBadgeImg size={22} />
              <div className="text-left">
                <span className="text-[11px] font-extrabold tracking-wide text-amber-300 block leading-tight">
                  STAHIZA CAMPUS GROUNDS
                </span>
                <span className="text-[9px] text-slate-300 font-medium">
                  Tororo - Mbale Highway · Master Plan
                </span>
              </div>
            </div>

            {/* Map Controls */}
            <div className="flex items-center gap-1.5 bg-[#0A192F]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-lg pointer-events-auto text-white">
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                aria-label="Zoom In"
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors text-slate-200 hover:text-white cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                aria-label="Zoom Out"
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors text-slate-200 hover:text-white cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset View"
                aria-label="Reset View"
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors text-slate-200 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <div className="h-4 w-px bg-white/20 mx-0.5" />
              <span className="text-[10px] font-bold px-1.5 text-amber-300">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>
          </div>

          {/* MAP CANVAS VIEWPORT */}
          <div className="relative w-full h-[380px] sm:h-[500px] md:h-[560px] overflow-hidden bg-slate-950 flex items-center justify-center">
            {/* Zoomable Container */}
            <div
              className="relative w-full h-full transition-transform duration-300 ease-out origin-center"
              style={{
                transform: `scale(${zoomLevel})`
              }}
            >
              {/* Visual Map Background Image Placeholder */}
              <img
                src={mapStyle === 'blueprint' ? mapBlueprintBg : mapSatelliteBg}
                alt="St. Anthony High School Campus Grounds Plan"
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  mapStyle === 'blueprint'
                    ? 'opacity-70 mix-blend-luminosity brightness-95 contrast-125'
                    : 'opacity-85 brightness-95'
                }`}
              />

              {/* Blue/Navy blueprint theme overlay when in blueprint mode */}
              {mapStyle === 'blueprint' && (
                <>
                  <div className="absolute inset-0 bg-[#0A192F]/80 mix-blend-multiply pointer-events-none" />
                  {/* Grid Lines Pattern */}
                  <div
                    className="absolute inset-0 opacity-25 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  {/* Subtle Blueprint Concentric Guidance Circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-400/20 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-cyan-400/15 border-dashed pointer-events-none" />
                </>
              )}

              {/* Dark subtle vignette for readability */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A192F]/40 to-[#0A192F]/80 pointer-events-none" />

              {/* INTERACTIVE FACILITY PINS */}
              {filteredPins.map((pin, idx) => {
                const isSelected = selectedPinId === pin.id;
                const isHovered = hoveredPinId === pin.id;
                const IconComponent = pin.icon;
                const colors = getCategoryColor(pin.category);

                return (
                  <div
                    key={pin.id}
                    style={{
                      left: `${pin.x}%`,
                      top: `${pin.y}%`
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    onClick={() => handleFacilityClick(pin)}
                    onMouseEnter={() => setHoveredPinId(pin.id)}
                    onMouseLeave={() => setHoveredPinId(null)}
                  >
                    {/* Pulsing Beacon Ring */}
                    <span
                      className={`absolute -inset-2 rounded-full opacity-75 ${
                        isSelected ? 'animate-ping' : 'group-hover:animate-ping'
                      }`}
                      style={{
                        backgroundColor: isSelected ? '#F59E0B' : colors.ring
                      }}
                    />

                    {/* Outer Glow Ring if Selected */}
                    {isSelected && (
                      <span className="absolute -inset-3.5 rounded-full border-2 border-amber-300 animate-pulse pointer-events-none" />
                    )}

                    {/* Pin Marker Button */}
                    <div
                      className={`relative flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'w-11 h-11 bg-amber-400 text-[#0A192F] scale-115 shadow-2xl ring-4 ring-amber-300/40 rounded-2xl'
                          : `${colors.bg} text-white w-9 h-9 rounded-xl shadow-lg border-2 ${colors.border} hover:scale-110`
                      }`}
                    >
                      <IconComponent className={isSelected ? 'w-5 h-5 font-black' : 'w-4 h-4'} />
                    </div>

                    {/* Pin Label Tooltip (Always on Selected or on Hover) */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl backdrop-blur-md transition-all duration-200 pointer-events-none z-30 ${
                        isSelected
                          ? 'bg-amber-400 text-[#0A192F] opacity-100 scale-100 ring-2 ring-[#0A192F]/20'
                          : isHovered
                          ? 'bg-[#0A192F] text-white opacity-100 scale-100 border border-white/20'
                          : 'opacity-0 scale-90 -translate-y-1'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px]">{pin.title}</span>
                      </div>
                      {/* Triangle Pointer */}
                      <div
                        className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                          isSelected ? 'bg-amber-400' : 'bg-[#0A192F]'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}

              {/* NORTH COMPASS ROSE */}
              <div className="absolute bottom-4 left-4 bg-[#0A192F]/85 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-lg flex items-center gap-2 text-white pointer-events-none">
                <div className="w-8 h-8 rounded-full border border-amber-300/40 flex items-center justify-center relative">
                  <div className="w-0.5 h-6 bg-gradient-to-t from-transparent via-amber-300 to-rose-500 rounded-full" />
                  <span className="absolute -top-1 text-[9px] font-black text-rose-400">N</span>
                  <span className="absolute -bottom-1 text-[8px] font-bold text-slate-400">S</span>
                </div>
                <div className="text-[9px] font-semibold text-slate-300">
                  <span className="block text-amber-300 font-bold">ORIENTED</span>
                  <span>1°06′N 33°58′E</span>
                </div>
              </div>

              {/* CAMPUS SCALE KEY */}
              <div className="absolute bottom-4 right-4 bg-[#0A192F]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-lg text-white pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-amber-400 rounded-full relative">
                    <div className="absolute -top-1 left-0 w-0.5 h-3 bg-amber-400" />
                    <div className="absolute -top-1 right-0 w-0.5 h-3 bg-amber-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300">approx. 100m</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM INTERACTION PROMPT BAR */}
          <div className="bg-[#0A192F] px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-medium text-slate-200">
                Click any pin on the map or select from the list below to explore facility highlights.
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] text-amber-300 font-semibold">
              Showing {filteredPins.length} Locations
            </span>
          </div>
        </div>

        {/* SELECTED FACILITY DETAIL DRAWER (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-5">
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getCategoryColor(selectedPin.category).badge}`}>
              {selectedPin.tag}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Zone ID: #{selectedPin.id}
            </span>
          </div>

          {/* Facility Photo Preview */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
            <img
              src={selectedPin.image}
              alt={selectedPin.title}
              onError={(e) => {
                if (selectedPin.fallbackImage && e.currentTarget.src !== selectedPin.fallbackImage) {
                  e.currentTarget.src = selectedPin.fallbackImage;
                }
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="text-xs font-bold text-amber-300 bg-[#0A192F]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                {selectedPin.capacityOrSpecs || 'Campus Ground Facility'}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {React.createElement(selectedPin.icon, {
                className: `w-5 h-5 ${getCategoryColor(selectedPin.category).text}`
              })}
              <h4 className="text-xl font-extrabold font-['Montserrat'] text-[#0A192F]">
                {selectedPin.title}
              </h4>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {selectedPin.description}
            </p>
          </div>

          {/* Key Amenities & Highlights */}
          <div className="space-y-2.5 pt-1">
            <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
              Key Features & Infrastructure
            </span>
            <div className="space-y-1.5">
              {selectedPin.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-2">
            {selectedPin.facilityId && onOpenFacility && (
              <button
                onClick={handleViewFullGallery}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#173860] text-amber-300 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
                <span>View Full Facility Gallery</span>
              </button>
            )}

            <button
              onClick={() => {
                const el = document.getElementById('campus-facilities-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore All Facilities Below</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* QUICK LOCATE FACILITY CAROUSEL/GRID */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#800020]" />
            <span className="text-sm font-extrabold text-[#0A192F]">
              Quick Navigate Campus Zones
            </span>
          </div>
          <span className="text-xs text-slate-500">
            Click any zone to center on map
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {CAMPUS_MAP_PINS.map((pin) => {
            const isSelected = selectedPinId === pin.id;
            const IconComponent = pin.icon;
            const colors = getCategoryColor(pin.category);

            return (
              <button
                key={pin.id}
                onClick={() => handleFacilityClick(pin)}
                className={`p-2.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-24 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A192F] text-white border-amber-400 shadow-md scale-102 ring-2 ring-amber-300/40'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-amber-400 text-[#0A192F]' : `${colors.badge}`
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>

                <div>
                  <span
                    className={`text-[11px] font-bold line-clamp-2 leading-tight ${
                      isSelected ? 'text-amber-200' : 'text-slate-800'
                    }`}
                  >
                    {pin.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
