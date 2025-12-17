export const metadata = {
    title: "Credits | World of Murugesan",
    description:
        "Credits and acknowledgements for the World of Murugesan fan-made tribute inspired by Tamil Gaming.",
};



export default function CreditsPage() {
    return (
        <section className="bg-[var(--tamil-black)] text-white min-h-screen">

            {/* HERO */}
            <div className="container mx-auto px-6 pt-32 pb-24">
                <p className="text-xs tracking-[0.35em] uppercase text-[var(--tamil-orange)] mb-6">
                    Credits
                </p>
                <h1 className="text-3xl md:text-5xl font-black max-w-3xl leading-tight">
                    Acknowledgements & Credits
                </h1>
                <p className="mt-6 text-white/70 max-w-2xl text-sm leading-relaxed">
                    This page exists to respectfully acknowledge the creators, platforms,
                    and tools that made this fan-made tribute possible.
                </p>
            </div>

            {/* CONTENT */}
            <div className="container mx-auto px-6 pb-32 space-y-24">

                {/* TAMIL GAMING */}
                <div className="max-w-3xl">
                    <h2 className="text-xl font-black mb-6">
                        Tamil Gaming
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                        All gameplay videos, thumbnails, and original content featured or
                        referenced on this website belong entirely to the Tamil Gaming
                        YouTube channel and its creators.
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed mt-4">
                        This project is inspired by years of creative gameplay moments and
                        storytelling showcased on the Tamil Gaming channel.
                    </p>
                    <a
                        href="https://www.youtube.com/@tamilgaming"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 text-xs uppercase tracking-widest text-[var(--tamil-orange)] hover:underline"
                    >
                        Visit Tamil Gaming on YouTube →
                    </a>
                </div>

                {/* FAN PROJECT */}
                <div className="max-w-3xl">
                    <h2 className="text-xl font-black mb-6">
                        Fan-Made Project Notice
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                        World of Murugesan is a non-commercial, fan-made tribute project.
                        It is not affiliated with, endorsed by, or officially connected
                        to Tamil Gaming.
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed mt-4">
                        The purpose of this website is to organize and celebrate gameplay
                        moments through a narrative and creative lens, without altering or
                        claiming ownership of the original content.
                    </p>
                </div>

                {/* TOOLS & TECHNOLOGY */}
                <div className="max-w-3xl">
                    <h2 className="text-xl font-black mb-6">
                        Technology & Tools
                    </h2>

                    <ul className="space-y-4 text-sm text-white/70">
                        <li>
                            <span className="text-white font-semibold">Next.js</span> — Frontend framework
                        </li>
                        <li>
                            <span className="text-white font-semibold">React</span> — UI architecture
                        </li>
                        <li>
                            <span className="text-white font-semibold">MongoDB</span> — Data storage
                        </li>
                        <li>
                            <span className="text-white font-semibold">YouTube Data API</span> — Video metadata
                        </li>
                        <li>
                            <span className="text-white font-semibold">Vercel</span> — Hosting & deployment
                        </li>
                    </ul>
                </div>

                {/* DESIGN & VISUALS */}
                <div className="max-w-3xl">
                    <h2 className="text-xl font-black mb-6">
                        Design & Visual Style
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                        The visual design of this website is inspired by cinematic gaming
                        aesthetics and retro influences, combined with a modern web layout.
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed mt-4">
                        Character representations are intentionally abstract and symbolic,
                        avoiding direct likenesses or copyrighted assets.
                    </p>
                </div>

                {/* FINAL NOTE */}
                <div className="max-w-3xl border border-white/10 p-6 bg-white/5">
                    <h2 className="text-lg font-black mb-4">
                        Final Note
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                        This project exists purely out of admiration for long-form gaming
                        content and the stories that emerge from it.
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed mt-4">
                        If you are the original content owner and have concerns, please
                        reach out and the content will be addressed respectfully.
                    </p>
                </div>

            </div>
        </section>
    );
}
