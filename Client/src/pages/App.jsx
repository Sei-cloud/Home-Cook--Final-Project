import { useEffect } from 'react';
import './App.css';

export default function App() {
    useEffect(() => {
      document.title = 'Homecook Recipes';
    }, []);
}