"use client"

import { useEffect, useState } from "react"
import type { DivIcon } from "leaflet"
import type { MapContainerProps, MarkerProps, TileLayerProps } from "react-leaflet"

type DarkContactMapProps = {
  className?: string
}

// Icerenkoy / Huzur Hoca Cd bolgesi icin sabit konum
const PIN_COORDS: [number, number] = [40.96495, 29.11135]
// Pin ekranda sag tarafa yakin dursun diye merkez biraz sola alinmis
const MAP_CENTER: [number, number] = [40.96495, 29.1074]
const DARK_TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

export default function DarkContactMap({ className }: DarkContactMapProps) {
  const [isReady, setIsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [MapContainerComp, setMapContainerComp] = useState<React.ComponentType<MapContainerProps> | null>(null)
  const [TileLayerComp, setTileLayerComp] = useState<React.ComponentType<TileLayerProps> | null>(null)
  const [MarkerComp, setMarkerComp] = useState<React.ComponentType<MarkerProps> | null>(null)
  const [pinIcon, setPinIcon] = useState<DivIcon | null>(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      const rl = await import("react-leaflet")
      const leaflet = await import("leaflet")
      if (!active) return

      setMapContainerComp(() => rl.MapContainer)
      setTileLayerComp(() => rl.TileLayer)
      setMarkerComp(() => rl.Marker)
      setPinIcon(
        leaflet.divIcon({
          className: "contact-map-pin-wrap",
          html: `
            <span class="contact-map-pin-pulse"></span>
            <span class="contact-map-pin-pulse-2"></span>
            <span class="contact-map-pin-core"></span>
          `,
          iconSize: [46, 46],
          iconAnchor: [23, 23],
        }),
      )
      setIsReady(true)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  if (!isReady || !MapContainerComp || !TileLayerComp || !MarkerComp || !pinIcon) {
    return <div className={className} />
  }

  return (
    <div className={className}>
      <MapContainerComp
        center={isMobile ? PIN_COORDS : MAP_CENTER}
        zoom={isMobile ? 16.9 : 17.4}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
        dragging={!isMobile}
        touchZoom={!isMobile}
        doubleClickZoom={!isMobile}
        boxZoom={!isMobile}
        keyboard={false}
        className="h-full w-full"
      >
        <TileLayerComp url={DARK_TILE_URL} />
        <MarkerComp position={PIN_COORDS} icon={pinIcon} />
      </MapContainerComp>
    </div>
  )
}
