export default function Card({ title, bullets = [], description, label }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          {label}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Title</h3>
          <p className="text-slate-900 leading-relaxed font-medium">{title}</p>
        </div>

        {bullets && bullets.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Bullet Points</h3>
            <ul className="space-y-2">
              {bullets.map((bullet, index) => (
                <li key={index} className="text-slate-800 leading-relaxed flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {description && (
          <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Description</h3>
            <p className="text-slate-800 leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
