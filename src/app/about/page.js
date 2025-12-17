import Image from "next/image";

export const metadata = {
    title: "About Murugesan | A Tamil Gaming Tribute",
    description:
        "Learn about Murugesan — a fictional character inspired by gameplay moments from Tamil Gaming. A respectful, fan-made tribute.",
};

export default function AboutPage() {
    return (
        <section className="bg-[var(--tamil-black)] text-white min-h-screen">

            {/* HERO */}
            <div className="container mx-auto px-6 pt-32 pb-24">
                <p className="text-xs tracking-[0.35em] uppercase text-[var(--tamil-orange)] mb-6">
                    About
                </p>
                <h1 className="text-3xl md:text-5xl font-black max-w-3xl leading-tight">
                    Murugesan
                </h1>
                <p className="mt-6 text-white/70 max-w-2xl text-sm leading-relaxed">
                    A fictional character shaped by stories, roles, and worlds —
                    inspired by gameplay moments from Tamil Gaming.
                </p>
            </div>


            {/* CONTENT */}
            <div className="container mx-auto px-6 pb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT SIDE — TEXT CONTENT (UNCHANGED) */}
                    <div className="space-y-24">

                        {/* WHAT IS MURUGESAN */}
                        <div className="max-w-3xl">
                            <h2 className="text-xl font-black mb-6">
                                Who is Murugesan?
                            </h2>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Murugesan is not a real individual, but a narrative character that
                                emerges from gameplay experiences across different games and genres.
                                From everyday jobs to unusual challenges, Murugesan represents
                                adaptability, curiosity, and the idea of stepping into many roles
                                across virtual worlds.
                            </p>
                        </div>

                        {/* CONNECTION */}
                        <div className="max-w-3xl">
                            <h2 className="text-xl font-black mb-6">
                                Connection to Tamil Gaming
                            </h2>
                            <p className="text-sm text-white/70 leading-relaxed">
                                The character of Murugesan is inspired by gameplay content featured
                                on the Tamil Gaming YouTube channel. Over the years, various games
                                and scenarios created memorable moments that felt connected through
                                a single evolving persona.
                            </p>
                            <p className="text-sm text-white/70 leading-relaxed mt-4">
                                This website organizes those moments into themed “worlds” to help
                                fans explore and relive that journey in a structured, creative way.
                            </p>
                        </div>

                        {/* DISCLAIMER */}
                        <div className="max-w-3xl border border-white/10 p-6 bg-white/5">
                            <h2 className="text-lg font-black mb-4">
                                Fan-Made Tribute Disclaimer
                            </h2>
                            <p className="text-sm text-white/70 leading-relaxed">
                                This website is a fan-made tribute project. It is not officially
                                affiliated with, endorsed by, or sponsored by Tamil Gaming.
                            </p>
                            <p className="text-sm text-white/70 leading-relaxed mt-4">
                                All video content, thumbnails, and original materials belong to
                                their respective owners. This project exists purely to celebrate
                                creativity and storytelling within gaming culture.
                            </p>
                            <p className="text-sm text-white/70 leading-relaxed mt-4">
                                No commercial intent is associated with this project.
                            </p>
                        </div>

                        {/* TIMELINE */}
                        <div className="max-w-3xl">
                            <h2 className="text-xl font-black mb-8">
                                Journey Highlights
                            </h2>

                            <div className="space-y-6 text-sm">
                                <div className="flex gap-6">
                                    <span className="text-[var(--tamil-orange)] font-bold">
                                        2011
                                    </span>
                                    <p className="text-white/70">
                                        The early days of Tamil Gaming — experimentation and growth.
                                    </p>
                                </div>

                                <div className="flex gap-6">
                                    <span className="text-[var(--tamil-orange)] font-bold">
                                        2016
                                    </span>
                                    <p className="text-white/70">
                                        Expansion into diverse gameplay styles and stories.
                                    </p>
                                </div>

                                <div className="flex gap-6">
                                    <span className="text-[var(--tamil-orange)] font-bold">
                                        2020+
                                    </span>
                                    <p className="text-white/70">
                                        Murugesan becomes a recognizable narrative presence across
                                        multiple worlds.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE — CHARACTER VISUAL */}
                    <div className="relative hidden lg:flex justify-center">
                        <div className="relative w-full max-w-md h-[520px] border border-white/10 overflow-hidden">

                            {/* Image */}
                            <img
                                src="/about.png"
                                alt="Murugesan Character"
                                className="w-full h-full object-cover opacity-60"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* Quote */}
                            <div className="absolute bottom-8 left-6 right-6">
                                <p className="text-xs tracking-widest uppercase text-white/60 mb-2">
                                    The World of Murugesan
                                </p>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    One character. Many roles.
                                    A journey shaped by stories.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
