import React from 'react';

export interface Slide {
  id: string;
  title?: string;
  content?: React.ReactNode;
  image?: string;
}

export interface TabData {
  id: string;
  title: string;
  slides: Slide[];
}
