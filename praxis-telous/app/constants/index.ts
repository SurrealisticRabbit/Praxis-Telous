import React from 'react';
import TaskIcon from '@mui/icons-material/Task';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlightIcon from '@mui/icons-material/Flight';

export const iconMap: { [key: string]: React.ElementType } = {
  'task': TaskIcon,
  'home': HomeIcon,
  'work': WorkIcon,
  'person': PersonIcon,
  'star': StarIcon,
  'settings': SettingsIcon,
  'fitness': FitnessCenterIcon,
  'shopping': ShoppingCartIcon,
  'flight': FlightIcon,
};

export const colors = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', 
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', 
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', 
  '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#424242'
];