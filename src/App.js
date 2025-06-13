import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { 
  Github, Linkedin, Mail, ExternalLink, ArrowRight, Code2, Server, Database, 
  Cloud, Zap, Shield, Menu, X, TrendingUp, Users, Clock, Award,
  Eye, Play, Star, ChevronRight, MessageCircle, Download, Phone, Send,
  Activity, Cpu, BarChart3, Globe, Layers, CheckCircle, AlertTriangle, Loader
} from 'lucide-react';
import './App.css';

const AppContainer = styled.div`
  background: #fafafa;
  color: #1a1a1a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.08) 0%, transparent 70%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.06) 0%, transparent 70%),
      radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.05) 0%, transparent 70%),
      linear-gradient(90deg, transparent 79px, rgba(0, 0, 0, 0.02) 80px, rgba(0, 0, 0, 0.02) 81px, transparent 82px),
      linear-gradient(0deg, transparent 79px, rgba(0, 0, 0, 0.02) 80px, rgba(0, 0, 0, 0.02) 81px, transparent 82px);
    background-size: 100% 100%, 100% 100%, 100% 100%, 80px 80px, 80px 80px;
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(250, 250, 250, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: rgba(250, 250, 250, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.3s ease;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1a1a1a, #666);
  transform-origin: 0%;
  z-index: 1000;
`;

const NavLink = styled.a`
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: #1a1a1a;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroSection = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 5rem;
  background: transparent;
  position: relative;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 2;
  
  @media (min-width: 768px) {
    max-width: none;
  }
`;

const HeroImageContainer = styled.div`
  display: none;
  position: relative;
  z-index: 2;
  
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProfilePhoto = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 4px solid #fff;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: rotate(45deg);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: rotate(45deg) translate(50%, 50%);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const CTAButton = styled(motion.button)`
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const DownloadButton = styled(motion.button)`
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1a1a1a;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ContentSection = styled(Section)`
  padding: 5rem 2rem;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-align: center;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 180px);
  gap: 1rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 160px);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(12, 140px);
  }
`;

const BentoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  /* Structured non-uniform layout */
  &:nth-child(1) { 
    grid-column: span 4; 
    grid-row: span 2; 
  }
  &:nth-child(2) { 
    grid-column: span 2; 
    grid-row: span 2; 
  }
  &:nth-child(3) { 
    grid-column: span 3; 
    grid-row: span 2; 
  }
  &:nth-child(4) { 
    grid-column: span 3; 
    grid-row: span 2; 
  }
  &:nth-child(5) { 
    grid-column: span 2; 
    grid-row: span 2; 
  }
  &:nth-child(6) { 
    grid-column: span 4; 
    grid-row: span 2; 
  }
  
  @media (max-width: 1024px) {
    &:nth-child(1) { grid-column: span 4; grid-row: span 2; }
    &:nth-child(2) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(3) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(4) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(5) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(6) { grid-column: span 4; grid-row: span 2; }
  }
  
  @media (max-width: 768px) {
    &:nth-child(1) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(2) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(3) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(4) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(5) { grid-column: span 2; grid-row: span 2; }
    &:nth-child(6) { grid-column: span 2; grid-row: span 2; }
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #1a1a1a, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const StatsSection = styled(ContentSection)`
  background: #f8fafc;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
`;

const StatNumber = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 0;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.div`
  height: 300px;
  background: #f5f5f5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #f5f5f5;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const TechBadge = styled.span`
  background: #f5f5f5;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: #1a1a1a;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Card = styled(motion.div)`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Footer = styled.footer`
  background: #1a1a1a;
  color: white;
  text-align: center;
  padding: 3rem 2rem;
`;

// Floating Background Elements
const FloatingElement = styled(motion.div)`
  position: absolute;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
`;

// Small Decorative Elements (Simplified)
const DecorativeElement = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
`;

const DecorativeSquare = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 119, 198, 0.25);
  border-radius: 1px;
  pointer-events: none;
  z-index: 1;
  transform: rotate(45deg);
  opacity: 0.4;
`;

const DecorativeLine = styled.div`
  position: absolute;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(120, 219, 255, 0.5), transparent);
  pointer-events: none;
  z-index: 1;
  animation: shimmer 5s ease-in-out infinite;
  
  @keyframes shimmer {
    0%, 100% { opacity: 0.3; transform: translateX(0px); }
    50% { opacity: 0.7; transform: translateX(5px); }
  }
