import { builder } from '@builder.io/react'
import * as ReactClient from 'react-dom/client'
import { registerDamImage } from './components/DamImage'
import { registerDamVideo } from './components/DamVideo'
import { registerDynamicProductSlider } from './components/DynamicProductSlider'
import { Page } from './components/Page'
import { registerProductCard } from './components/ProductCard'
import { registerProductSlider } from './components/ProductSlider'
// import './index.css'

builder.init(import.meta.env.VITE_BUILDER_API_KEY)
registerDamImage()
registerDamVideo()
registerProductCard()
registerProductSlider()
registerDynamicProductSlider()

const root = ReactClient.createRoot(document.getElementById('main')!)

root.render(<Page />)
