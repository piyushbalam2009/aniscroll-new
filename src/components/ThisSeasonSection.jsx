import { useEffect,useState } from 'react';
import { getJikanSeasonNow } from '../api/jikan.js';
import { MOCK_ANIME } from '../api/mockData.js';
import AnimeCarousel from './AnimeCarousel.jsx';
export default function ThisSeasonSection(){const [items,setItems]=useState(MOCK_ANIME);useEffect(()=>{let active=true;getJikanSeasonNow().then(data=>{if(active)setItems(data.map(a=>({id:String(a.mal_id),title:{english:a.title_english||a.title,romaji:a.title},coverImage:{large:a.images?.jpg?.large_image_url},averageScore:a.score?Math.round(a.score*10):null,episodes:a.episodes,seasonYear:a.year,format:a.type})));}).catch(()=>{});return()=>{active=false}},[]);return <AnimeCarousel title="This season" subtitle="Currently airing" items={items}/>;}