`;

// Larger decorative shapes
const LargeDecorativeShape = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  animation: rotate 20s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: rgba(255, 119, 198, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const GeometricTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 14px solid rgba(120, 219, 255, 0.3);
  pointer-events: none;
  z-index: 1;
  animation: bounce 6s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-5px) rotate(90deg); }
    50% { transform: translateY(0px) rotate(180deg); }
    75% { transform: translateY(-3px) rotate(270deg); }
  }
  `;

// Backend Skills Simulator Components
const BackendSimulator = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border-radius: 16px;
  padding: 2rem;
  margin: 4rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ff88, #00d4ff, #ff0080);
    animation: scan 3s linear infinite;
  }
  
  @keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const SimulatorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  color: #00ff88;
  font-family: 'Courier New', monospace;
  font-weight: 600;
`;

const SimulatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const SimulatorCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
`;

const MetricLabel = styled.span`
  color: #888;
`;

const MetricValue = styled.span`
  color: ${props => props.status === 'good' ? '#00ff88' : 
               props.status === 'warning' ? '#ffaa00' : 
               props.status === 'error' ? '#ff4444' : '#00d4ff'};
  font-weight: 600;
`;

const MetricProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin: 0.5rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00ff88, #00d4ff);
  border-radius: 2px;
  width: ${props => props.width}%;
  transition: width 0.3s ease;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const CodeLine = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: #888;
  margin: 0.2rem 0;
  
  .keyword { color: #ff79c6; }
  .string { color: #f1fa8c; }
  .function { color: #50fa7b; }
  .comment { color: #6272a4; }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.status === 'active' ? '#00ff88' : 
                       props.status === 'warning' ? '#ffaa00' : '#ff4444'};
  animation: ${props => props.status === 'active' ? 'blink 1s infinite' : 'none'};
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
  }
`;

const NetworkNode = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border: 2px solid #00d4ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  font-size: 0.8rem;
  font-weight: 600;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid #00d4ff;
    border-radius: 50%;
    animation: ping 2s infinite;
  }
  
  @keyframes ping {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }
`;

const NetworkConnection = styled.div`
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, #00d4ff, transparent, #00ff88);
  animation: dataFlow 2s linear infinite;
  
  @keyframes dataFlow {
    0% { background-position: -100% 0; }
    100% { background-position: 100% 0; }
  }
`;

  // Innovative Floating Action Button
const FloatingActionButton = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const FABMain = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a, #333);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
    transform: scale(1.05);
  }
`;

const FABMenu = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FABItem = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.2s ease;
  
  &:hover {
    background: #1a1a1a;
    color: white;
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

// Enhanced Card with subtle animations
const EnhancedCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.15);
  }
`;

// Typewriter Hook
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0);
  
  useEffect(() => {
    setDisplayText('');
    indexRef.current = 0;
    
    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.substring(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return displayText;
};

// Counter Hook for Stats
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return count;
};

// Counter Component
const CounterComponent = ({ number, suffix }) => {
  const count = useCounter(number);
  return <>{count}{suffix}</>;
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const typewriterText = useTypewriter("Computer Science Student & Backend Developer", 100);

  // AI-Blockchain Analytics Platform - "CelestialChain"
  // System resources monitoring
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    diskIO: 0,
    networkIO: 0
  });

  // AI model performance for COVID-19 diagnosis
  const [aiMetrics, setAiMetrics] = useState({
    covidAccuracy: 98,
    diagnosesPerHour: 0,
    falsePositives: 0,
    modelsActive: 5
  });

  // CelestialChain blockchain network
  const [blockchainMetrics, setBlockchainMetrics] = useState({
    totalBlocksMined: 2847291,
    currentTPS: 0,
    avgLatency: 0,
    activeValidators: 247
  });

  // Database performance metrics
  const [dbMetrics, setDbMetrics] = useState({
    queriesPerSec: 0,
    avgQueryTime: 0,
    activeConnections: 0,
    cacheHitRate: 0
  });

  // Simulate real-time platform metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics({
        cpuUsage: Math.floor(Math.random() * 30) + 25,
        memoryUsage: Math.floor(Math.random() * 40) + 35,
        diskIO: Math.floor(Math.random() * 50) + 120,
        networkIO: Math.floor(Math.random() * 80) + 340
      });

      setAiMetrics({
        covidAccuracy: 98 + (Math.random() * 0.4 - 0.2), // 97.8-98.2%
        diagnosesPerHour: Math.floor(Math.random() * 200) + 1800,
        falsePositives: Math.floor(Math.random() * 5) + 2,
        modelsActive: 5
      });

      setBlockchainMetrics({
        totalBlocksMined: 2847291 + Math.floor(Math.random() * 10),
        currentTPS: Math.floor(Math.random() * 1000) + 4500,
        avgLatency: Math.floor(Math.random() * 100) + 85,
        activeValidators: 247 + Math.floor(Math.random() * 6) - 3
      });

      setDbMetrics({
        queriesPerSec: Math.floor(Math.random() * 500) + 2200,
        avgQueryTime: Math.floor(Math.random() * 20) + 45,
        activeConnections: Math.floor(Math.random() * 30) + 120,
        cacheHitRate: Math.floor(Math.random() * 5) + 92
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  
  // Generate minimal decorative elements for performance
  const decorativeElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    type: ['dot', 'square'][Math.floor(Math.random() * 2)], // Remove lines
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
    delay: Math.random() * 2
  }));

  const skills = [
    {
      icon: <Code2 size={32} />,
      title: "Backend Development",
      description: "Building scalable server-side applications and robust APIs",
      tech: ["Python", "C++", "Database Design"],
      featured: true
    },
    {
      icon: <Database size={24} />,
      title: "Database Management", 
      description: "Designing and optimizing database systems for performance",
      tech: ["SQL", "Database Design", "Performance Tuning"]
    },
    {
      icon: <Server size={24} />,
      title: "Programming Languages",
      description: "Proficient in multiple programming languages",
      tech: ["C++", "Python", "JavaScript"]
    },
    {
      icon: <Globe size={24} />,
      title: "Artificial Intelligence: ML & DL",
      description: "Building AI models for various applications",
      tech: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Numpy", "Pandas", "Scikit-learn"]
    },
          {
        icon: <Globe size={24} />,
        title: "Web Development",
        description: "Frontend technologies and modern web development",
        tech: ["HTML", "CSS", "JavaScript", "React.js"]
      },
          {
        icon: <Zap size={24} />,
        title: "Game Development",
        description: "Creating interactive games and entertainment applications",
        tech: ["Unity", "Maya", "C#"]
      },
    {
      icon: <Shield size={32} />,
      title: "Bot Development",
      description: "Automated bots for social platforms and messaging",
      tech: ["Telegram Bots", "Twitter Bots", "Python"],
      featured: true
    }
  ];

  const stats = [
    { icon: <TrendingUp size={24} />, number: 20, label: "Projects Completed", suffix: "+" },
    { icon: <Users size={24} />, number: 4, label: "Semester Progress", suffix: "/8" },
    { icon: <Code2 size={24} />, number: 6, label: "Programming Languages", suffix: "" },
    { icon: <Award size={24} />, number: 24, label: "Months Coding", suffix: "+" }
  ];

  const projects = [
    {
      title: "Celestial Chain",
      description: "A complete blockchain implementation in C++ with networking, distributed nodes, and native cryptocurrency ($CLST). Features include transaction management, Consensus algorithm, wallet system, mining with adjustable difficulty,public/private key, signatures, persistent storage and much more.",
      tech: ["C++", "Blockchain", "Networking", "LevelDB", "Distributed Systems","Cryptography"],
      github: "https://github.com/moizmoizdev/CelestialChain",
      live: "https://github.com/moizmoizdev/CelestialChain",
      image: "dashboard.jpg",
      stats: "Full-Fledge Blockchain"
    },
    {
      title: "HealthCare Management System",
      description: "AI Powered HealthCare Management System with that connects patients, doctors and staff. AI helps diagnose diseases, manage appointments, change account settings and much more. Every day, Ai powered medical suggestions are sent to the users via email as well as notification inside the website. My responsibilities include Implementing AI Server in python, SMTP Server and improving frontend UI/UX",
      tech: ["Python", "Database Design", "Artificial Intelligence"],
      github: "https://github.com/moizmoizdev/HealthCare-System",
      live: "https://healthnet-frontend-5-15-2025.vercel.app",
      image: "healthnet.jpg",
      stats: "Healthcare System"
    },
    // {
    //   title: "Social Media Bot Collection",
    //   description: "Collection of automated bots for Twitter and Telegram platforms featuring content automation, user interaction, and analytics tracking.",
    //   tech: ["Python", "Twitter API", "Telegram Bot API", "Automation"],
    //   github: "#",
    //   live: "#",
    //   image: "Social Bots",
    //   stats: "Multiple platforms"
    // }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <AppContainer>
      {/* Simple Decorative Elements */}
      {decorativeElements.map((element) => {
        const Component = element.type === 'dot' ? DecorativeElement : DecorativeSquare;
        return (
          <Component
            key={element.id}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`
            }}
          />
        );
      })}
      
      <ProgressBar style={{ scaleX }} />
      
      <Header>
        <Nav>
          <Logo>Moiz</Logo>
          <NavLinks isOpen={mobileMenuOpen}>
            <NavLink onClick={() => scrollToSection('home')}>Home</NavLink>
            <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
            <NavLink onClick={() => scrollToSection('stats')}>Stats</NavLink>
            <NavLink onClick={() => scrollToSection('projects')}>Projects</NavLink>
            <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
          </NavLinks>
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </Nav>
      </Header>

      <HeroSection id="home">
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {typewriterText}
            <span style={{ 
              animation: 'blink 1s infinite'
            }}>|</span>
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hey! I'm a Computer Science student in my 4th semester, passionate about coding and 
            problem-solving. I specialize in backend development and love building scalable systems 
            that make a difference.
          </HeroSubtitle>
          <ButtonGroup
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CTAButton
              onClick={() => scrollToSection('about')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work
              <ArrowRight size={20} />
            </CTAButton>
            <DownloadButton
              onClick={() => window.open('https://moizmoiz.com/assets/resume.pdf', '_blank')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
              <Download size={20} />
            </DownloadButton>
          </ButtonGroup>
        </HeroContent>
        
        <HeroImageContainer>
          <ProfilePhoto
            as={motion.div}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://moizmoiz.com/assets/photo.jpg" 
                              alt="Moiz - Profile" 
              style={{ 
                filter: 'saturate(0.7) contrast(1.1) brightness(1.05)',
                transition: 'filter 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.filter = 'saturate(1) contrast(1.2) brightness(1.1)'}
              onMouseLeave={(e) => e.target.style.filter = 'saturate(0.7) contrast(1.1) brightness(1.05)'}
            />
          </ProfilePhoto>
        </HeroImageContainer>
      </HeroSection>

      <ContentSection id="about">
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What I Do
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          I specialize in building the server-side logic that powers web applications,
          from database design to API development and cloud deployment.
        </SectionSubtitle>
        
        <BentoGrid>
          {skills.map((skill, index) => (
            <BentoCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <CardIcon style={{ marginBottom: skill.featured ? '1.5rem' : '1rem' }}>
                {skill.icon}
              </CardIcon>
              <CardTitle style={{ fontSize: skill.featured ? '1.5rem' : '1.2rem' }}>
                {skill.title}
              </CardTitle>
              <CardDescription style={{ marginBottom: '1rem' }}>
                {skill.description}
              </CardDescription>
              {skill.tech && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skill.tech.map((tech, techIndex) => (
                    <TechBadge key={techIndex}>{tech}</TechBadge>
                  ))}
                </div>
              )}
            </BentoCard>
          ))}
        </BentoGrid>

        {/* Backend Skills Simulator */}
        <BackendSimulator>
          <SimulatorHeader>
            <Activity size={24} />
            <span>stats of a bunch of random stuff</span>
            <StatusDot status="active" />
          </SimulatorHeader>

          <SimulatorGrid>
            {/* API Performance Dashboard */}
            <SimulatorCard
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#00d4ff' }}>
                <Cpu size={16} />
                <span style={{ fontFamily: 'Courier New', fontSize: '0.9rem', fontWeight: '600' }}>System Resources</span>
              </div>
              
              <MetricRow>
                <MetricLabel>CPU Usage:</MetricLabel>
                <MetricValue status={systemMetrics.cpuUsage < 50 ? 'good' : 'warning'}>
                  {systemMetrics.cpuUsage}%
                </MetricValue>
              </MetricRow>
              <MetricProgressBar>
                <ProgressFill width={systemMetrics.cpuUsage} />
              </MetricProgressBar>
              
              <MetricRow>
                <MetricLabel>Memory Usage:</MetricLabel>
                <MetricValue status={systemMetrics.memoryUsage < 60 ? 'good' : 'warning'}>
                  {systemMetrics.memoryUsage}%
                </MetricValue>
              </MetricRow>
              <MetricProgressBar>
                <ProgressFill width={systemMetrics.memoryUsage} />
              </MetricProgressBar>
              
              <MetricRow>
                <MetricLabel>Disk I/O:</MetricLabel>
                <MetricValue status="info">{systemMetrics.diskIO} MB/s</MetricValue>
              </MetricRow>
              
              <MetricRow>
                <MetricLabel>Network I/O:</MetricLabel>
                <MetricValue status="info">{systemMetrics.networkIO} MB/s</MetricValue>
              </MetricRow>
            </SimulatorCard>

            {/* System Performance */}
            <SimulatorCard
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#00ff88' }}>
                <Globe size={16} />
                <span style={{ fontFamily: 'Courier New', fontSize: '0.9rem', fontWeight: '600' }}>AI COVID-19 Diagnosis</span>
              </div>
              
              <MetricRow>
                <MetricLabel>Model Accuracy:</MetricLabel>
                <MetricValue status="good">
                  {aiMetrics.covidAccuracy.toFixed(1)}%
                </MetricValue>
              </MetricRow>
              <MetricProgressBar>
                <ProgressFill width={aiMetrics.covidAccuracy} />
              </MetricProgressBar>
              
              <MetricRow>
                <MetricLabel>Diagnoses/hour:</MetricLabel>
                <MetricValue status="info">
                  {aiMetrics.diagnosesPerHour.toLocaleString()}
                </MetricValue>
              </MetricRow>
              
              <MetricRow>
                <MetricLabel>False Positives:</MetricLabel>
                <MetricValue status={aiMetrics.falsePositives < 4 ? 'good' : 'warning'}>
                  {aiMetrics.falsePositives}
                </MetricValue>
              </MetricRow>
              
              <MetricRow>
                <MetricLabel>Active Models:</MetricLabel>
                <MetricValue status="good">{aiMetrics.modelsActive}/5</MetricValue>
              </MetricRow>
            </SimulatorCard>

            {/* Database Performance */}
            <SimulatorCard
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#ff79c6' }}>
                <Layers size={16} />
                <span style={{ fontFamily: 'Courier New', fontSize: '0.9rem', fontWeight: '600' }}>CelestialChain Network</span>
              </div>
              
              <MetricRow>
                <MetricLabel>Total Blocks Mined:</MetricLabel>
                <MetricValue status="info">{blockchainMetrics.totalBlocksMined.toLocaleString()}</MetricValue>
              </MetricRow>
              
              <MetricRow>
                <MetricLabel>Current TPS:</MetricLabel>
                <MetricValue status={blockchainMetrics.currentTPS > 4000 ? 'good' : 'warning'}>
                  {blockchainMetrics.currentTPS.toLocaleString()}
                </MetricValue>
              </MetricRow>
              <MetricProgressBar>
                <ProgressFill width={Math.min(blockchainMetrics.currentTPS / 60, 100)} />
              </MetricProgressBar>
              
              <MetricRow>
                <MetricLabel>Avg Latency:</MetricLabel>
                <MetricValue status={blockchainMetrics.avgLatency < 100 ? 'good' : 'warning'}>
                  {blockchainMetrics.avgLatency}ms
                </MetricValue>
              </MetricRow>
              
              <MetricRow>
                <MetricLabel>Active Validators:</MetricLabel>
                <MetricValue status="good">{blockchainMetrics.activeValidators}</MetricValue>
              </MetricRow>
            </SimulatorCard>

            {/* Database Performance */}
            <SimulatorCard
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#ffaa00' }}>
                <Database size={16} />
                <span style={{ fontFamily: 'Courier New', fontSize: '0.9rem', fontWeight: '600' }}>Database Cluster</span>
              </div>
              
              <MetricRow>
                <MetricLabel>Queries per Second:</MetricLabel>
                <MetricValue status="info">{dbMetrics.queriesPerSec.toLocaleString()}</MetricValue>
              </MetricRow>
              
              <MetricRow>
                <MetricLabel>Avg Query Time:</MetricLabel>
                <MetricValue status={dbMetrics.avgQueryTime < 50 ? 'good' : 'warning'}>
                  {dbMetrics.avgQueryTime}ms
                </MetricValue>
              </MetricRow>
              <MetricProgressBar>
                <ProgressFill width={Math.min(dbMetrics.avgQueryTime, 100)} />
              </MetricProgressBar>
              
              <MetricRow>
                <MetricLabel>Active Connections:</MetricLabel>
                <MetricValue status={dbMetrics.activeConnections < 140 ? 'good' : 'warning'}>
                  {dbMetrics.activeConnections}/200
                </MetricValue>
              </MetricRow>
              
              <MetricRow>
                <MetricLabel>Cache Hit Rate:</MetricLabel>
                <MetricValue status={dbMetrics.cacheHitRate > 90 ? 'good' : 'warning'}>
                  {dbMetrics.cacheHitRate}%
                </MetricValue>
              </MetricRow>
            </SimulatorCard>
          </SimulatorGrid>
        </BackendSimulator>
      </ContentSection>

      <StatsSection id="stats">
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          By the Numbers
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Results that speak for themselves
        </SectionSubtitle>
        
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div style={{ color: '#1a1a1a', marginBottom: '1rem' }}>{stat.icon}</div>
              <StatNumber>
                <CounterComponent number={stat.number} suffix={stat.suffix} />
              </StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>

      <ContentSection id="projects">
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Innovative solutions that make a difference
        </SectionSubtitle>
        
        <Grid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <ProjectImage>
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              <ProjectContent>
                <ProjectMeta>
                  <Star size={16} />
                  <span>{project.stats}</span>
                  <Eye size={16} />
                  <span>Live Project</span>
                </ProjectMeta>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>
                <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {project.tech.map((tech, techIndex) => (
                    <TechBadge key={techIndex}>{tech}</TechBadge>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <a href={project.github} style={{ 
                    color: '#666', 
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}>
                    <Github size={20} />
                    <span style={{ fontSize: '0.9rem' }}>Code</span>
                  </a>
                  <a href={project.live} style={{ 
                    color: '#1a1a1a', 
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}>
                    <ExternalLink size={20} />
                    <span style={{ fontSize: '0.9rem' }}>Live Demo</span>
                    <ChevronRight size={16} />
                  </a>
                </div>
              </ProjectContent>
            </ProjectCard>
          ))}
        </Grid>
      </ContentSection>

      <ContentSection id="contact" style={{ background: '#f5f5f5', textAlign: 'center' }}>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Work Together
        </SectionTitle>
        <EnhancedCard
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Get In Touch</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            I'm always interested in new opportunities and interesting projects. 
            Whether you're a company looking to hire, or you're a fellow developer 
            wanting to collaborate, I'd love to hear from you.
          </p>
          <CTAButton
            as="a"
            href="mailto:contact@moizmoiz.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
            <Mail size={20} />
          </CTAButton>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
            <a href="https://github.com/moizmoizdev/" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '50px', height: '50px', background: 'white',
              border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px',
              color: '#666', transition: 'all 0.2s ease'
            }}>
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/moizmoiz" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '50px', height: '50px', background: 'white',
              border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px',
              color: '#666', transition: 'all 0.2s ease'
            }}>
              <Linkedin size={24} />
            </a>
            <a href="mailto:contact@moizmoiz.com" style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '50px', height: '50px', background: 'white',
              border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px',
              color: '#666', transition: 'all 0.2s ease'
            }}>
              <Mail size={24} />
            </a>
            <a href="https://wa.me/923007814662" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '50px', height: '50px', background: 'white',
              border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px',
              color: '#25D366', transition: 'all 0.2s ease'
            }}>
              <MessageCircle size={24} />
            </a>
    </div>
        </EnhancedCard>
      </ContentSection>

      <Footer>
        <p>Built in React.js with Love 💓</p>
      </Footer>

      {/* Innovative Floating Action Button */}
      <FloatingActionButton>
        <AnimatePresence>
          {fabOpen && (
            <FABMenu
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <FABItem
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open('https://github.com/moizmoizdev/', '_blank')}
                title="GitHub Profile"
              >
                <Github size={18} />
              </FABItem>
              <FABItem
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollToSection('contact')}
                title="Contact"
              >
                <MessageCircle size={18} />
              </FABItem>
              <FABItem
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open('https://linkedin.com/in/moizmoiz', '_blank')}
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </FABItem>
              <FABItem
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open('https://wa.me/923007814662', '_blank')}
                title="WhatsApp"
              >
                <Phone size={18} />
              </FABItem>
            </FABMenu>
          )}
        </AnimatePresence>
        
        <FABMain
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFabOpen(!fabOpen)}
          animate={{ rotate: fabOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Send size={24} />
        </FABMain>
      </FloatingActionButton>
    </AppContainer>
  );
}

export default App;
