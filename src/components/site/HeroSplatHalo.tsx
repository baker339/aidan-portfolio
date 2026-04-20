/**
 * Hero “paint burst” behind the memoji — layered organic blobs with sticker shadows.
 * Avoids SVG filters and a single complex path, which tended to read flat or noisy.
 */
export function HeroSplatHalo() {
    return (
        <div
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible motion-reduce:opacity-[0.9]"
            aria-hidden
        >
            <div className="relative aspect-square w-[118%] max-w-[260px] md:max-w-[280px]">
                {/* soft glow — sits under everything */}
                <div className="absolute inset-[0%] scale-105 rounded-[58%_42%_55%_45%/48%_46%_54%_52%] bg-splat/35 blur-[14px] motion-reduce:blur-[6px]" />
                {/* blast yellow layer */}
                <div className="absolute inset-[6%] rotate-[-11deg] rounded-[46%_54%_52%_48%/54%_46%_48%_52%] border-[3px] border-ink bg-gradient-to-br from-blast via-blast to-splat shadow-[5px_6px_0_#1a0f2e]" />
                {/* main orange layer */}
                <div className="absolute inset-[14%] rotate-[7deg] rounded-[52%_48%_46%_54%/44%_54%_52%_46%] border-[3px] border-ink bg-gradient-to-bl from-splat via-[#ff7c38] to-[#c41f0f] shadow-[6px_7px_0_#1a0f2e]" />
                {/* small drip blobs */}
                <div className="absolute -bottom-[2%] left-[4%] h-[18%] w-[22%] rotate-[-24deg] rounded-[62%_38%_52%_48%/48%_52%_44%_56%] border-2 border-ink bg-blast shadow-[3px_4px_0_#1a0f2e]" />
                <div className="absolute -right-[2%] top-[10%] h-[16%] w-[20%] rotate-[19deg] rounded-[50%_50%_48%_52%/52%_48%_50%_50%] border-2 border-ink bg-splat shadow-[3px_3px_0_#1a0f2e]" />
                <div className="absolute left-[12%] top-[-4%] h-[14%] w-[18%] rotate-[12deg] rounded-[55%_45%_50%_50%/46%_54%_48%_52%] border-2 border-ink bg-gradient-to-br from-blast to-splat shadow-[3px_3px_0_#1a0f2e]" />
            </div>
        </div>
    );
}
