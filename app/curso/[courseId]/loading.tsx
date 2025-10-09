export default function Loading() {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <div className="h-5 w-20 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-6 w-64 bg-slate-700 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-24 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-2 w-32 bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 w-1/4 bg-slate-200 rounded animate-pulse"></div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="aspect-video bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="w-80 bg-white border-l border-slate-200">
          <div className="p-4 border-b bg-slate-50">
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 w-full bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
