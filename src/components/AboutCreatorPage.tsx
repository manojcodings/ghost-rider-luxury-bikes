export default function AboutCreatorPage() {
  return (
    <div className="space-y-10">

      {/* Creator Card */}
      <div className="flex flex-col md:flex-row gap-8 items-center bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-gold/30 transition-all duration-300">
        <div className="w-32 h-32 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center text-5xl flex-shrink-0 shadow-gold">
          <img src="https://png.pngtree.com/png-clipart/20250104/original/pngtree-man-riding-chopper-motorcycle-illustration-png-image_19946313.png" alt="" />
        </div>
        <div>
          <p className="font-accent text-gold text-xs uppercase tracking-widest mb-1">
            Founder & Developer
          </p>
          <h3 className="font-display text-4xl font-black uppercase text-white mb-3">
            M.Rajpoot
          </h3>
          <p className="font-primary text-white/60 leading-relaxed text-sm">
            A motorcycle enthusiast and full-stack developer who combined two passions into one
            platform. With years of riding experience and software development expertise,
            this project was born from a desire to give fellow riders the resource they always
            wished existed.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 className="font-display text-2xl font-black uppercase text-white mb-6">
          The Story
        </h4>
        <div className="space-y-6">
          {[
            { year: '2020', title: 'The Idea',          desc: 'Frustrated by the lack of a trustworthy platform for bike information, the idea for this site was born.' },
            { year: '2022', title: 'First Build',        desc: 'After months of building, the first version launched with just 20 bikes and a handful of visitors.' },
            { year: '2024', title: 'Growing Community',  desc: 'The platform grew to 10,000+ users, expanded its bike catalog, and added a WhatsApp-first contact system.' },
            { year: '2025', title: 'Full Revamp',        desc: 'A complete redesign brought the site to where it is today — fast, beautiful, and feature-rich.' },
          ].map(({ year, title, desc }) => (
            <div key={year} className="flex gap-6 items-start group">
              <div className="font-display text-gold font-black text-lg w-14 flex-shrink-0 group-hover:text-white transition-colors">
                {year}
              </div>
              <div className="border-l border-white/10 pl-6 flex-1 group-hover:border-gold/40 transition-colors">
                <p className="font-display text-sm font-bold text-white mb-1 uppercase tracking-wide">{title}</p>
                <p className="font-primary text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h4 className="font-display text-2xl font-black uppercase text-white mb-5">
          Built With
        </h4>
        <div className="flex flex-wrap gap-3">
          {['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Vite', 'Framer Motion'].map((tech) => (
            <span
              key={tech}
              className="font-primary px-4 py-1.5 rounded-full border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest hover:bg-gold/10 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}