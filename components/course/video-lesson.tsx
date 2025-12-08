"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { Lesson } from "@/lib/data"

interface VideoLessonProps {
  lesson: Lesson
  onComplete?: () => void
}

export default function VideoLesson({ lesson, onComplete }: VideoLessonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Simula progresso do vídeo para demo
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Simula progresso
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsPlaying(false)
            onComplete?.()
            return 100
          }
          return prev + 1
        })
      }, 300)
    }
  }

  return (
    <div className="space-y-4">
      {/* Player de Vídeo */}
      <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden group">
        {/* Vídeo placeholder ou embed */}
        {lesson.videoUrl?.includes("youtube") ? (
          <iframe
            src={lesson.videoUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Placeholder visual */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-teal-600/20 flex items-center justify-center">
                  <Play className="h-12 w-12 text-teal-400 ml-1" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-slate-400 text-sm">Clique para reproduzir</p>
              </div>
            </div>

            {/* Overlay de controles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Botão central de play */}
              <button
                onClick={handlePlayPause}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition-all hover:scale-110"
              >
                {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white ml-1" />}
              </button>

              {/* Barra de controles inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Barra de progresso */}
                <div className="mb-3">
                  <Slider
                    value={[progress]}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                    onValueChange={(value) => setProgress(value[0])}
                  />
                </div>

                {/* Controles */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <SkipForward className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={100}
                        step={1}
                        className="w-24"
                        onValueChange={(value) => {
                          setVolume(value[0])
                          setIsMuted(value[0] === 0)
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">
                      {Math.floor((progress / 100) * 8)}:
                      {String(Math.floor(((progress / 100) * 8 * 60) % 60)).padStart(2, "0")} / 8:00
                    </span>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Descrição do vídeo */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h3 className="font-semibold text-neutral-800 mb-2">Sobre esta aula</h3>
        <p className="text-neutral-600 text-sm">
          Nesta videoaula você aprenderá os conceitos fundamentais abordados neste módulo. Assista com atenção e faça
          anotações dos pontos mais importantes.
        </p>
        {lesson.duration && <p className="text-sm text-neutral-500 mt-2">Duração: {lesson.duration}</p>}
      </div>
    </div>
  )
}
